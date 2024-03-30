import React, { useState } from 'react';
import { Card, Tabs, Tab } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const [key, setKey] = useState('login');

  return (
    <Card style={{border:"none",backgroundColor:"transparent"}} className="shadow-sm">
      <Card.Header style={{display:"flex", justifyContent:"center"}} className="text-center">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-0"
        >
          <Tab eventKey="login" title="Login"></Tab>
          <Tab eventKey="register" title="Register"></Tab>
        </Tabs>
      </Card.Header>
      <Card.Body className="d-flex justify-content-center align-items-center">
        <div className="w-50">
          {key === 'login' ? <Login /> : <Register />}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Auth;
