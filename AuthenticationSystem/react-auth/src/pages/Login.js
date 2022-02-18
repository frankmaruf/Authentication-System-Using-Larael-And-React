import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = ({setLogin}) => {
  const navigate = useNavigate();
  const [data,setData] = useState({
    email: "",
    password: "",
  });
  const uselocation = useLocation();
  const handleSubmit =  (e) => {
    e.preventDefault();
    console.log('data',data);
    axios.post("/login", {
      email: data.email,
      password: data.password,
    }).then((res) => {
      console.log("res", res);
      if (res.data.message) {
        navigate("/", { replace: true,state:{email:data.email}});
        setLogin();

      }
    });
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
          <Form.Control onChange={handleInputChange} type="password" name="password" placeholder="Password" value={data.password} />
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
