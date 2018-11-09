import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Loader from 'Loader';
import FilterableDataTable from 'FilterableDataTable';

class DataReleaseIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      error: false,
      isLoaded: false,
    };

    this.fetchData = this.fetchData.bind(this);
    this.formatColumn = this.formatColumn.bind(this);
  }

  componentDidMount() {
    this.fetchData()
      .then(() => this.setState({isLoaded: true}));
  }

  /**
   * Retrieve data from the provided URL and save it in state
   * Additionally add hiddenHeaders to global loris variable
   * for easy access by columnFormatter.
   *
   * @return {object}
   */
  fetchData() {
    return fetch(this.props.dataURL, {credentials: 'same-origin'})
      .then((resp) => resp.json())
      .then((data) => this.setState({data}))
      .catch((error) => {
        this.setState({error: true});
        console.error(error);
      });
  }

  /**
   * Modify behaviour of specified column cells in the Data Table component
   *
   * @param {string} column - column name
   * @param {string} cell - cell content
   * @param {object} row - row content indexed by column
   *
   * @return {*} a formated table cell for a given column
   */
  formatColumn(column, cell, row) {
    // Set class to 'bg-danger' if file is hidden.
    let result = <td>{cell}</td>;
    switch (column) {
      case 'File Name':
        if (this.props.hasPermission('superuser')) {
          const downloadURL = loris.BaseURL + '/data_release/ajax/GetFile.php?File=' +
            encodeURIComponent(row['File Name']);
          result = (
            < td >
            < a
          href = {downloadURL}
          target = "_blank"
          download = {row['File Name']} >
            {cell}
            < /a>
            < /td>
        );
        }
        break;
    }
    return result;
  }

  render() {
    // If error occurs, return a message.
    // XXX: Replace this with a UI component for 500 errors.
    if (this.state.error) {
      return <h3>An error occured while loading the page.</h3>;
    }

    // Waiting for async data to load
    if (!this.state.isLoaded) {
      return <Loader/>;
    }

   /**
    * XXX: Currently, the order of these fields MUST match the order of the
    * queried columns in _setupVariables() in media.class.inc
    */
    // const options = this.state.data.fieldOptions;
    const fields = [
      {label: 'File Name', show: true, filter: {
        name: 'fileName',
        type: 'text',
      }},
      {label: 'Version', show: true, filter: {
        name: 'version',
        type: 'text',
      }},
      {label: 'Upload Date', show: true, filter: {
        name: 'uploadDate',
        type: 'text',
      }},
    ];

    return (
        <FilterableDataTable
          name="data_release"
          data={this.state.data.Data}
          fields={fields}
          getFormattedCell={this.formatColumn}
        />
    );
  }
}

DataReleaseIndex.propTypes = {
  dataURL: PropTypes.string.isRequired,
  hasPermission: PropTypes.func.isRequired,
};

window.addEventListener('load', () => {
  ReactDOM.render(
    <DataReleaseIndex
      dataURL={`${loris.BaseURL}/data_release/?format=json`}
      hasPermission={loris.userHasPermission}
    />,
    document.getElementById('lorisworkspace')
  );
});
