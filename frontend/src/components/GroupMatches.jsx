import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Header, Dimmer, Loader } from 'semantic-ui-react';
import MatchesList from './MatchesList';
import TopNav from './TopNav';

class GroupMatches extends Component {
  state = {
    showAddPostForm: false,
  }

  // componentWillMount = () => {
  //   const token = localStorage.getItem("token")
  //
  //   if (token) {
  //     const { sub: { id } } = decode(localStorage.getItem("token"))
  //
  //     this.setState({
  //       loggedIn: decode(localStorage.getItem("token")).loggedIn
  //     })
  //
  //     this.props.fetchPostByUser(id)
  //   } else {
  //     this.setState({
  //       loggedIn: false
  //     })
  //   }
  // }

  render() {
    return (
      <div>
        {/* {this.state.loggedIn ? (
        <div> */}
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
        {/* </div>
          ) : (
          <Redirect to="/login" />
        )} */}
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
