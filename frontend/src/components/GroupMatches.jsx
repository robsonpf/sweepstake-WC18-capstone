import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
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