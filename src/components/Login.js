import React from "react";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";

import { Container, Button, Form } from "react-bootstrap";

import { login } from "../utils/serverCalls";
import { extractDataFromForm } from "../utils/utils";

const Login = () => {
  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userData = extractDataFromForm(e.target);
      const res = await login(userData);
      console.log(res);
      history.push("/posts");
    } catch (error) {
      Swal.fire(error, "", "error");
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
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
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
