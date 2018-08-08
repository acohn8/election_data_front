import React from 'react';
import { Divider, Header } from 'semantic-ui-react';
import ResultsTable from './table';
import ExportDropdown from './ExportDropdown';

const TableContainer = () => (
  <div>
    <Divider />
    <Header as="h2">County Results</Header>
    <ExportDropdown />
    <Divider hidden />
    <div style={{ overflow: 'scroll' }}>
      <ResultsTable />
    </div>
  </div>
);

export default TableContainer;
