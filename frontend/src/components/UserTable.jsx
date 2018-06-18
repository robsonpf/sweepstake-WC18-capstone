import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

class UserTable extends Component {
  render() {

  let winningState = {winner: 'No Bet Made', score: [0, 0]}

  let { matchId } = this.props.match

  let { bets, userName } = this.props.user

  let { homeTeam, awayTeam } = this.props

  if (bets) {
    let currentBet = bets.find(bet => bet.matchId == matchId)
    if (currentBet && currentBet.winnerTeam === 0)  {
      winningState.winner = 'Tie match'
      winningState.score = currentBet.finalResult
    } else if (currentBet && homeTeam.id === currentBet.winnerTeam) {
      let winner = homeTeam.name
      winningState.winner = winner
      winningState.score = currentBet.finalResult
    } else if (currentBet && awayTeam.id === currentBet.winnerTeam ) {
      let winner = awayTeam.name
      winningState.winner = winner
      winningState.score = currentBet.finalResult
    } else if (currentBet && currentBet.winnerTeam === 'none' ) {
      winningState.score = currentBet.finalResult
    }
  }

  return (
        <Table.Row>
          <Table.Cell>
            {this.props.homeTeam.name} vs {this.props.awayTeam.name}
          </Table.Cell>
          <Table.Cell>
            {winningState.score[0] +  ' vs ' + winningState.score[1]}
          </Table.Cell>
          <Table.Cell>
            {winningState.winner}
          </Table.Cell>
          <Table.Cell>
            0 x 0
          </Table.Cell>
          <Table.Cell>
            none
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

  console.log("state.matches  ==>", state.matches.allTeams);
  console.log("  ==>", state.users.bets);

  return {
    user: state.users.allUsers.find(user => user.userName === state.auth.user.userName) || {},
    homeTeam: state.matches.allTeams.find(team => props.match.homeTeam === team.id) || {},
    awayTeam: state.matches.allTeams.find(team => props.match.awayTeam === team.id) || {},
  };
};

export default connect(mapStateToProps, null)(UserTable);
