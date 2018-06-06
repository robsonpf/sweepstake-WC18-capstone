import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import { connect } from 'react-redux';
import TopNav from './TopNav';

const UserProfile = (props) => {
  console.log('up props', props)
  return (
    <div>
      <TopNav />
      <Container>
        <Row>
          <Col style={{ marginTop: '20vh', marginBottom: '10vh' }} sm={{ size: 6, offset: 3 }}>
            <h1 className="text-center">User Profile Page</h1>
          </Col>
        </Row>
        <Row style={{marginTop: 20}}>
          <Col>
            <img src="http://via.placeholder.com/350x450" alt="profile" />
          </Col>
          <Col>
            <h3>First name: {props.user.firstName}</h3>
            <h3>Last name: {props.user.lastName}</h3>
            <h3>Username: {props.user.userName}</h3>
            <h3>Phone: {props.user.phone}</h3>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(UserProfile)
