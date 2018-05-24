<?php

namespace LORIS\electrophysiology_browser;

class Electrophysiology_Browser extends \NDB_Menu_Filter {

    var $AjaxModule = true; // stops from running the query twice

    /**
     * Determine whether the user has permission to view this page
     *
     * @return bool whether the user hass access
     */
    function _hasAccess()
    {
        $user =& \User::singleton();

        return ($user->hasPermission('electrophysiology_browser_view_allsites')
                || ($user->hasPermission('electrophysiology_browser_view_site')
                    && $user->hasStudySite()
                   )
        );
    }

    /**
     * Set up the variables required by NDB_Menu_Filter class for
     * constructing a query
     *
     * @return void
     */
    function setup () {
        parent::setup();

        // create user object
        $user =& \User::singleton();

        // grep the sites available to the user
        // TODO change name of the permission
        if ($user->hasPermission('electrophysiology_browser_view_allsites')) {
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

        // create database and user objects
        $DB   = \Database::singleton();
        $user = \User::singleton();

        // select all imaging file types for EEG and concatenate them into an
        // SQL string to be used later in the select query for the data table
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

        // set the header column name of the data table to be displayed
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
        $this->query = $base_query . $where;

        // check which sites the user has access to if not to all sites
        if (!$user->hasPermission('electrophysiology_browser_view_allsites')) {
            $site_arr = implode(",", $user->getCenterIDs());
            $this->query .= " AND (c.CenterID IN (" . $site_arr . ")
                              AND s.CenterID IN (" . $site_arr . "))";
        }

        // finish the query by grouping by SessionID
        $this->query .= "GROUP BY SessionID";

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