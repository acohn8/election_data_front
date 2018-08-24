import React from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

const CampaignFinanceTable = props => (
  <div>
    <Table basic="very" celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="2">Campaign Finance</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row disabled={props.disabled}>
          <Table.Cell collapsing>Receipts</Table.Cell>
          <Table.Cell>
            {props.campaignFinance[props.candidateId] === undefined
              ? 'Not available'
              : `$${Math.round(props.campaignFinance[props.candidateId].total_receipts).toLocaleString()}`}
          </Table.Cell>
        </Table.Row>
        <Table.Row disabled={props.disabled}>
          <Table.Cell>Disbursements</Table.Cell>
          <Table.Cell>
            {props.campaignFinance[props.candidateId] === undefined
              ? 'Not available'
              : `$${Math.round(props.campaignFinance[props.candidateId].total_disbursements).toLocaleString()}`}
          </Table.Cell>
        </Table.Row>
        <Table.Row disabled={props.disabled}>
          <Table.Cell>Ending Cash</Table.Cell>
          <Table.Cell>
            {props.campaignFinance[props.candidateId] === undefined
              ? 'Not available'
              : `$${Math.round(props.campaignFinance[props.candidateId].end_cash).toLocaleString()}`}
          </Table.Cell>
        </Table.Row>
        <Table.Row disabled={props.disabled}>
          <Table.Cell>Debts</Table.Cell>
          <Table.Cell>
            {props.campaignFinance[props.candidateId] === undefined
              ? 'Not available'
              : `$${Math.round(props.campaignFinance[props.candidateId].debts_owed).toLocaleString()}`}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
);

const mapStateToProps = state => ({
  campaignFinance: state.campaignFinance.financeData,
});

export default connect(mapStateToProps)(CampaignFinanceTable);