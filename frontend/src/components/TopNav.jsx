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

  const navbar = {backgroundColor: '#2475b2'}

class TopNav extends Component {
  state = {
    isOpen: false
  };

  // toggle = () => {
  //   localStoreage.removeItem("")
  // }


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
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Matches</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Teams</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Groups</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Log In</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Filter By Team
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Argentina
                  </DropdownItem>
                  <DropdownItem>
                    Australia
                  </DropdownItem>
                  <DropdownItem>
                    Belgium
                  </DropdownItem>
                  <DropdownItem>
                    Brazil
                  </DropdownItem>
                  <DropdownItem>
                    Colombia
                  </DropdownItem>
                  <DropdownItem>
                    Costa Rica
                  </DropdownItem>
                  <DropdownItem>
                    Croatia
                  </DropdownItem>
                  <DropdownItem>
                    Denamark
                  </DropdownItem>
                  <DropdownItem>
                    Egypt
                  </DropdownItem>
                  <DropdownItem>
                    England
                  </DropdownItem>
                  <DropdownItem>
                    France
                  </DropdownItem>
                  <DropdownItem>
                    Germany
                  </DropdownItem>
                  <DropdownItem>
                    Iceland
                  </DropdownItem>
                  <DropdownItem>
                    IR Iran
                  </DropdownItem>
                  <DropdownItem>
                    Japan
                  </DropdownItem>
                  <DropdownItem>
                    Korea Republic
                  </DropdownItem>
                  <DropdownItem>
                    Mexico
                  </DropdownItem>
                  <DropdownItem>
                    Morocco
                  </DropdownItem>
                  <DropdownItem>
                    Nigeria
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

// const mapStateToProps = (state, props) => {
//   return {
//
//   }
// }

export default TopNav;
