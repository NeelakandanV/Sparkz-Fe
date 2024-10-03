import React from "react";
import { children } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from "react-router-dom";

export default function BaseApp({PageTitle,children}){

  const navigate = useNavigate();
  const Name = sessionStorage.getItem('Name');

  return(
    <div className="MainParentCont">
      <div className="TitleCont">
        <h3>Sparkz⚡</h3>
        <p>Daily Dress Color Suggestor</p>
      </div>

      <div className="NavigationCont">
        <div className="Navigation">
          <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
            <Container fluid>
              <Navbar.Brand className="PageTitle" href="#">{PageTitle}</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${false}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                    Welcome, {Name}
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/UpdateProfile">My Profile</Nav.Link>
                    <Nav.Link href="/Suggestions">Grab your Attire</Nav.Link>
                    <Nav.Link href="/Favorites">My Favorites</Nav.Link>
                    <Nav.Link href="/Rewards">Refer & Earn</Nav.Link>
                    <Nav.Link href="/CustomerCare">Customer Care</Nav.Link>
                    <Nav.Link href="/">Logout</Nav.Link>
                  </Nav>
                  <br/>
                  <Button variant="danger" onClick={()=>navigate("/DeleteAccount")}>Delete Account</Button>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
      </div>

      <div className="ContentCont">
        {children}
      </div>

      <div className="FooterCont">
        <div className="Foot">
          <p>&#169;All Rights Reserved@Sparkz⚡</p>
          <p>Made with 💙 Sparkz⚡ Team</p>
        </div>
      </div>
    </div>
  );
}