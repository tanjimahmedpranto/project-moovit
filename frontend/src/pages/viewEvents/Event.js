import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Event({ event }) {
    return (
        <div
            style={{
                marginTop: "30px",
                marginBottom: "20px",
                marginLeft: "10px",
                marginRight: "10px",
            }}
        >
            <Card className="my-3 p-3 rounded">
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
            </Card>
        </div>
    );
}

export default Event;
