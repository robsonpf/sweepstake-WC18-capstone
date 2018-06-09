import React, { Component } from 'react';
import { Button, Card, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import { Flag, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { matchesByDay, fetchTeams, fetchStadiums } from '../redux/actions/matches';
import FlagIconFactory from 'react-flag-icon-css';
import Moment from 'react-moment';
import TopNav from './TopNav';

// const makeBet = (e) => {
//   e.preventDefault()
//   console.log("make bet");
// }
class CardMatch extends Component {
  render() {
    let {
      matchday,
      group,
      homeTeam,
      matchId,
      date,
      awayTeam,
      stadium,
      _id,
      type
    } = this.props.match;

    // handleToggleMatch = () => {
    //
    // }

    // const options = [
    //   { text: {this.props.homeTeam.name}},
    //   { text: {this.props.awayTeam.name}}
    // ]

    return (
      <div>
        <TopNav />
        <Container style={{ marginTop: '20vh', marginBottom: '10vh' }} >
          <Card>
            <CardHeader tag="h3"><Moment>{date}</Moment></CardHeader>
            <CardBody>
              <Row style={{witdh:"25%"}}>
                <Col>
                  <CardTitle></CardTitle>
                  <CardText><Moment fromNow>{date}</Moment></CardText>
                  <CardText>Group: {group}</CardText>
                  <CardText>{this.props.stadium.name}</CardText>
                  <CardText>{this.props.stadium.city}</CardText>
                </Col>
                <Col style={{ marginTop: '10vh', marginBottom: '10vh' }} >
                  <Row  style={{witdh:"75%"}}>
                    <Col>
                      <CardTitle style={{ fontSize:15 }}>{this.props.homeTeam.name}</CardTitle>
                    </Col>
                    <Col>
                      <Flag name={this.props.homeTeam.iso2} />
                    </Col>
                    <Col>
                      <CardTitle style={{ fontSize:15 }}> vs </CardTitle>
                    </Col>
                    <Col>
                      <Flag size='massive' name={this.props.awayTeam.iso2} />
                    </Col>
                    <Col>
                      <CardTitle style={{ fontSize:15 }}>{this.props.awayTeam.name}</CardTitle>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              {/* <Dropdown placeholder='Pick winner team' fluid multiple selection options= { text: {this.props.homeTeam.name},
              text: {this.props.awayTeam.name} } /> */}
              <Button>
                Make your bet
              </Button>
            </CardFooter>
          </Card>
        </Container>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  console.log("props.match  ==>", props.match.stadium);
  console.log("state.matches  ==>", state.matches.allTeams);
  return {
    homeTeam: state.matches.allTeams.find(team => props.match.homeTeam === team.id),
    awayTeam: state.matches.allTeams.find(team => props.match.awayTeam === team.id),
    stadium: state.matches.allStadiums.find(stadium => props.match.stadium === stadium.id)
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({ matchesByDay, fetchTeams, fetchStadiums }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CardMatch);
