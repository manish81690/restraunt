import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "../styles/dashboard.css";
import HomePage from "./homePage";
import Bookmarked from "./bookMarked";
import Login from "./login";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tabName: string) => {
    navigate(`/${tabName}`);
  };

  return (
    <>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Container fluid className="dashboard">
        <Row>
          <Col md={2} className="sideNavbar">
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link
                  className={`${
                    location.pathname === "/homepage" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("homepage")}
                >
                  Homepage
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className={`${
                    location.pathname === "/bookmarked" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("bookmarked")}
                >
                  Bookmarked Restaurants
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className={`${
                    location.pathname === "/logout" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("logout")}
                >
                  Logout
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={10}>
            <div>
              <Routes>
                <Route path="/homepage" element={<HomePage />} />

                <Route path="/bookmarked" element={<Bookmarked/>} />
                <Route path="/logout" element={<></>} />
              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
