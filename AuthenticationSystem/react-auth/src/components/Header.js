import React from 'react';
import {Navbar,Container,Nav, NavLink} from 'react-bootstrap'
import { Link,NavLink as domNav } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
const Header = () => {
  return <>
  <>
  <Navbar bg="primary" variant="dark">
    <Container>
    <LinkContainer to={'/'}>
    <Navbar.Brand>Home</Navbar.Brand></LinkContainer>
    <Nav className="me-auto">
     <LinkContainer to={'/login'}>
      <Nav.Link>Login</Nav.Link></LinkContainer>
      <LinkContainer to={'/register'}>
      <Nav.Link>Register</Nav.Link></LinkContainer>
    </Nav>
    </Container>
  </Navbar>
</>
  </>;
};

export default Header;
