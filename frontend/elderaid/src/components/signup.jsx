import React, { useState} from "react";
import { useForm } from './useForm'
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import qs from 'qs';
import { useHistory} from 'react-router-dom';

function Signup() {
    const [values, handleChange] = useForm({firstName: "", lastName: "", email: "", password: "", contactNumber: ""})
    const [role, setRole] = useState("YOUTH")

    function handleSubmit(event) {
      event.preventDefault();
    }

        const history = useHistory
        const routeChange = () => {
            if (values.password1 === values.password2) {
                var userInformation = {firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password1, contactNumber: values.contactNumber, role: role};
                const options = {
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: qs.stringify(userInformation),
                    url: 'http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/users'
                  };
                  axios(options).then(function(user) {
                    //localStorage.setItem("userId", user.data._id);
                    let path = "/login"; 
                    history.push(path);  
                  }).catch(function(err) {
                    alert(err.response.data);
                  });
            }
        }

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col>
            <Form.Group controlId="formBasicfirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" name="firstName" value={values.firstName} onChange={handleChange}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasiclastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" name="lastName" value={values.lastName} onChange={handleChange}/>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={values.email} onChange={handleChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password1" value={values.password1} onChange={handleChange}/>
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword2">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Re-Enter Password" name="password2" values={values.password2} onChange={handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasiccontactNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Phone Number" name="contactNumber" values={values.contactNumber} onChange={handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Are You A Senior?" id="elderly" name="elderly" onChange={() => {
            var currentRole = role;
            if (currentRole == "YOUTH") {
                setRole("ELDER");
            } else {
                setRole("YOUTH");
            };
        }}/>
        </Form.Group>

      </Container>
      <Button variant="primary" type="submit"
        onClick={routeChange}
        >
        Submit
      </Button>
    </Form>
  );
}
export default Signup;
