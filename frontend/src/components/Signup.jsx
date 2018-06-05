import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Alert,
  Input
} from 'reactstrap';

import TopNav from './TopNav';

const navbar = {backgroundColor: '#283e4a'}

export class Signup extends Component {
  render() {
    return (
      <Container className="main-wrapper">
        <TopNav />
        <Row style={{ marginTop: '10vh', marginBottom: '10vh' }}>
          <Col
            lg={{ size: 6, offset: 3 }}
            style={{
              border: '1px solid #c9c5c2',
              padding: 35,
              boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.5)'
            }}
          >
            <Form>
              <FormGroup>
                <Label for="firstName">First name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstname-field"
                  placeholder="first name"
                />
              </FormGroup>

              <FormGroup>
                <Label for="lastName">Last name</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastname-field"
                  placeholder="last name"
                />
              </FormGroup>

              <FormGroup>
                <Label for="userName">Username</Label>
                <Input
                  type="test"
                  name="email"
                  id="userName"
                  placeholder="example@gmail.com"
                />
              </FormGroup>


              <FormGroup>
                <Label for="phone">Phone Number</Label>
                <Input
                  type="phone"
                  name="phone"
                  id="phone-field"
                  placeholder="phone"
                />
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password-field"
                  placeholder="password"
                />
              </FormGroup>

              <FormGroup>
                <Label for="verify_password">Verify Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="verify_password"
                  placeholder="password"
                />
              </FormGroup>

              <Button color="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Signup
