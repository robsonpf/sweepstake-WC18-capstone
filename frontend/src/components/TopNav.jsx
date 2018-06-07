import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogout } from '../redux/actions/auth';

  const navbar = {backgroundColor: '#2475b2'}

class TopNav extends Component {
  state = {
    isOpen: false
  };


  handleLogout = (e) => {
    e.preventDefault()
    console.log("this.props", this.props)
    this.props.userLogout(this.props.history)
  }

  render() {
    return (
      <div>
        <Navbar
          style={navbar}
          dark
          expand="md"
          className="fixed-top"
        >
          <Link to="/">
            <NavbarBrand href="/">
              Sweepstake RUSSIA 18
            </NavbarBrand>
          </Link>

          <NavbarToggler />
          <Collapse navbar>
            {/* <Nav className="ml-auto" navbar>
            </Nav> */}
            {!this.props.loggedIn ? (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/signup">Sign Up</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login">Log In</NavLink>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/profile/">Welcome,{this.props.user.firstName}!</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/matches/">Matches</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/components/">Teams</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/components/">Groups</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="/login"
                    onClick={this.handleLogout}
                  >
                    Log Out
                  </NavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    token: state.auth,
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
    // exp: state.token.exp,
    // iat: state.token.iat,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
