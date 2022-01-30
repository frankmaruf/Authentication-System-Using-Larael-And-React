import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
const Login = () => {
  const [data,setData] = useState({
    email: "",
    password: "",
  });
  const uselocation = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (uselocation.state) {
      if (uselocation.state.email) {
        setData({
          ...data,
          email: uselocation.state.email,
        });
      }
    }
  }, [uselocation]);
  return (
    <>
     <Container fluid={'md'}>
    <Row>
      <Col xs={6}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={handleInputChange} name="email" type="email" placeholder="Enter email" value={data.email} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Col>
      </Row>
      </Container>
    </>
  );
};

export default Login;
