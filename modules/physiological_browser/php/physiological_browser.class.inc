<?php

namespace LORIS\physiological_browser;

class Physiological_Browser extends \NDB_Menu_Filter {

    var $AjaxModule = true; // stops from running the query twice

    function _setupVariables () { // setup the database table structure
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
            'PSCID', 'CandID', 'Visit Label', 'Insert Time'
        );

        // set the field names of the MySQL tables
        $this->columns = array(
            "PSCID", "CandID", "Visit_label", "FROM_UNIXTIME(InsertTime)"
        );
        // create the query
        $base_query = " FROM physiological_file pf"
                      . " LEFT JOIN session s ON s.ID=pf.SessionID"
                      . " LEFT JOIN candidate c USING (CandID)";
        $where = " WHERE s.Active = 'Y' AND pf.FileType IN " . $file_types;
        $this->query = $base_query . $where;
    }

}