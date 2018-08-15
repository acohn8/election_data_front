import React from 'react';
import { Grid, Header, Segment, List } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Loader from '../Loader';
import CountyMap from '../Map/countyMap';
import ResultsList from './ResultsList';
import PrecinctResultsTable from './PrecinctResultsTable';
import { fetchPrecinctData } from '../../redux/actions/precinctActions';

class CountyContainer extends React.Component {
  componentDidMount() {
    this.props.fetchPrecinctData(this.props.row.original);
  }

  formatCountyToplines = () => {
    const countyResults = this.props.countyResults.entities.results[
      this.props.precinctResults.county_id
    ].results;
    const countyCandidates = Object.keys(countyResults);

    const formattedData = countyCandidates
      .map(candidate => ({
        candidate: this.props.candidates.entities.candidates[candidate],
        votes: countyResults[candidate],
      }))
      .filter(candidate => candidate.candidate !== undefined)
      .sort((a, b) => b.votes - a.votes);
    return this.props.stateResults[formattedData[2].candidate.id] /
      Object.values(this.props.stateResults).reduce((sum, num) => sum + num) <=
      0.05
      ? formattedData.slice(0, 2)
      : formattedData;
  };

  render() {
    return (
      <Segment raised padded>
        {this.props.precinctResults.precincts !== undefined ? (
          <Grid centered stackable columns={2}>
            <Grid.Row />
            <Grid.Row>
              <List horizontal size="big">
                {this.formatCountyToplines().map(candidate => (
                  <ResultsList key={candidate.candidate.id} candidate={candidate} />
                ))}
              </List>
            </Grid.Row>
            <Grid.Column>
              <Header as="h3">Precinct Results</Header>
              <PrecinctResultsTable />
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">
                {this.props.geography.entities.counties[this.props.precinctResults.county_id].name}
              </Header>
              {/* no AK map */}
              {this.props.geography.result.state !== 17 && <CountyMap />}
            </Grid.Column>
          </Grid>
        ) : (
          <Loader />
        )}
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  candidates: state.results.candidates,
  geography: state.results.geography,
  precinctResults: state.results.precinctResults,
  countyResults: state.results.countyResults,
  stateResults: state.results.stateResults,
});

const mapDispatchToProps = dispatch => ({
  fetchPrecinctData: id => dispatch(fetchPrecinctData(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountyContainer);
