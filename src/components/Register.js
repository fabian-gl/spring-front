import React from "react";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";

import { Container, Button, Form } from "react-bootstrap";

import { register } from "../utils/serverCalls";
import { extractDataFromForm } from "../utils/utils";

const Register = () => {
  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userData = extractDataFromForm(e.target);
      await register(userData);
      await Swal.fire(
        "You have been successfully registered",
        "Now log in please",
        "success"
      );

      history.push("/login");
    } catch (error) {
      Swal.fire(error, "", "error");
    }
  };

  return (
    <Container>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" required name="firstName" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" required name="lastName" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" required name="email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            minLength="6"
            required
            name="password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
