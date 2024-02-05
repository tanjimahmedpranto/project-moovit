import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Event({ event }) {
    return (
        <div
        /* style={{
                marginTop: "30px",
                marginBottom: "20px",
                marginLeft: "10px",
                marginRight: "10px",
            }} */
        >
            {/* <Card className="my-3 p-3 rounded">
                <Link to={`/event/${event._id}`}>
                    <Card.Img src={event.image} />
                </Link>

                <Card.Body>
                    <Link
                        to={`/event/${event._id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <Card.Title as="div">
                            <strong>{event.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as="div">
                        <div>Something we will put here</div>
                    </Card.Text>
                </Card.Body>
            </Card> */}

            <Card
                className="my-1 p-3"
                style={{ width: "18rem", borderRadius: "20px", border: "none" }}
            >
                {" "}
                {/* Adjust width as needed */}
                <Row noGutters>
                    <Col xs={5}>
                        {/* Image link */}
                        <Link to={`/event/${event._id}`}>
                            <Card.Img
                                variant="left"
                                src={event.imageURL}
                                style={{
                                    maxWidth: "100%",
                                    height: "80%",
                                    borderRadius: "20px",
                                }}
                            />
                        </Link>
                    </Col>
                    <Col xs={7}>
                        {/* Text content link */}
                        <Card.Body>
                            <Link
                                to={`/event/${event._id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "#120d26",
                                }}
                            >
                                <Card.Text>
                                    Date here
                                    {/* {event.date} */}
                                    {/* Assuming event object has a date field */}
                                </Card.Text>
                                <Card.Title as="div">
                                    <strong>{event.eventName}</strong>
                                </Card.Title>
                            </Link>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default Event;
