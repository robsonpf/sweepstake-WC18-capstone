import React, { Component } from 'react';
import {
  Button, Card, CardHeader,
  CardFooter, CardBody, CardTitle,
  CardText, Container, Row, Col, Alert
 } from 'reactstrap';
import {
  Flag, Dropdown, Form,
  Image, Label
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlagIconFactory from 'react-flag-icon-css';
import Moment from 'react-moment';
import { postBet } from '../redux/actions/users';

const options2 = [
  { key: '1', text: '0', value: '0' },
  { key: '2', text: '1', value: '1' },
  { key: '3', text: '2', value: '2' },
  { key: '4', text: '3', value: '3' },
  { key: '5', text: '4', value: '4' },
  { key: '6', text: '5', value: '5' },
  { key: '7', text: '6', value: '6' },
  { key: '8', text: '7', value: '7' },
  { key: '9', text: '8', value: '8' },
  { key: '10', text: '9', value: '9' },
  { key: '11', text: '10', value: '10' }
]

class CardMatch extends Component {

  state = {
    isValidForm: true,
    isValid: true,
    homeTeamGoals: "none",
    awayTeamGoals: "none",
    winner: 'none'
  }

  handleBetSubmit = (e) => {
    e.preventDefault()
    let findUserBets = this.props.user.bets.find(bet => bet.matchId === this.props.match.id)

    if (this.state.homeTeamGoals === "none" || this.state.awayTeamGoals === "none" || this.state.winner === "none") {
      this.setState({
        isValidForm: false
      })
    } else if (findUserBets === undefined) {
      this.setState({
        isValidForm: true,
        isValid: true
      })
      this.props.postBet({
          "finalResult": [ this.state.homeTeamGoals, this.state.awayTeamGoals ],
          "winnerTeam": /* getWinnerID(), */
              this.props.homeTeam.name === this.state.winner
              ? this.props.homeTeam.id
              : this.props.awayTeam.name === this.state.winner
              ? this.props.awayTeam.id : 0,
          "matchId": this.props.match.matchId
        })

    } else {
      this.props.isValid = false
      this.setState({
      invalidForm: this.state.isValidForm + 'is invalid',
      isValid: false
      })
    }
  }

  render() {
    // console.log("Card Match props: ", this.props)
    let {
      matchday,
      group,
      homeTeam,
      matchId,
      date,
      awayTeam,
      finalResult,
      stadium,
      _id,
      type
    } = this.props.match;

    // const timeSlice = <Moment>{date}</Moment>
    // const time = timeSlice.slice(15)

    const options1 = [
    { key: this.props.homeTeam.name, value: this.props.homeTeam.id, text: this.props.homeTeam.name},
    { key: this.props.awayTeam.name, value: this.props.awayTeam.id, text: this.props.awayTeam.name},
    { key: 0, value: 0, text: "Tied match"}
    ];

    return (
      <div>
        <Container style={{ marginTop: '20vh', marginBottom: '10vh' }} >
          {/* {this.props.isLoading ? (
            <Dimmer active>
              <Loader>Fetching Data</Loader>
            </Dimmer>
          ) : null} */}
          <Card>
            <CardHeader>
              <Row style={{ fontSize:20 }}>
                <Moment  tag="h3">
                  {date}
                </Moment>
              </Row>
              <Row>
                <CardText style={{ fontSize:20 }}>
                  <Moment  fromNow>{date}</Moment>
                </CardText>
              </Row>
              <Row>
                <CardText style={{ fontSize:20 }}>Group: {group}</CardText>
              </Row>
              <Row>
                <CardText style={{ fontSize:20 }}>{this.props.stadium.name}</CardText>
              </Row>
              <Row>
                <CardText style={{ fontSize:20 }}>{this.props.stadium.city}</CardText>
              </Row>
            </CardHeader>
            <CardBody style={{ backgroundColor:'#D4D8DB' }}>
              <Row style={{  marginTop: '7vh', marginBottom: '7vh'  }}>
                <Col>
                  <Row>
                    <Col>
                      <CardTitle style={{ fontSize:20 }}>
                        <Image size='small' src={this.props.homeTeam.flag} />
                        {this.props.homeTeam.name}
                      </CardTitle>
                    </Col>

                    {this.props.match.finalResult !== null ? (
                      <Col style={{ fontSize:70 }}>
                        {this.props.match.finalResult[0]
                        + ' ' + "-" + ' ' + this.props.match.finalResult[1]}
                      </Col>
                    ) :(
                      <Col style={{ fontSize:40 }}>
                        <Moment fromNow>{date}</Moment>

                      </Col>
                    )
                    }

                    <Col>
                      <CardTitle style={{ fontSize:20 }}>
                        <Image size='small' src={this.props.awayTeam.flag} />
                        {this.props.awayTeam.name}
                      </CardTitle>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              { this.props.bet ? (
                <div>
                  <CardText style={{ fontSize:20 }}>
                    {this.props.user.firstName}'s bets:<br/>
                    {this.props.homeTeam.name + ' '}
                    {' ' + this.props.bet.finalResult[0] + ' '}
                    x   {' ' + this.props.bet.finalResult[1] + ' '}
                    {this.props.awayTeam.name}<br/>
                    Winner team: {this.props.isLoading ? false : getTeamNameById(this.props, this.props.bet.winnerTeam)}
                  </CardText>
                </div>
              ) : (
                <Form>
                  <Form.Group widths='equal'>
                    <Form.Select fluid label={'Goals score from ' + this.props.homeTeam.name  + ':' }
                      options={options2} placeholder={this.props.homeTeam.name}
                      onChange={e => this.setState({ homeTeamGoals: e.target.textContent })}
                    />
                    <Form.Select fluid label={'Goals score from ' + this.props.awayTeam.name  + ':' }

                      options={options2} placeholder={this.props.awayTeam.name}
                      onChange={e => this.setState({ awayTeamGoals: e.target.textContent })}

                    />
                    <Form.Select fluid label='Winner' options={options1}
                      placeholder='Choose a winner or a tied match'
                      onChange={e => this.setState({ winner: e.target.textContent })}

                    />
                  </Form.Group>
                  {!this.state.isValidForm ? (
                    <Alert color="danger">
                      Please make a bet with values filled!
                    </Alert>) : (
                      null
                    )
                  }

                  <Form.Button onClick={this.handleBetSubmit.bind(this)}>Make your Bet</Form.Button>
                </Form>
              )}
            </CardFooter>
          </Card>
        </Container>
      </div>
    );
  }
}

let getTeamNameById = (props, teamId) => {
  if (teamId === 0) return "Tie match";
  console.log(props.allTeams.find(team => team.id == teamId));
  // props.allTeams.find(team => team.id == teamId)
  const team = props.allTeams.find(team => team.id == teamId)
  return team ? props.allTeams.find(team => team.id == teamId).name : null
}

let getBetForThisMatch = (state, props) => {
  // if (state === undefined) { return undefined }
  // if (state.users.allUsers.length === 0) { return undefined; }

    const currentUser = state.users.allUsers.find(user => user.userName === state.auth.user.userName)
    console.log(state.users.allUsers);
    console.log(currentUser);
    return currentUser.bets.find(bet => bet.matchId === props.match.matchId)

}

const mapStateToProps = (state, props) => {
  return {
    isLoading: state.matches.isLoading,
    user: state.users.allUsers.find(user => user.userName === state.auth.user.userName) || {},
    homeTeam: state.matches.allTeams.find(team => props.match.homeTeam === team.id) || {},
    awayTeam: state.matches.allTeams.find(team => props.match.awayTeam === team.id) || {},
    stadium: state.matches.allStadiums.find(stadium => props.match.stadium === stadium.id) || {},
    allTeams: state.matches.allTeams,
    // isValid: getBetForThisMatch() ? false : true,
    bet: state.users.isLoading ? false : getBetForThisMatch(state, props)
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({ postBet }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CardMatch);
