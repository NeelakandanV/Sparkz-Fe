import React from "react";
import { children } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from "react-router-dom";

export default function Admin_BaseApp({PageTitle,children}){

  const navigate = useNavigate();
  const Name = sessionStorage.getItem('Name');

  return(
    <div className="Admin_MainParentCont">
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
                    Welcome , {Name}
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/Admin/Dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/Admin/Customers">Customers</Nav.Link>
                    <Nav.Link href="/Admin/Colors">Colors</Nav.Link>
                    <Nav.Link href="/Admin/DailyColor">Daily Color</Nav.Link>
                    <Nav.Link href="/Admin/MonthColor">Monthly Color</Nav.Link>
                    <Nav.Link href="/Admin/Login">Logout</Nav.Link>
                  </Nav>
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