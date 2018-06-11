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
import {
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from '../redux/actions/auth';
import TopNav from './TopNav';

class Login extends Component {
  state = {
    userName: '',
    password: '',
    isLoading: true
  }

  getLogin = e => {
    e.preventDefault()
    console.log("state", this.state, "props", this.props);
    this.props.userLogin(this.state, this.props.history)
  }

  render() {
    console.log("this.props ====>",this.props);
    return (
      <Container className="main-wrapper">
        {this.props.isLoading ? (
          <Dimmer active>
            <Loader>Fetching Data</Loader>
          </Dimmer>
        ) : null}
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
            <Form onSubmit={this.getLogin}>
              <FormGroup>
                <Label for="userName-field">Username</Label>
                <Input
                  type="userName"
                  name="userName"
                  id="userName-field"
                  placeholder="user@gmail.com"
                  value={this.state.userName}
                  onChange={e => this.setState({ userName: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password-field">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="pass-field"
                  placeholder="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </FormGroup>
              {this.props.showLoginError ? (
                <Alert color="primary">
                  Either your email or password is incorrect. Please try again.
                </Alert>
              ) : null}
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

const mapStateToProps = (state) => {
  return {
    showLoginError: state.auth.showLoginError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
