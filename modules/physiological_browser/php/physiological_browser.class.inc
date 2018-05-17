<?php

namespace LORIS\physiological_browser;

class Physiological_Browser extends \NDB_Menu_Filter {

    var $AjaxModule = true; // stops from running the query twice

    function _setupVariables () { // setup the database table structure
        $DB        = \Database::singleton();
        $file_type = $DB->pselect(
            "SELECT type FROM ImagingFileTypes WHERE Description LIKE '%(EEG)'",
            array()
        );
        var_dump($file_type);
        // set the field names of the MySQL tables
        $this->columns = array(
            "PSCID", "s.CandID", "Visit_label", "InsertTime", "FileType"
        );

        $base_query = " FROM physiological_file pf"
                      . " LEFT JOIN session s ON s.ID=pf.SessionID"
                      . " LEFT JOIN candidate c USING (CandID)";
        $where = " WHERE s.Active = 'Y' AND f.FileType IN :$file_type";
        var_dump($base_query . $where);
        $this->query = $base_query . $where;
    }

}