import React from "react";
import Event from "../viewEvents/Event";
import events from "../events";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import BackButton from "../components/BackButton";
import { default as logo } from "../../assets/muuvitLogo.svg";
import { Link } from "react-router-dom";

export default function HomeScreen() {
    return (
        <div
            style={{
                marginTop: "30px",
                marginBottom: "20px",
                marginLeft: "10px",
                marginRight: "10px",
            }}
        >
            <Container>
                <Card
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,72,85,1) 100%)",
                        border: "none",
                    }}
                >
                    <div>
                        <BackButton navigateTo="/login" /> <br />
                    </div>
                    <div
                        className="logoAndSignIn"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={logo}
                            width={100}
                            height={100}
                            className=""
                            alt="muuvitLogo"
                        />
                        <Link to="/login">
                            <Button
                                variant="primary"
                                style={{
                                    color: "white",
                                    backgroundColor: "#30306d",
                                    borderRadius: "10px",
                                    marginTop: "5px",
                                    marginBottom: "5px",
                                    marginLeft: "5px",
                                    marginRight: "5px",
                                    width: "100px",
                                    border: "none",
                                }}
                            >
                                Sign In
                            </Button>
                        </Link>
                    </div>

                    <Card.Body>
                        <Container fluid>
                            <div
                                className="eventList d-flex flex-column align-items-center"
                                style={{ width: "100%" }}
                            >
                                {events.map((event) => (
                                    <Row
                                        key={event._id}
                                        className="w-100 d-flex justify-content-center"
                                    >
                                        <Col
                                            xs={12}
                                            className="d-flex justify-content-center"
                                        >
                                            <Event event={event} />
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                            <div
                                className="d-flex buttons justify-content-center"
                                style={{
                                    marginTop: "20px",
                                    marginBottom: "20px",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    border: "none",
                                }}
                            >
                                <Link to="/about">
                                    <Button
                                        variant="primary"
                                        style={{
                                            color: "white",
                                            backgroundColor: "#30306d",
                                            borderRadius: "10px",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                            width: "200px",
                                            border: "none",
                                        }}
                                    >
                                        About Muuvit
                                    </Button>
                                </Link>
                                <Link to="/pp">
                                    <Button
                                        variant="primary"
                                        style={{
                                            color: "white",
                                            backgroundColor: "#30306d",
                                            borderRadius: "10px",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                            width: "200px",
                                            border: "none",
                                        }}
                                    >
                                        Privacy Policy
                                    </Button>
                                </Link>
                                <Link to="#">
                                    <Button
                                        variant="primary"
                                        style={{
                                            color: "white",
                                            backgroundColor: "#30306d",
                                            borderRadius: "10px",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                            width: "200px",
                                            border: "none",
                                        }}
                                    >
                                        Help Center
                                    </Button>
                                </Link>
                                <Link to="/tac">
                                    <Button
                                        variant="primary"
                                        style={{
                                            color: "white",
                                            backgroundColor: "#30306d",
                                            borderRadius: "10px",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                            width: "200px",
                                            border: "none",
                                        }}
                                    >
                                        Terms & Conditions
                                    </Button>
                                </Link>
                            </div>
                            {/* You can place additional divs here for other components that might align left or right */}
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
