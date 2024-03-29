import React, { useState } from 'react';
import { Form, Button, FormGroup, FormControl, FormLabel, Alert } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        name,
        email,
        password,
        role,
      });

      console.log({
        name,
        email,
        password,
        role,
      })

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <FormGroup controlId="name">
        <FormLabel>Name</FormLabel>
        <FormControl 
          type="text" 
          placeholder="Enter name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>

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

      <FormGroup controlId="confirmPassword">
        <FormLabel>Confirm Password</FormLabel>
        <FormControl 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup controlId="role">
        <FormLabel>Role</FormLabel>
        <FormControl 
          as="select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Staff Member">Staff Member</option>
        </FormControl>
      </FormGroup>

      <Button style={{ width: "150px" }} variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default Register;
