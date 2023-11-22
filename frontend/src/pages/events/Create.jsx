import React, { useState } from 'react';
import {EVENTSSERVICE} from '../../constants';

import InputField from './InputField';


const createEvent = async (e, name, description) => {
    let errorsInFields = false;
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjUzZDg2OTNlMjU0ZTk5MWE0OTdlYTg2IiwiaWF0IjoxNjk5NTMxNzAxfQ.8kC3sw3tRefxoNsHrJCPTnR7pk9-pfc4wba_wPNz1vU";
    e.preventDefault();

    // Terminate if any errors.
    if(errorsInFields){
      return;
    }
    // Send the registration request
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + jwt
    },
      body: JSON.stringify({})
    }

    alert(name + "\n" + description);
    return;
    const fetchURL = EVENTSSERVICE + "/create";
    const response = await fetch(fetchURL, requestOptions);
    
    // Handle response.
    if(response.status === 400){
        ;;;
    }
    if(response.status === 200){
      console.log("success");
    }else{
      console.log("error code: " + response.status);
    }
  };


const CreateEventPage = () => {

    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={(e) => createEvent(e, eventName, eventDescription)}>
        <InputField label={eventName} onValueChange={(value) => setEventName(value)}/>
        <div>
          <label>Description:</label>
          <textarea
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
