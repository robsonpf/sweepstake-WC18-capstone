import React from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import { Flag, Segment } from 'semantic-ui-react'
import TopNav from './TopNav';
import BetModal from './BetModal'

const makeBet = (e) => {
  e.preventDefault()
  console.log("make bet");
}

const CardMatch = (props) => {
  return (
    <div>
      <TopNav />
      <Container style={{ marginTop: '20vh', marginBottom: '10vh' }} >
        <Card>
          <CardHeader tag="h3">Thursday 14 June</CardHeader>
          <CardBody>
            <Row style={{witdh:"25%"}}>
              <Col>
                <CardTitle></CardTitle>
                <CardText>14 Jun 2018 - 18:00 Local time</CardText>
                <CardText>Group A</CardText>
                <CardText>Luzhniki Stadium</CardText>
                <CardText>Moscow</CardText>
              </Col>
              <Col style={{ marginTop: '10vh', marginBottom: '10vh' }} >
                {/* <Segment> */}
                <Row  style={{witdh:"75%"}}>
                  <Col>
                    <CardTitle>Russia</CardTitle>
                  </Col>
                  <Col>
                    <Flag name='russia' />
                  </Col>
                  <Col>
                    <CardTitle> vs </CardTitle>
                  </Col>
                  <Col>
                    <Flag name='saudi arabia' />
                  </Col>
                  <Col>
                    <CardTitle>Saudi Arabia</CardTitle>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <BetModal/>
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default CardMatch;
