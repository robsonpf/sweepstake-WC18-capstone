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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignup } from '../redux/actions/signup';
import TopNav from './TopNav';

// const navbar = {backgroundColor: '#283e4a'}

export class Signup extends Component {
  state = {
    isFormValid: true,
    isValid: true,
    passwordClasses: 'form-control',
    firstName: '',
    lastName: '',
    userName: '',
    phone: '',
    password: '',
    verify_password: ''
  }

  handleSignup = e => {
    e.preventDefault()
    let { firstName, lastName, userName, phone, password, verify_password } = this.state;
    if ( !firstName || !lastName || !userName || !phone || !password || !verify_password ) {
      this.setState({
        invalidForm: this.state.invalidForm + 'is-invalid',
        isFormValid: false
      })
    } else if (password !== verify_password) {
      this.setState({
        passwordClasses: this.state.passwordClasses + ' is-invalid',
        isValid: false
      })
    } else if (firstName && lastName && userName && phone && password) {
      let newUser = { firstName, lastName, userName, phone, password }
      console.log('newUser =>', newUser);
      console.log("this.props.history =>", this.props.history);
      this.setState({
        isValid: true,
        isFormValid: true
      })
      this.props.userSignup(firstName, lastName, userName, phone, password, this.props.history)
      console.log('this.props.userSignup(firstName, lastName, userName, phone, password, this.props.history)', this.props.userSignup(firstName, lastName, userName, phone, password, this.props.history));
    }
  }
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
            <Form onSubmit={this.handleSignup}>
              <FormGroup>
                <Label for="firstName">First name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstname-field"
                  placeholder="first name"
                  value={this.state.firstName}
                  onChange={e =>
                    this.setState({ firstName: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label for="lastName">Last name</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastname-field"
                  placeholder="last name"
                  value={this.state.lastName}
                  onChange={e =>
                    this.setState({ lastName: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label for="userName">Username</Label>
                <Input
                  type="test"
                  name="email"
                  id="userName"
                  placeholder="example@gmail.com"
                  value={this.state.userName}
                  onChange={e =>
                    this.setState({ userName: e.target.value })
                  }
                />
              </FormGroup>


              <FormGroup>
                <Label for="phone">Phone Number</Label>
                <Input
                  type="phone"
                  name="phone"
                  id="phone-field"
                  placeholder="phone"
                  value={this.state.phone}
                  onChange={e =>
                    this.setState({ phone: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password-field"
                  placeholder="password"
                  value={this.state.password}
                  onChange={e =>
                    this.setState({ password: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label for="verify_password">Verify Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="verify_password"
                  placeholder="password"
                  value={this.state.verify_password}
                  onChange={e =>
                    this.setState({ verify_password: e.target.value })
                  }
                />
                {!this.state.isValid ? (
                  <Alert color="danger">Passwords do not match</Alert>
                ) : !this.state.isFormValid ? (
                  <Alert color="danger">Form must be filled!</Alert>
                ) : null}
                {this.props.showSignupError ? (
                  <Alert color="danger">{this.props.message}</Alert>
                ) : null}
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

const mapStateToProps = (state, props) => {
  return {
    message: state.signup.message,
    showSignupError: state.signup.showSignupError
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ userSignup }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
