<!-- start the selection table -->
{if $writeable}
<div class="row">
    <div class="col-xs-4">
        <form method="post" action="main.php?test_name=instrument_manager" enctype="multipart/form-data">
            <div class="panel panel-primary">
                <div class="panel-heading">Upload Instrument</div>
                <div class="panel-body">
                    <div class="col-xs-12">
                        <input type="file" name="install_file">
                        <br>
                        <input class="btn btn-default" type="submit" name="install" value="Install Instrument" class="button">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
{else}
<div class="alert alert-info">
Instrument directory or tables_sql not writeable.
Automatic uploading of instruments has been disabled.
</div>
{/if}

<!--  title table with pagination -->

<div id="pagelinks">
<table border="0" valign="bottom" width="100%">
<tr>
    <!-- title -->
    <!-- display pagination links -->
    <td align="right">{$page_links}</td>
</tr>
</table>
</div>


<!-- start data table -->
<table border="0" class="dynamictable table table-hover table-primary table-bordered">
    <thead>
    <tr class="info">
     <th nowrap="nowrap">No.</th>
        <!-- print out column headings - quick & dirty hack -->
        {section name=header loop=$headers}
            <th nowrap="nowrap">{$headers[header].displayName}</a></th>
        {/section}
    </tr>
    </thead>
    <tbody>

    {section name=item loop=$items}
        <tr>
        <!-- print out data rows -->
        {section name=piece loop=$items[item]}
            {if $items[item][piece]}
            <td nowrap="nowrap">{$items[item][piece].value}</td>
            {/if}
        {/section}
        </tr>
        {sectionelse}
            <tr><td colspan="8">Nothing found</td></tr>
        {/section}
    </tbody>
<!-- end data table -->
</table>
