import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import BackButton from "../components/BackButton";

export default function EventScreen(event) {
    return (
        <div
            style={{
                marginTop: "30px",
                marginBottom: "20px",
                marginLeft: "10px",
                marginRight: "10px",
            }}
        >
            <div>
                <BackButton navigateTo="/login" /> <br />
            </div>
            <Container>
                <Card>
                    <Card.Img
                        variant="left"
                        src={event.image}
                        style={{
                            maxWidth: "100%",
                            height: "80%",
                        }}
                    />
                    <Card.Body>
                        <div>Event Title here</div>
                        <div>Event Category here</div>
                        <div>Event date here</div>
                        <div>Event location here</div>
                        <div>Event organiser name here</div>
                        <div>Number of participants here</div>
                        <div>About the event details here</div>
                        <br />
                        <Button>Join Event/Sign in to join</Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
