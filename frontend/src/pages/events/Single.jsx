import { useParams } from "react-router";
import { EVENTSSERVICE } from "../../constants";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import BackButton from "../components/BackButton";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const SingeEventPage = () => {
    const { id } = useParams();
    const [eventData, setEventData] = useState([]);
    const [displayDate, setDisplayDate] = useState("");
    const [userRole, setUserRole] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    const [userId, setUserId] = useState(null);
    const [enrolledParticipantsCount, setenrolledParticipantsCount] = useState(0);

    function getUserFromJWT() {
        const token = Cookies.get("jwt"); // Retrieve the JWT from a cookie
        if (!token) {
            return null; // No token found
        }

        try {
            const user = jwtDecode(token); // Decode the JWT payload
            setUserId(user.subject);
            return user; // This will contain user details from the payload
        } catch (error) {
            console.error("Failed to decode JWT", error);
            return null;
        }
    }

    const checkUserRole = async (userId) => {
        const fetchURL = `${EVENTSSERVICE}/getUserRole/${id}/${userId}`;
        try {
            const response = await fetch(fetchURL);
            const responseData = await response.json();
            if (responseData === 2) setIsJoined(true);
            if (responseData === 3) setIsJoined(false);
            setUserRole(responseData);
        } catch (error) {
            console.error("Error fetching user role:", error);
        }
    };

    const joinEvent = async () => {
        const requestBody = JSON.stringify({
            eventId: id,
            userId: userId,
        });
        console.log(requestBody);

        const response = await fetch(`${EVENTSSERVICE}/joinEvent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        });

        if (response.ok) {
            setIsJoined(true);
            setenrolledParticipantsCount(enrolledParticipantsCount + 1);
            console.log("Event joined successfully");
        } else {
            console.error("Failed to join event");
        }
    };

    const disjoinEvent = async () => {
        const requestBody = JSON.stringify({
            eventId: id,
            userId: userId,
        });

        try {
            const response = await fetch(`${EVENTSSERVICE}/disjoinEvent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: requestBody,
            });

            if (response.ok) {
                setIsJoined(false);
                setenrolledParticipantsCount(enrolledParticipantsCount - 1);
                console.log("Event disjoined successfully");
            } else {
                console.error("Failed to disjoin event");
            }
        } catch (error) {
            console.error("Error disjoining event:", error);
        }
    };

    // Attempt to fetch data.
    const getEventData = async () => {
        const fetchURL = EVENTSSERVICE + "/" + id;
        try {
            const response = await fetch(fetchURL);
            const responseData = await response.json();
            console.log(responseData);
            setEventData(responseData);
            setenrolledParticipantsCount(responseData.enrolledParticipantsCount);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // Use Effect to only trigger the fetch once
    useEffect(() => {
        getEventData();
        const user = getUserFromJWT();
        if (user) {
            // Assuming the user's ID is stored in the decoded JWT as `userId`
            checkUserRole(user.subject);
        }
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
                marginLeft: "25px",
                marginRight: "25px",
            }}
        >
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
                            {enrolledParticipantsCount}/
                            {eventData?.maxParticipants}
                        </p>
                        <p>
                            <i class="bi bi-calendar-event"></i>
                            &nbsp;{displayDate}
                        </p>
                    </div>
                    <br />
                    {userRole === null && (
                        <Button
                            onClick={() => (window.location.href = "/login")}
                        >
                            Sign in to join
                        </Button>
                    )}
                    {userRole === 1 && <p></p>}
                    {userRole !== 1 && userRole !== null && isJoined && (
                        <Button
                            onClick={disjoinEvent}
                            style={{
                                background: "#d9534f",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "20px",
                            }}
                        >
                            Disjoin
                        </Button>
                    )}
                    {userRole !== 1 && userRole !== null && !isJoined && (
                        <Button
                            onClick={joinEvent}
                            style={{
                                background: "#5cb85c",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "20px",
                            }}
                        >
                            Join Event
                        </Button>
                    )}
        </div>
    );
};

export default SingeEventPage;
