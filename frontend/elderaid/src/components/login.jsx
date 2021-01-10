import React, { useState } from "react";
import "./styling/login.css";
import axios from 'axios';
import qs from 'qs';
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const history = useHistory();
  const routeChange = () =>{ 
    var userInformation = {email: email, password: password};
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(userInformation),
        url: 'http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/authenticate'
      };
      axios(options).then(function(user) {
        localStorage.setItem("userId", user.data._id);
        let path = "/dashboard"; 
        history.push(path);  
      }).catch(function(err) {
        alert(err.response.data);
      });  
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button color="primary" className="px-4"
            onClick={routeChange}
            >
            Login
        </Button>

      </Form>
    </div>
  );
}

// import React from 'react';
// import { useHistory } from "react-router-dom";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";

// function Login() {

//   const history = useHistory();

//   const routeChange = () =>{ 
//     let path = "/contact"; 
//     history.push(path);
//   }

//   return (
//       <div className="app flex-row align-items-center">
//         <Container>
//           ...
//           <Row>
//             <Col xs="6">                      
//               <Button color="primary" className="px-4"
//                 onClick={routeChange}
//                   >
//                   Login
//                 </Button>
//             </Col>
//             <Col xs="6" className="text-right">
//               <Button color="link" className="px-0">Forgot password?</Button>
//             </Col>
//           </Row>
//           ...
//         </Container>
//       </div>
//   );
// }
//export default Login;

