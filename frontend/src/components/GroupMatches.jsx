import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { Header, Dimmer, Loader } from 'semantic-ui-react';
import MatchesList from './MatchesList';
import TopNav from './TopNav';

class GroupMatches extends Component {
  state = {
    showAddPostForm: false
  }
  render() {
    return (
      <div>
        <TopNav />
        <Container style={{ marginTop: '20vh', marginBottom: '10vh' }} >
          {this.props.isLoading ?
            <Dimmer active>
              <Loader>Fetching Posts</Loader>
            </Dimmer> : null}
          <Header as='h1' dividing>
            Matches
          </Header>
          <MatchesList matches={this.props.matches} />
        </Container>
      </div>
    );
  };
};

const mapStateToProps = (state, props) => {
  return {
    matches: state.matches.allMatches
  }
}
 export default connect(mapStateToProps, null)(GroupMatches)
