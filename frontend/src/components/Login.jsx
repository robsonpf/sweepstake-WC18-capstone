import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Input
} from 'reactstrap';
import TopNav from './TopNav'

class Login extends Component {

  render() {
    return (
      <Container className="main-wrapper">
        <TopNav />
        <Row style={{ marginTop: '25vh' }}>
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
                <Label for="username-field">Username</Label>
                <Input
                  type="username"
                  name="username"
                  id="username-field"
                  placeholder="username"
                />
              </FormGroup>

              <FormGroup>
                <Label for="password-field">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="pass-field"
                  placeholder="password"
                />
              </FormGroup>

              <Button className="mr-3"  type="submit" color="primary">
                Submit
              </Button>
              <a href="/signup">Not a member?</a>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Login;
