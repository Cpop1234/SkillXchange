import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfileDropdown = () => {
  let user = null;
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    try {
      user = JSON.parse(userInfo);
    } catch (error) {
      localStorage.removeItem("userInfo");
    }
  }

  const handleLogout = async () => {
    // Perform logout logic
    localStorage.removeItem("userInfo");
    try {
      await axios.get("/auth/logout");
      window.location.href = `${window.location.origin}/login`;
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        console.error(error.response.data.message);
      }
    }
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      href=""
      ref={ref}
      onClick={(e) => {
        onClick(e);
      }}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          overflow: "hidden",
          marginRight: "10px",
        }}
      >
        <img
          src={user?.picture} // Replace with your image URL
          alt="User Avatar"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      {children}
      &#x25bc;
    </div>
  ));

  const CustomMenu = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    return (
      <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
        <ul className="list-unstyled">{React.Children.toArray(children)}</ul>
      </div>
    );
  });

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item
          onClick={() => {
            if (!user?.username) {
              toast.error("Unable to open profile. Please login again.");
              return;
            }
            window.location.href = `${window.location.origin}/profile/${encodeURIComponent(user.username)}`;
          }}
        >
          Profile
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Header = () => {
  let navUser = null;
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    try {
      navUser = JSON.parse(userInfo);
    } catch (error) {
      console.error("Error parsing userInfo:", error);
      localStorage.removeItem("userInfo");
    }
  }
  const discover = window.location.pathname.startsWith("/discover");

  return (
    <>
      <Navbar key="md" expand="md" className="bg-body-primary" style={{ backgroundColor: "#3BB4A1", zIndex: 998 }}>
        <Container fluid>
            <Navbar.Brand href="/" style={{ fontFamily: "Josefin Sans, sans-serif", color: "#2d2d2d", fontWeight: 500 }}>
            SkillXchange
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
              <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-md`}
                style={{ fontFamily: "Josefin Sans, sans-serif", color: "#028477" }}
              >
                SkillXchange
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/" style={{ fontFamily: "Montserrat, sans-serif", color: "#2d2d2d" }}>
                  Home
                </Nav.Link>
                {navUser !== null ? (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/discover"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "#2d2d2d" }}
                    >
                      Discover
                    </Nav.Link>
                    <Nav.Link as={Link} to="/chats" style={{ fontFamily: "Montserrat, sans-serif", color: "#2d2d2d" }}>
                      Your Chats
                    </Nav.Link>
                    {/* Paakhi discover page ke links yeha dalde please */}
                    {discover && (
                      <>
                        <Nav.Link
                          href="#for-you"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "#f56664",
                            fontSize: "1.2rem",
                            marginTop: "2rem",
                          }}
                          className="d-md-none"
                        >
                          For You
                        </Nav.Link>
                        <Nav.Link
                          href="#popular"
                          style={{ fontFamily: "Montserrat, sans-serif", color: "#3bb4a1", fontSize: "1.2rem" }}
                          className="d-md-none"
                        >
                          Popular
                        </Nav.Link>
                        <Nav.Link
                          href="#web-development"
                          style={{ fontFamily: "Montserrat, sans-serif", color: "#013e38", marginLeft: "1.5rem" }}
                          className="d-md-none"
                        >
                          Web Development
                        </Nav.Link>
                        <Nav.Link
                          href="#machine-learning"
                          style={{ fontFamily: "Montserrat, sans-serif", color: "#013e38", marginLeft: "1.5rem" }}
                          className="d-md-none"
                        >
                          Machine Learning
                        </Nav.Link>
                        <Nav.Link
                          href="#others"
                          style={{ fontFamily: "Montserrat, sans-serif", color: "#013e38", marginLeft: "1.5rem" }}
                          className="d-md-none"
                        >
                          Others
                        </Nav.Link>
                      </>
                    )}
                    <Nav.Link as={Dropdown} style={{ fontFamily: "Montserrat, sans-serif", color: "#2d2d2d" }}>
                      <UserProfileDropdown />
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/about_us"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "#2d2d2d" }}
                    >
                      About Us
                      </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/#why-skillxchange"
                      style={{ fontFamily: "Montserrat, sans-serif", color: "#2d2d2d" }}
                    >
                      Why SkillXchange
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login" style={{ fontFamily: "Montserrat, sans-serif", color: "#2d2d2d" }}>
                      Login/Register
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
