import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';

import CountyContainer from '../CountyDetail/CountyContainer';

const colors = {
  democratic: '#2085D0',
  republican: '#DB2828',
  libertarian: '#FBBD09',
  other: '#6435C9',
};

class ResultsTable extends React.Component {
  state = { filtered: [], expanded: {}, prevIndex: '' };

  handleRowExpanded(index) {
    if (this.state.prevIndex !== '' && index - this.state.prevIndex === 0) {
      this.setState({ expanded: {}, prevIndex: '' });
    } else {
      this.setState({
        expanded: { [index]: true },
        prevIndex: index,
      });
    }
  }

  render() {
    const majorCandidates = Object.keys(
      this.props.electionResults.entities.results[this.props.electionResults.result[0]].results,
    );
    return (
      <ReactTable
        data={this.props.electionResults.result}
        columns={[
          {
            Header: 'County',
            id: 'county',
            width: 300,
            accessor: d => this.props.geography.entities.counties[d].name,
            filterMethod: (filter, row) =>
              this.state.filtered.length > 0 &&
              row.county.toLowerCase().includes(this.state.filtered[0].value.toLowerCase()),
            Cell: row => {
              const winningCandidate = Object.keys(row.row)
                .filter(key => key.includes('votes'))
                .sort((a, b) => row.row[b] - row.row[a])
                .map(key => key.split('-'))[0][1];
              const winnerParty = this.props.candidates.entities.candidates[winningCandidate]
                .attributes.party;
              return (
                <span>
                  <span
                    style={{
                      color: colors[winnerParty],
                      transition: 'all .3s ease',
                      margin: '3px',
                    }}
                  >
                    &#x25cf;
                  </span>
                  {row.value}
                </span>
              );
            },
          },
        ].concat(
          majorCandidates.map(candidateId => ({
            id: candidateId,
            Header: `${
              candidateId === 'other'
                ? 'Other'
                : this.props.candidates.entities.candidates[candidateId].attributes.name
            }`,
            columns: [
              {
                id: `votes-${candidateId}`,
                Header: 'Votes',
                accessor: d => this.props.electionResults.entities.results[d].results[candidateId],
                filterable: false,
                minWidth: 100,
                Cell: row => (row.value === undefined ? 0 : row.value.toLocaleString()),
              },
              {
                Header: 'Percent',
                id: `percent-${candidateId}`,
                accessor: d =>
                  this.props.electionResults.entities.results[d].results[candidateId] /
                  majorCandidates
                    .map(
                      candidateId =>
                        this.props.electionResults.entities.results[d].results[candidateId],
                    )
                    .reduce((total, num) => total + num),
                filterable: false,
                minWidth: 100,
                Cell: row => `${Math.max(Math.round(row.value * 100 * 10) / 10)} %`,
              },
            ],
          })),
        )}
        filterable
        filtered={this.state.filtered}
        expanded={this.state.expanded}
        onExpandedChange={(newExpanded, index, event) => {
          this.handleRowExpanded(index);
        }}
        onFilteredChange={filtered => this.setState({ filtered })}
        className="-highlight"
        SubComponent={row => {
          return (
            <div style={{ padding: '20px' }}>
              <CountyContainer row={row} />
            </div>
          );
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  candidates: state.results.candidates,
  geography: state.results.geography,
  electionResults: state.results.electionResults,
});

export default connect(mapStateToProps)(ResultsTable);
