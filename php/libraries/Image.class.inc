<?php declare(strict_types=1);
/**
 * File that describe the Image class
 *
 * PHP Version 7
 *
 *  @category Imaging
 *  @package  Main
 *  @author   Xavier Lecours <xavier.lecours@mcin.ca>
 *  @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 *  @link     https://www.github.com/aces/Loris/
 */
namespace LORIS;

/**
 * This class defines an Image to allow one to type hint function's parameters
 *
 *  @category Imaging
 *  @package  Main
 *  @author   Xavier Lecours <xavier.lecours@mcin.ca>
 *  @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 *  @link     https://www.github.com/aces/Loris/
 */
class Image
{
    private $_fileid;

    private $_filename;

    private $_filelocation;

    private $_outputtype;

    private $_acquisitionprotocol;

    private $_filetype;

    /**
     * Constructor
     *
     * @param ?int $fileid This Image FileID
     */
    public function __construct(?int $fileid)
    {
        if ($fileid !== null) {
            $dbrow = \NDB_Factory::singleton()
                ->database()
                ->pselectRow(
                    '
                     SELECT
                       f.File as filelocation,
                       f.OutputType as outputtype,
                       mst.Scan_type as acquisitionprotocol,
                       FileType as filetype
                     FROM
                       files f 
                     JOIN mri_scan_type mst
                       ON (mst.ID=f.AcquisitionProtocolID)
                     WHERE f.FileID = :v_fileid
                    ',
                    array('v_fileid' => $fileid)
                );
            if (empty($dbrow)) {
                throw new \NotFound('There is no file with that FileID');
            }

            $this->_fileid       = $fileid;
            $this->_filename     = basename($dbrow['filelocation']);
            $this->_filelocation = $dbrow['filelocation'];
            $this->_outputtype   = $dbrow['outputtype'];
            $this->_acquisitionprotocol = $dbrow['acquisitionprotocol'];
            $this->_filetype            = $dbrow['filetype'];
        }
    }

    /**
     * Get a specific file header from paramter file
     *
     * @param string $headername The parameter name to retreive
     *
     * @return string The value or an empty string
     */
    public function getHeader(string $headername): string
    {
        $dbrow = \NDB_Factory::singleton()
             ->database()
                ->pselectRow(
                    '
                       SELECT
                         Value
                       FROM
                         parameter_file pf 
                       JOIN parameter_type pt
                         USING (ParameterTypeID)
                       JOIN files f
                         USING (FileID)
                       WHERE
                         f.FileID = :v_fileid AND
                         pt.Name = :v_headername
                      ',
                    array(
                     'v_fileid'     => $this->_fileid,
                     'v_headername' => $headername,
                    )
                );
        return $dbrow['Value'] ?? '';
    }

    /**
     * Get all headers from the parameter files tablei for that Image.
     *
     * @return array An associative array of {Name => Value}
     */
    public function getHeaders(): array
    {
        $dbrows = \NDB_Factory::singleton()
             ->database()
                ->pselect(
                    '
                       SELECT
                         pt.Name as name,
                         pf.Value as value
                       FROM
                         parameter_file pf 
                       JOIN parameter_type pt
                         USING (ParameterTypeID)
                       JOIN files f
                         USING (FileID)
                       WHERE
                         f.FileID = :v_fileid
                      ',
                    array('v_fileid' => $this->_fileid)
                );
        return array_reduce(
            $dbrows,
            function ($carry, $row) {
                $carry[$row['name']] = $row['value'];
                return $carry;
            },
            array()
        );
    }

    /**
     * Get this image QC status from the database
     *
     * @return \LORIS\ImageQcStatus
     */
    public function getQcStatus(): \LORIS\ImageQcStatus
    {
        $row = \NDB_Factory::singleton()->database()->pselectRow(
            'SELECT
               QCStatus as qcstatus,
               Selected as selected
             FROM
               files_qcstatus
             WHERE
               FileID = :v_fileid
            ',
            array('v_fileid' => $this->_fileid)
        );

        $qcstatus = $row['qcstatus'] ?? null;
        $selected = is_null($row['selected']) ? null : boolval($row['selected']);

        return new \LORIS\ImageQcStatus($qcstatus, $selected);
    }

    /**
     * Update this image qc status in the database
     *
     * This is not hadnling the QCFirstChangeTime. That column and
     * QCLastChangeTime shoudl be managed by `DEFAULT CURRENT_TIMESTAMP`
     * and `ON UPDATE CURRENT_TIMESTAMP` respectively
     *
     * @param \LORIS\ImageQcStatus $qcstatus The new values
     *
     * @throws \DatabaseException
     *
     * @return void
     */
    public function saveQcStatus(\LORIS\ImageQcStatus $qcstatus): void
    {
        $values = array(
                   'QCStatus'         => $qcstatus->getQcStatus(),
                   'Selected'         => $qcstatus->isSelected() ? 'true' : 'false',
                   'QCLastChangeTime' => time(),
                   'FileID'           => $this->_fileid,
                  );

        \NDB_Factory::singleton()->database()->replace(
            'files_qcstatus',
            $values
        );
    }

    /**
     * Gets the caveats for that image
     *
     * @return \LORIS\ImageCaveats[]
     */
    public function getCaveats(): array
    {
        $rows = \NDB_Factory::singleton()->database()->pselect(
            'SELECT
               mvl.Severity as serverity,
               mvl.Header as header,
               mvl.Value as value,
               mvl.ValidRange as validrange,
               mvl.ValidRegex as validregex
             FROM
               files f
             LEFT JOIN mri_violations_log mvl
               ON (f.SeriesUID=mvl.SeriesUID)
             WHERE
               f.FileID = :v_fileid
            ',
            array('v_fileid' => $this->_fileid)
        );

        return array_map(
            function ($row) {
                $values = array_values($row);
                return new \LORIS\ImageCaveats(...$values);
            },
            $rows
        );
    }

    /**
     * Return a SPLFileInfo object based on this images's properties.
     *
     * @return \SplFileInfo
     */
    public function getFileInfo(): \SplFileInfo
    {
        $imagepath = \NDB_factory::singleton()
            ->config()
            ->getSetting('mincPath');

        $fullpath = $imagepath . $this->_filelocation;

        $info = new \SplFileInfo($fullpath);

        return $info;
    }

    /**
     * Return a SPLFileInfo object based on this images's thumbnail properties.
     *
     * @return \SplFileInfo
     */
    public function getThumbnailFileInfo(): \SplFileInfo
    {
        $imagepath = \NDB_factory::singleton()
            ->config()
            ->getSetting('imagePath');

        $fullpath = $imagepath . '/pic/'. $this->getHeader('check_pic_filename');

        $info = new \SplFileInfo($fullpath);

        return $info;
    }

    /**
     * Creates an immutable object representation of this Image
     *
     * @return \LORIS\ImageDTO
     */
    public function asDTO(): \LORIS\ImageDTO
    {
        return new \LORIS\ImageDTO(
            $this->_fileid,
            $this->_filename,
            $this->_filelocation,
            $this->_outputtype,
            $this->_acquisitionprotocol,
            $this->_filetype
        );
    }
}

/**
 * This class defines an ImageDTO which is an immutable representation of a
 * Image object. Its purpose is to provide accessors to an Image properties.
 *
 *  @category Imaging
 *  @package  Main
 *  @author   Xavier Lecours <xavier.lecours@mcin.ca>
 *  @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 *  @link     https://www.github.com/aces/Loris/
 */
class ImageDTO implements \LORIS\Data\DataInstance
{

    private $_fileid;

    private $_filename;

    private $_filelocation;

    private $_outputtype;

    private $_acquisitionprotocol;

    private $_filetype;

    /**
     * Constructor
     *
     * @param ?int    $fileid              The FileID
     * @param ?string $filename            The image filename
     * @param ?string $filelocation        The image location
     * @param ?string $outputtype          The output type
     * @param ?string $acquisitionprotocol The aquisition protocol
     * @param ?string $filetype            The file type
     */
    public function __construct(
        ?int $fileid,
        ?string $filename,
        ?string $filelocation,
        ?string $outputtype,
        ?string $acquisitionprotocol,
        ?string $filetype
    ) {
        $this->_fileid       = $fileid;
        $this->_filename     = $filename;
        $this->_filelocation = $filelocation;
        $this->_outputtype   = $outputtype;
        $this->_acquisitionprotocol = $acquisitionprotocol;
        $this->_filetype            = $filetype;
    }

    /**
     * Accessor for fileid.
     *
     * @return int
     */
    public function getFileid(): int
    {
        return $this->_fileid;
    }

    /**
     * Accessor for filename.
     *
     * @return string
     */
    public function getFilename()
    {
        return $this->_filename;
    }

    /**
     * Accessor for filelocation.
     *
     * @return string
     */
    public function getFilelocation()
    {
        return $this->_filelocation;
    }

    /**
     * Accessor for outputtype.
     *
     * @return string
     */
    public function getOutputtype()
    {
        return $this->_outputtype;
    }

    /**
     * Accessor for acquisitionprotocol.
     *
     * @return string
     */
    public function getAcquisitionprotocol()
    {
        return $this->_acquisitionprotocol;
    }

    /**
     * Accessor for filetype.
     *
     * @return string
     */
    public function getFiletype()
    {
        return $this->_filetype;
    }

    /**
     * Implements \LORIS\Data\DataInstance interface
     *
     * @return string
     */
    public function toJSON() : string
    {
        return json_encode(
            array(
             'fileid'              => $this->_tarchiveid,
             'filename'            => $this->_tarname,
             'filelocation'        => $this->_filelocation,
             'outputtype'          => $this->_outputtype,
             'acquisitionprotocol' => $this->_acquisitionprotocol,
             'filetype'            => $this->_filetype,
            )
        );
    }
}
