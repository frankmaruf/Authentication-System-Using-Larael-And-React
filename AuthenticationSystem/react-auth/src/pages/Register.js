import React, { useState,useRef, useEffect } from 'react';
import { Button, Container, Form,Row,Col } from 'react-bootstrap';
import { useNavigate,Navigate } from 'react-router-dom';
const Register = () => {
  const first_nameRef = useRef(null);
  const last_nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const password_confirmRef = useRef(null);
  const submitRef = useRef(null);
  const [data,setData] = useState({
    'first_name': '',
    'last_name': '',
    'email': 'maruf@mail.com',
    'password': '',
    'password_confirm': ''
  })
  let navigate = useNavigate();
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/login',{replace:true,state:{email:data.email}});
  }
  useEffect(() => {
    if (first_nameRef.current) {
      first_nameRef.current.focus();
    }
  }, [first_nameRef]);
  function first_name_onKeyDown(e) {
    if (e.key === 'Enter') {
      last_nameRef.current.focus();
    }
  }
  function last_name_onKeyDown(e) {
    if (e.key === 'Enter') {
      emailRef.current.focus();
    }
  }
  function email_onKeyDown(e) {
    if (e.key === 'Enter') {
      passwordRef.current.focus();
    }
  }
  function password_onKeyDown(e) {
    if (e.key === 'Enter') {
      password_confirmRef.current.focus();
    }
  }
  function password_confirm_onKeyDown(e) {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }
  return <>
  <Container fluid={'md'}>
    <Row>
      <Col xs={6}>
      <Form onSubmit={handleSubmit}>
        <Form.Group  className="mb-3" controlId="formBasicFirstName">
          <Form.Label column >First Name</Form.Label>
          <Form.Control onKeyDown={first_name_onKeyDown} ref={first_nameRef} name='first_name' value={data.first_name} onChange={handleInputChange} type="text" placeholder="First Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control onKeyDown={last_name_onKeyDown} ref={last_nameRef} name='last_name' value={data.last_name} onChange={handleInputChange} type="text" placeholder="Last Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onKeyDown={email_onKeyDown} ref={emailRef} name='email' value={data.email} onChange={handleInputChange} type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onKeyDown={password_onKeyDown} ref={passwordRef} name='password' value={data.password} onChange={handleInputChange} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword_Confirm">
          <Form.Label>Password</Form.Label>
          <Form.Control onKeyDown={password_confirm_onKeyDown} ref={password_confirmRef} name='password_confirm' value={data.password_confirm} onChange={handleInputChange} type="password" placeholder="Confirm Password" />
        </Form.Group>
      <Button ref={submitRef} variant="primary" type='submit' >Register</Button>
      </Form>
      </Col>
    </Row>
  </Container>
  </>;
};
export default Register;