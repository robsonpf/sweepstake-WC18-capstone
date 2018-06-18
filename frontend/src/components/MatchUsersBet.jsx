import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

class MatchTable extends Component {
  render() {
  return (
    <CardBody>
      <Table.Row>
        <Table.Cell>
          {this.props.homeTeam.name} vs {this.props.awayTeam.name}
        </Table.Cell>
        <Table.Cell>
          {this.props.user.bets.winnerTeam}
        </Table.Cell>
        <Table.Cell>
          {this.props.user.bets.winnerTeam}
        </Table.Cell>
        <Table.Cell>
          {this.props.user.bets.winnerTeam}
        </Table.Cell>
        <Table.Cell>

        </Table.Cell>
        <Table.Cell>

        </Table.Cell>
        <Table.Cell>

        </Table.Cell>
      </Table.Row>
    </CardBody>
    );
  };
}

const mapStateToProps = (state, props) => {
  return {
    user: state.users.allUsers.find(user => user.id === state.auth.user.id) || {},
    homeTeam: state.matches.allTeams.find(team => props.match.homeTeam === team.id) || {},
    awayTeam: state.matches.allTeams.find(team => props.match.awayTeam === team.id) || {},
    findUserBets: this.props.user.bets.find(bet => bet.matchId === this.props.match.id) || {}
  };
}

export default connect(mapStateToProps, null)(MatchTable);
