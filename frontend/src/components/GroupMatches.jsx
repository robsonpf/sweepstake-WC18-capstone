import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Header, Dimmer, Loader, Segment, Flag } from 'semantic-ui-react';
import MatchesList from './MatchesList';
import TopNav from './TopNav';
import TeamsList from './TeamsList';

class GroupMatches extends Component {
  state = {
    showAddPostForm: false,
  }

  render() {
    return (
      <div>
        <TopNav history={this.props.history}/>
        {this.props.isLoading ?
          <Dimmer active>
            <Loader>Fetching Matches</Loader>
          </Dimmer> :  (
            <Container style={{ marginTop: '5vh', marginBottom: '5vh' }} >
              <Header as='h1' dividing>
                Matches
              </Header>
              <Segment>
                <TeamsList teams={this.props.teams}/>
              </Segment>
              <MatchesList matches={this.props.matches} />
            </Container>)}

      </div>
    );
  };
};

const mapStateToProps = (state, props) => {
  return {
    isLoading: state.matches.isLoading,
    matches: state.matches.allMatches,
    teams: state.matches.allTeams
  }
}
 export default connect(mapStateToProps, null)(GroupMatches)
