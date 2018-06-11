import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

class MatchTable extends Component {
  render() {
  return (
        <Table.Row>
          <Table.Cell>
            {this.props.homeTeam.name} vs {this.props.awayTeam.name}
          </Table.Cell>
          <Table.Cell>
            {/* {this.props.userBet.winnerTeam} */}
          </Table.Cell>
          <Table.Cell>
            null
          </Table.Cell>
          <Table.Cell>
            0
          </Table.Cell>
          <Table.Cell>
            0
          </Table.Cell>
          <Table.Cell>
            0
          </Table.Cell>
        </Table.Row>
    );
  };
}

const mapStateToProps = (state, props) => {
  console.log("props.match  ==>", props.match.stadium);
  console.log("state.matches  ==>", state.matches.allTeams);
  console.log("  ==>", state.users.bets);

  return {
    user: state.users.allUsers.find(user => user.id === state.auth.user.id) || {},
    homeTeam: state.matches.allTeams.find(team => props.match.homeTeam === team.id) || {},
    awayTeam: state.matches.allTeams.find(team => props.match.awayTeam === team.id) || {},
    // userBet: state.matches.allTeams.find(team => state.user.bets.matchId === team.id) || {}
  };
}

export default connect(mapStateToProps, null)(MatchTable);
