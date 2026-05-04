import React from 'react';
import logo from '../../../src/assets/images/logo1.png';
import { Container, Nav, Navbar, NavItem } from 'react-bootstrap';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { isAuthenticated, destroySession } from '../../Helpers/Functions';

class Header extends React.Component {
  state = {
    isAnimationLoaded: false,
  };
  componentDidMount = () => {};
  logout() {
    destroySession();
  }

  checkAuthentication() {
    if (isAuthenticated()) {
      return (
        <Nav.Link
          href='/'
          onClick={() => this.logout()}
          className='login-browse-btn active-2'
        >
          Logout
        </Nav.Link>
      );
    } else {
      return (
        <>
          <Nav.Link href='/login' className='login-browse-btn active-2'>
            Login
          </Nav.Link>
          <Nav.Link href='/signup' className='get-browse-btn'>
            Get Started
          </Nav.Link>
        </>
      );
    }
  }

  render() {
    return (
      <>
        <Navbar collapseOnSelect expand='lg' className='browse-nav home-nav'>
          <Navbar.Brand href='#home'>
            <Link to='/'>
              {' '}
              <img src={logo} className='logo-browse' alt='' />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='m-auto'>
              <Nav.Link href='/' className='login-browse-btn mr-2 '>
                Home
              </Nav.Link>
              <Nav.Link href='/' className='login-browse-btn mr-2 '>
                Partnerships
              </Nav.Link>
              <Nav.Link href='/HireMentor' className='login-browse-btn mr-2 '>
                Hire Talent
              </Nav.Link>
              <Nav.Link href='/ContactUs' className='login-browse-btn mr-2 '>
                About Us
              </Nav.Link>
            </Nav>
            <Nav>{this.checkAuthentication()}</Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default Header;
