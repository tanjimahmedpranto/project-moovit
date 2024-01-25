import React from "react";
import Event from "../viewEvents/Event";
import events from "../events";
import { Container, Card, Row, Col } from "react-bootstrap";
import BackButton from "../components/BackButton";
import { default as logo } from "../../assets/muuvitLogo.svg";

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
                    <img
                        src={logo}
                        width={100}
                        height={100}
                        className="rounded mx-auto d-block"
                        alt="muuvitLogo"
                    />
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
                            {/* You can place additional divs here for other components that might align left or right */}
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
