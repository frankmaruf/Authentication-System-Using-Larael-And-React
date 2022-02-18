import React, { useEffect } from "react";
import { Navbar, Container, Nav, NavLink } from "react-bootstrap";
import { Link, NavLink as domNav } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
const Header = ({ user,setLogin,setUser }) => {
  useEffect(() => {

  }, [user]);


  let links;
  if (user) {
    links = (
      <>
        <Nav.Link as={domNav} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={domNav} to="/user">
          User
        </Nav.Link>
        <Nav.Link
          onClick={() => {
            axios.post("/logout").then((res) => {
              setLogin();
              setUser(null);
              console.log(res);
            });
          }}
        >
          Logout
        </Nav.Link>
      </>
    );
  } else {
    links = (
      <>
        <Nav.Link as={domNav} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={domNav} to="/login">
          Login
        </Nav.Link>
<Nav.Link as={domNav} to="/loginql">
LoginQL
        </Nav.Link>

        <Nav.Link as={domNav} to="/register">
          Register
        </Nav.Link>
      </>
    );
  }
  return (
    <>
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <LinkContainer to={"/"}>
              <Navbar.Brand>Home</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              {/* <LinkContainer to={'/user'}>
      <Nav.Link>User</Nav.Link></LinkContainer>
     <LinkContainer to={'/login'}>
      <Nav.Link>Login</Nav.Link></LinkContainer>
      <LinkContainer to={'/loginql'}>
      <Nav.Link>LoginQL </Nav.Link></LinkContainer>
      <LinkContainer to={'/register'}>
      <Nav.Link>Register</Nav.Link></LinkContainer> */}
              {links}
            </Nav>
          </Container>
        </Navbar>
      </>
    </>
  );
};

export default Header;
