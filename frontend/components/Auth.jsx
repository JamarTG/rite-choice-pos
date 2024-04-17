import React, { useState } from 'react';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const [formType, setFormType] = useState('login');

  return (
    <Card style={{ border: "none", backgroundColor: "transparent" }} className="shadow-sm">
      <Card.Header style={{ backgroundColor:'transparent', display: "flex", justifyContent: "center" }} className="text-center">
        <ButtonGroup >
          <Button 
            variant={formType === 'login' ? 'primary' : 'secondary'}
            onClick={() => setFormType('login')}
          >
            Login
          </Button>
          <Button 
            variant={formType === 'register' ? 'primary' : 'secondary'}
            onClick={() => setFormType('register')}
          >
            Register
          </Button>
        </ButtonGroup>
      </Card.Header>
      <Card.Body className="d-flex justify-content-center align-items-center">
        <div className="w-50">
          {formType === 'login' ? <Login /> : <Register />}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Auth;

