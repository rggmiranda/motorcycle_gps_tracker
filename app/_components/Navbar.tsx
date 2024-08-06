"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSession } from "next-auth/react";
import { isMobile } from "react-device-detect";
import Spinner from "react-bootstrap/Spinner";
import "./Navbar.css";

function CollapsibleExample() {
  const { status, data: session } = useSession();
  return (
    <Navbar collapseOnSelect expand="xl" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="/logo.png"
            width="40rem"
            height="40rem"
            className="d-inline-block align-center mx-1"
          />{" "}
          Mottrack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav d-flex justify-content-between">
          <Nav >
            <Nav.Link eventKey={2} href="#dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link href="#store">Store</Nav.Link>
          </Nav>
          {/* <Nav > */}
          {status === "authenticated" && (
            <NavDropdown
              className=""
              title={
                (!isMobile && (
                  <div
                  // className="d-inline-block"
                  className="d-flex align-items-center justify-content-center"
                  >
                    <img
                      src={session?.user?.image!}
                      style={{
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </div>
                )) ||
                (isMobile && (
                  <div className="d-inline-block align-center my-1 text">
                    {session?.user?.name}
                  </div>
                ))
              }
              id="collapsible-nav-dropdown"
              align={isMobile ? "start" : "end"}
            >
              <NavDropdown.Item href="#action/3.1">
                User configuration
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/api/auth/signout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
          {status === "loading" && (
            <Spinner animation="grow" variant="secondary" />
          )}
          {status === "unauthenticated" && (
            <a href="/api/auth/signin" className="text">
              Login
            </a>
          )}
          {/* </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
