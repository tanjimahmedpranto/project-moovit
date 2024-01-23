import Carousel from "react-bootstrap/Carousel";
import React from "react";
import Event from "../viewEvents/Event";
import events from "../events";
import { Container, Card } from "react-bootstrap";
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
                    <Card.Body>
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

                        <div>
                            <div
                                className="eventCarouselList"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Carousel
                                    fade
                                    interval={null}
                                    style={{ width: "500px", height: "500px" }}
                                >
                                    {events.map((event) => (
                                        <Carousel.Item key={event._id}>
                                            <Event event={event} />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
