import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">My app</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/posts">Posts</Nav.Link>
            <Nav.Link href="/photos">Photos</Nav.Link>
          </Nav>

          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          {/* <Button variant="outline-success">Login / Register</Button> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
