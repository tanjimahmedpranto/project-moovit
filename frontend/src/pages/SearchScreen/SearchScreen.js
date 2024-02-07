import React from "react";
import Event from "../viewEvents/Event";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import events from "../events";
import {
    Container,
    Card,
    Row,
    Col,
    Button,
    Form,
    InputGroup,
} from "react-bootstrap";
import BackButton from "../components/BackButton";
import { default as logo } from "../../assets/muuvitLogo.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { EVENTSSERVICE } from "../../constants";
import Filters from "./Filters";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./filter.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchScreen = () => {
    const [randomEventData, setRandomEventData] = useState([]);
    const [filtersVisible, setFiltersVisible] = useState(false);

    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    const getRandomEventData = async () => {
        const fetchURL = EVENTSSERVICE + "/getRandomEvents/" + 5; //it will fetch 5 random data
        try {
            const response = await fetch(fetchURL);
            const responseData = await response.json();
            setRandomEventData(responseData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getRandomEventData();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Implement your search logic here
        console.log("Searching for:", searchTerm);
    };

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
                                className="d-flex searchEvent button"
                                style={{
                                    alignItems: "center",
                                    flexDirection: "column",
                                }}
                            >
                                {/* new */}
                                <div>
                                    <Form onSubmit={handleSearchSubmit}>
                                        <Row className="mb-3">
                                            <Col>
                                                <InputGroup>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Search for events"
                                                        aria-label="Search for events"
                                                        value={searchTerm}
                                                        onChange={
                                                            handleSearchChange
                                                        }
                                                        style={{height:"100%"}}
                                                    />
                                                    <Button
                                                        variant="outline-secondary"
                                                        type="submit"
                                                    >
                                                        <FontAwesomeIcon
                                                            variant="outline-secondary"
                                                            icon={faSearch}
                                                        />
                                                    </Button>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Form>

                                    <Button
                                        onClick={toggleFilters}
                                        className="filter-toggle-btn btn-lg"
                                        type="button"
                                        style={{
                                            background: "#FF5252", // Replace with your gradient start color
                                            color: "#ffffff",
                                            border: "none",
                                            borderRadius: "20px", // Adjust as needed to match your design
                                            padding: "10px 20px",
                                            boxShadow:
                                                "0 4px 8px 0 rgba(0, 0, 0, 0.2)", // Adjust for desired shadow effect
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faSlidersH} />
                                        <span className="ms-2">Filters</span>
                                    </Button>
                                    {filtersVisible && <Filters />}
                                </div>
                            </div>

                            <div
                                className="eventList d-flex flex-column align-items-center"
                                style={{ width: "100%" }}
                            >
                                {randomEventData.length > 0 ? (
                                    randomEventData.map((event) => (
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
                                    ))
                                ) : (
                                    <div className="w-100 d-flex justify-content-center">
                                        <p>Currently no event created.</p>
                                    </div>
                                )}
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
                            ></div>
                            {/* You can place additional divs here for other components that might align left or right */}
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default SearchScreen;
