import { useParams } from "react-router";
import { EVENTSSERVICE } from "../../constants";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import BackButton from "../components/BackButton";

const SingeEventPage = () => {
    const { id } = useParams();
    const [eventData, setEventData] = useState([]);
    const [displayDate, setDisplayDate] = useState("");

    // Attempt to fetch data.
    const getEventData = async () => {
        const fetchURL = EVENTSSERVICE + "/" + id;
        try {
            const response = await fetch(fetchURL);
            const responseData = await response.json();
            setEventData(responseData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // Use Effect to only trigger the fetch once
    useEffect(() => {
        getEventData();
    }, []);

    // Get date information.
    useEffect(() => {
        const dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
        const [, year, month, day] = dateRegex.exec(
            eventData?.date ?? "2000-12-12",
        );
        const date = new Date(year, month, day);
        setDisplayDate(date.toLocaleString("default", { dateStyle: "short" }));
    }, [eventData]);

    // Return component.
    // return(
    //   <div>
    //
    //   </div>
    return (
        <div
            style={{
                marginTop: "30px",
                marginBottom: "20px",
                marginLeft: "10px",
                marginRight: "10px",
            }}
        >
            <Card>
                <Card.Body>
                    <div>
                        <BackButton navigateTo="/" /> <br />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                style={{ maxWidth: "150px" }}
                                src={eventData?.imageURL}
                                loading="lazy"
                                alt={
                                    "Image for " +
                                    eventData?.eventName +
                                    " event"
                                }
                            ></img>
                        </div>
                        <br />
                        <br />
                        <h1>
                            <i class="bi bi-star-fill"></i>&nbsp;
                            {eventData?.eventName}
                        </h1>
                        <br />
                        <p>
                            <i class="bi bi-person-circle"></i>&nbsp;Host:{" "}
                            {eventData?.host}
                        </p>
                        <p>
                            <i class="bi bi-people-fill"></i>&nbsp;
                            {eventData?.enrolledPartipants}/
                            {eventData?.maxParticipants}
                        </p>
                        <p>
                            <i class="bi bi-calendar-event"></i>
                            &nbsp;{displayDate}
                        </p>
                    </div>
                    <br />
                    <Button
                        style={{
                            background: "#30306d", // Replace with your gradient start color
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "20px",
                        }}
                    >
                        Join Event/Sign in to join
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SingeEventPage;
