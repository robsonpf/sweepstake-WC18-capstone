import React, { Component } from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import { Icon, Table } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { matchesByDay, fetchTeams } from '../redux/actions/matches';
import { connect } from 'react-redux';
import TopNav from './TopNav';
import UserTableList from './UserTableList';


class UserProfile extends Component {
  render() {
      console.log('up props', this.props);
      console.log('up matches', this.props.matches);
  return (
    <div>
      <TopNav history={this.props.history}/>
      <Container>
        <Row>
          <Col style={{ marginTop: '20vh', marginBottom: '10vh' }} sm={{ size: 6, offset: 3 }}>
            <h1 className="text-center">{this.props.user.firstName} Profile Page</h1>
          </Col>
        </Row>
        <Row style={{marginTop: 20}}>
          <Col>
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='6'>{this.props.user.firstName} Table Score</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Matches</Table.Cell>
                  <Table.Cell>
                    Score
                  </Table.Cell>
                  <Table.Cell>
                    Winner Team Bet
                  </Table.Cell>
                  <Table.Cell>
                    Score Bet
                  </Table.Cell>
                  <Table.Cell>
                    Match Points
                  </Table.Cell>
                  <Table.Cell>
                    Total Points
                  </Table.Cell>
                </Table.Row>
                <UserTableList matches={this.props.matches}/>
              </Table.Body>
            </Table>
          </Col>
        </Row>

      </Container>
    </div>
  )
}
}

const mapStateToProps = (state, props) => {
  console.log(state, props);
  return {
    user: state.auth.user || {},
    homeTeam: state.matches.allTeams.find(team => props.match.homeTeam === team.id) || {},
    awayTeam: state.matches.allTeams.find(team => props.match.awayTeam === team.id) || {},
    matches:  state.matches.allMatches,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ matchesByDay }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
