import React, { useState } from 'react';
import { Form, Button, FormGroup, FormControl, FormLabel, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      if(response.data.success){
        localStorage.setItem('token', response.data.token);
      }

      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
    }

    
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <FormGroup controlId="email">
            <FormLabel>Email address</FormLabel>
            <FormControl 
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          <Button style={{ width: "150px" }} variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
