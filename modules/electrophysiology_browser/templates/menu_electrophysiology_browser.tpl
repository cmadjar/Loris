
<div class="panel panel-primary">
    <div class="panel-heading" onclick="hideFilter(this)">
        Selection Filter
        <label class="advancedOptions" id="advanced-label" style="display:none">(Advanced Options)</label>
        <span class="glyphicon arrow glyphicon-chevron-up pull-right"></span>
    </div>
    <div class="panel-body">
        <form method="post" action="{$baseurl}/physiological_browser/">
            <div class="row">
                <div class="form-group col-sm-4">
                    <label class="col-sm-12 col-md-4">
                        {$form.PSCID.label}
                    </label>
                    <div class="col-sm-12 col-md-8">
                        {$form.PSCID.html}
                    </div>
                </div>
                <div class="form-group col-sm-4">
                    <label class="col-sm-12 col-md-4">
                        {$form.DCCID.label}
                    </label>
                    <div class="col-sm-12 col-md-8">
                        {$form.DCCID.html}
                    </div>
                </div>
                <div class="form-group col-sm-4">
                    <label class="col-sm-12 col-md-4">
                        {$form.visitLabel.label}
                    </label>
                    <div class="col-sm-12 col-md-8">
                        {$form.visitLabel.html}
                    </div>
                </div>
            </div>
            <div class="row">
                {if count($form.centerID.options) > 1}
                    <div class="form-group col-sm-4">
                        <label class="col-sm-12 col-md-4">
                            {$form.centerID.label}
                        </label>
                        <div class="col-sm-12 col-md-8">
                            {$form.centerID.html}
                        </div>
                    </div>
                {/if}
            </div>
            <div class="advancedOptions" id="advanced-options" style="display:none">
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label class="col-sm-12 col-md-4">
                            {$form.fileType.label}
                        </label>
                        <div class="col-sm-12 col-md-8">
                            {$form.fileType.html}
                        </div>
                    </div>
                </div>
            </div>
            <br class="visible-xs">
            <div id="advanced-buttons">
                <div class="col-sm-4 col-md-3 col-xs-12 col-md-offset-3">
                    <input type="submit" name="filter" value="Show Data" id="showdata_advanced_options" class="btn btn-sm btn-primary col-xs-12" />
                </div>

                <div class="visible-xs col-xs-12"> </div>
                <div class="visible-xs col-xs-12"> </div>
                <div class="visible-xs col-xs-12"> </div>
                <div class="visible-xs col-xs-12"> </div>
                <div class="col-sm-4 col-md-3 col-xs-12">
                    <input type="button" name="reset" value="Clear Form"
                           class="btn btn-sm btn-primary col-xs-12"
                           onclick="location.href='{$baseurl}/physiological_browser/?reset=true'" />
                </div>
                <div class="visible-xs col-xs-12"> </div>
                <div class="visible-xs col-xs-12"> </div>
                <div class="visible-xs col-xs-12"> </div>
                <div class="visible-xs col-xs-12"> </div>
                <div class="col-sm-4 col-md-3 col-xs-12">
                    <input type="button" name="advanced" value="Advanced" class="btn btn-sm btn-primary col-xs-12 advanced-buttons" onclick="toggleMe()" />
                    <input type="button" name="advanced" value="Basic" class="btn btn-sm btn-primary col-xs-12 advanced-buttons" onclick="toggleMe()" style="display:none;" />
                </div>
            </div>
        </form>
    </div>
</div>

<div id="datatable"></div>

<script>
    var table = RDynamicDataTable(
        {
            "DataURL" : "{$baseurl}/electrophysiology_browser/?format=json"
        }
    );
    ReactDOM.render(table, document.getElementById("datatable"));
</script>