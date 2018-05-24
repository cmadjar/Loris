<?php

namespace LORIS\electrophysiology_browser;

class Electrophysiology_Browser extends \NDB_Menu_Filter {

    var $AjaxModule = true; // stops from running the query twice

    function setup () {
        parent::setup();

        // create user object
        $user =& \User::singleton();

        // grep the sites available to the user
        // TODO change name of the permission
        if ($user->hasPermission('physiological_browser_view_allsites')) {
            // get the list of study sites - to be replaced by the Site object
            $list_of_sites = \Utility::getSiteList();
            if (is_array($list_of_sites)) {
                $list_of_sites = array('' => 'All') + $list_of_sites;
            }
        } else {
            // allow only to view own site data
            $list_of_sites = $user->getStudySites();
            $list_of_sites = array('' => 'All User Sites') + $list_of_sites;
        }

        // grep the file types from ImagingFileType
        $DB             = \Database::singleton();
        $file_type_list = $DB->pselect(
            "SELECT type FROM ImagingFileTypes WHERE Description LIKE '%(EEG)'",
            array()
        );

        $this->addBasicText(
            'PSCID',
            'PSCID',
            array(
                "size"      => 10,
                "maxlength" => 25,
            )
        );
        $this->addBasicText(
            'DCCID',
            'DCCID',
            array(
                "size"      => 10,
                "maxlength" => 25,
            )
        );
        $this->addBasicText(
            'visitLabel',
            'Visit Label',
            array(
                "size"      => 10,
                "maxlength" => 25,
            )
        );
        $this->addSelect('centerID', 'Site', $list_of_sites);
        $this->addSelect('fileType', 'File Type', $file_type_list);
    }

    function _setupVariables () { // setup the data table structure
        $DB            = \Database::singleton();
        $file_type_arr = $DB->pselect(
            "SELECT type FROM ImagingFileTypes WHERE Description LIKE '%(EEG)'",
            array()
        );
        $file_types = '(';
        foreach ($file_type_arr as &$arr_val) {
            $file_types .= ($file_types == '(') ? '' : ', ';
            $file_types .= "'" . $arr_val['type'] . "'";
        }
        $file_types .= ')';

        // set the header column name of the table to be displayed
        $this->headers = array(
            'Site', 'PSCID', 'DCCID', 'Visit Label', 'First Acquisition',
            'First Insertion'
        );

        // set the field names of the MySQL tables
        $this->columns = array(
            "psc.Name",
            "c.PSCID",
            "c.CandID",
            "s.Visit_label",
            "MIN(pf.AcquisitionTime)",
            "FROM_UNIXTIME(MIN(pf.InsertTime), '%Y-%m-%d')"
        );
        // create the query
        $base_query = " FROM physiological_file pf"
                      . " LEFT JOIN session s ON s.ID=pf.SessionID"
                      . " LEFT JOIN candidate c USING (CandID)"
                      . " LEFT JOIN psc ON s.CenterID=psc.CenterID";
        $where = " WHERE s.Active = 'Y' AND pf.FileType IN " . $file_types;
        $group = " GROUP BY SessionID";
        $this->query = $base_query . $where . $group;

        $this->validFilters = [
            'psc.Name',
            'c.PSCID',
            'c.CandID',
            's.Visit_label'
        ];
        $this->formToFilter = [
            'site'        => 'psc.Name',
            'pscid'       => 'c.PSCID',
            'dccid'       => 'c.CandID',
            'visit_label' => 's.Visit_label'
        ];
    }

}