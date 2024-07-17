// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DataView from './components/DataView';
import DashboardView from './components/DashboardView';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Container className="mt-5">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/data-view">Data View</Nav.Link>
              <Nav.Link as={Link} to="/dashboard-view">Dashboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/data-view" element={<DataView />} />
          <Route path="/dashboard-view" element={<DashboardView />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
