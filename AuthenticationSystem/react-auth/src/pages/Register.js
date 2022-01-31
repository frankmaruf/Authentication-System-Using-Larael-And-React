import React, { useState,useRef, useEffect } from 'react';
import { Button, Container, Form,Row,Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const first_nameRef = useRef(null);
  const [data,setData] = useState({
    'first_name': '',
    'last_name': '',
    'email': '',
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
    const response = await axios.post('/register',{
      'first_name': data.first_name,
      'last_name': data.last_name,
      'email': data.email,
      'password': data.password,
      'password_confirm': data.password_confirm
    });
    if (response.data.message) {
      navigate('/login',{replace:true,state:{email:data.email}});
    }
  }
  useEffect(() => {
    if (first_nameRef.current) {
      first_nameRef.current.focus();
    }
  }, [first_nameRef]);
  return <>
  <Container fluid={'md'}>
    <Row>
      <Col xs={6}>
      <Form onSubmit={handleSubmit}>
        <Form.Group  className="mb-3" controlId="formBasicFirstName">
          <Form.Label column >First Name</Form.Label>
          <Form.Control  ref={first_nameRef} name='first_name' value={data.first_name} onChange={handleInputChange} type="text" placeholder="First Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control name='last_name' value={data.last_name} onChange={handleInputChange} type="text" placeholder="Last Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name='email' value={data.email} onChange={handleInputChange} type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' value={data.password} onChange={handleInputChange} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword_Confirm">
          <Form.Label>Password</Form.Label>
          <Form.Control  name='password_confirm' value={data.password_confirm} onChange={handleInputChange} type="password" placeholder="Confirm Password" />
        </Form.Group>
      <Button variant="primary" type='submit' >Register</Button>
      </Form>
      </Col>
    </Row>
  </Container>
  </>;
};
export default Register;