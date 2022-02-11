import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const LoginGQL = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const uselocation = useLocation();
  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const Login = gql`
  mutation {
    userLogin(
      email: "${loginData.email}",
      password: "${loginData.password}"
    )
    {
      cookie
      message
      access_token
    }
  }
  `;
  const [login, { data, loading, error }] = useMutation(Login);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      variables: {
        email:  loginData.email,
        password: loginData.password,
      },
    }).then((res) => {
      console.log("res", res);
      console.log(res.data.userLogin.message);
      if (res.data.userLogin.message) {
        navigate("/", { replace: true });
      }
    });
  };
  useEffect(() => {
    if (uselocation.state) {
      if (uselocation.state.email) {
        setLoginData({
          ...loginData,
          email: uselocation.state.email,
        });
      }
    }
  }, [uselocation]);
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  return (
    <>
      <Container fluid={"md"}>
        <Row>
          <Col xs={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={loginData.email}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                />
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
export default LoginGQL;
