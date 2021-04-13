import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavLink className="d-inline p-2 bg-dark text-white" to="/unit">
            Unit
          </NavLink>
          <NavLink className="d-inline p-2 bg-dark text-white" to="/client">
            Client
          </NavLink>
          <NavLink className="d-inline p-2 bg-dark text-white" to="/history">
            History
          </NavLink>
          <NavLink className="d-inline p-2 bg-dark text-white" to="/service">
            Service
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
