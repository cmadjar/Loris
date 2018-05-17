<div id="datatable"></div>

<script>
    var table = RDynamicDataTable(
        {
            "DataURL" : "{$baseurl}/physiological_browser/?format=json"
        }
    );
    ReactDOM.render(table, document.getElementById("datatable"));
</script>