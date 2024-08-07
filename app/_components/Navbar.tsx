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
import Image from "next/image";

function CollapsibleExample() {
  const { status, data: session } = useSession();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <div>
            <img
              src="/logo.png"
              width="40rem"
              height="40rem"
              className="d-inline-block align-center mx-1"
              alt="Logo"
            />{" "}
            Mottrack
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className={`${isMobile ? "my-1" : ""}`}
              eventKey={2}
              href="#dashboard"
            >
              Dashboard
            </Nav.Link>
            <Nav.Link className={`${isMobile ? "my-1" : ""}`} href="#Store">
              Store
            </Nav.Link>
          </Nav>
          <Nav className={`${isMobile ? "my-1" : ""}`}>
            {status === "authenticated" && (
              <NavDropdown
                className=""
                title={
                  (!isMobile && (
                    <div className="d-flex d-inline-block align-items-center justify-content-center">
                      <img
                        src={session?.user?.image!}
                        width={30}
                        height={30}
                        className="d-inline-block mx-1 "
                      />
                    </div>
                  )) ||
                  (isMobile && (
                    <div className=" align-center text">
                      {session?.user?.name}
                    </div>
                  ))
                }
                id="collapsible-nav-dropdown"
                align={isMobile ? "start" : "end"}
              >
                <NavDropdown.Item href="#user/config">
                  User configuration
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/api/auth/signout">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {status === "loading" && (
              <Spinner animation="grow" variant="secondary" className="mx-2" />
            )}
            {status === "unauthenticated" && (
              <a href="/api/auth/signin" className="text">
                Login
              </a>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
