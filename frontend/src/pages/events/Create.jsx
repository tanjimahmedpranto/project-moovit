import React, { useState } from "react";
import { EVENTSSERVICE } from "../../constants";

import InputField from "./InputField";

const createEvent = async (e, data) => {
    let errorsInFields = false;
    const jwt =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjUzZDg2OTNlMjU0ZTk5MWE0OTdlYTg2IiwiaWF0IjoxNjk5NTMxNzAxfQ.8kC3sw3tRefxoNsHrJCPTnR7pk9-pfc4wba_wPNz1vU";
    e.preventDefault();

    // Terminate if any errors.
    if (errorsInFields) {
        return;
    }
    // Send the registration request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({}),
    };

    console.log(data);

    if (Math.random < 1) return;

    const fetchURL = EVENTSSERVICE + "/create";
    const response = await fetch(fetchURL, requestOptions);

    // Handle response.
    if (response.status === 400) {
    }
    if (response.status === 200) {
        console.log("success");
    } else {
        console.log("error code: " + response.status);
    }
};

const CreateEventPage = () => {
    const [eventData, setEventData] = useState({});

    const updateEventData = (prop, value) => {
        const newData = Object.assign({}, eventData, { [prop]: value });
        setEventData(newData);
    };

    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={(e) => createEvent(e, eventData)}>
                <InputField
                    type="text"
                    label="Event name"
                    onValueChange={(value) => updateEventData("name", value)}
                />
                <div>
                    <label>Description:</label>
                    <textarea
                        type="text"
                        value={setEventData.description}
                        onChange={(e) =>
                            updateEventData("description", e.target.value)
                        }
                    />
                </div>

                <InputField
                    type="text"
                    label="Host name"
                    onValueChange={(value) => updateEventData("host", value)}
                />
                <InputField
                    type="date"
                    label="Date"
                    onValueChange={(value) => updateEventData("date", value)}
                />
                <InputField
                    type="text"
                    label="Time"
                    onValueChange={(value) => updateEventData("time", value)}
                />
                <InputField
                    type="number"
                    label="Duration"
                    onValueChange={(value) =>
                        updateEventData("duration", value)
                    }
                />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEventPage;
