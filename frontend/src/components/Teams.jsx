import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Flag } from 'semantic-ui-react';

class Teams extends Component {
  render() {
    console.log("this.props.empoji", this.props.emosji);
    return (
      <Flag name={this.props.emoji} />
    )
  }
}

// const mapStateToProps = (state, props) => ({
//   team: state.matches.allTeams.find(team => team.id)
// })

export default Teams;
