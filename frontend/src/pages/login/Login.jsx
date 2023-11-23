import React from "react";
import "../../styles/FormBase.css";
import { Link } from "react-router-dom";
import { default as logo } from "../../assets/muuvitLogo.svg";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import "../../styles/FormBase.css";

export default function Login() {
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div class="container d-flex align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>{" "}
                  </div>
                  <img
                    src={logo}
                    width={100}
                    height={100}
                    className="rounded mx-auto d-block"
                    alt="muuvitLogo"
                  />
                  <h3>Sign In</h3>
                  <br />
                  <div className="mb-3">
                    <Form>
                      {/* Email address logic begin */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                      {/* Password logic begin */}
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Sign in
                        </Button>
                      </div>
                    </Form>
                    <br />

                    <div className="mb-2">
                      <input
                        type="checkbox"
                        className="custom-control custom-checkbox"
                        id="check"
                      />
                      <label
                        htmlFor="check"
                        className="custom-input-label ms-2"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        {/* Forget password?{" "} */}
                        <Link to="/login" className="text-primary fw-bold">
                          Forget password?
                        </Link>
                      </p>
                    </div>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        No account yet?{" "}
                        <Link to="/signup" className="text-primary fw-bold">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
