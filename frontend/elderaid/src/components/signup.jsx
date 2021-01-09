import React from "react";
import { useForm } from './useForm'
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import qs from 'qs';

function Signup() {
    const [values, handleChange] = useForm({firstName: "", lastName: "", email: "", password: "", contactNumber: ""})
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        if (values.password1 === values.password2) {
            
        const config = {
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        var userInformation = {firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password1, contactNumber: values.contactNumber};
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(userInformation),
            url: 'http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/users'
          };
          axios(options);  
        }
    }
  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" name="firstName" value={values.firstName} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" name="lastName" value={values.lastName} />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={values.email} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password1" value={values.password1} />
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Re-Enter Password" name="password2" values={values.password2}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Phone Number" name="contactNumber" values={values.contactNumber} />
        </Form.Group>
      </Container>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
export default Signup;
