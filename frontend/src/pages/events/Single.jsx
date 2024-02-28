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

    function getUserFromJWT() {
        const token = Cookies.get("jwt"); // Retrieve the JWT from a cookie
        if (!token) {
            return null; // No token found
        }

        try {
            const user = jwtDecode(token); // Decode the JWT payload
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
            setUserRole(responseData.userRole); // Assuming the API returns { userRole: X }
        } catch (error) {
            console.error("Error fetching user role:", error);
        }
    };

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
        const user = getUserFromJWT();
        if (user) {
            // Assuming the user's ID is stored in the decoded JWT as `userId`
            checkUserRole(user.userId);
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
                    {userRole === null && (
                        <Button
                            style={{
                                background: "#30306d",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "20px",
                            }}
                        >
                            Sign in to join
                        </Button>
                    )}
                    {userRole === 2 && (
                        <Button
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
                    {userRole === 3 && (
                        <Button
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
                </Card.Body>
            </Card>
        </div>
    );
};

export default SingeEventPage;
