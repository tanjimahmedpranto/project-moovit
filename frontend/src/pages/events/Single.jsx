import { useParams } from 'react-router';
import { EVENTSSERVICE } from "../../constants";
import { useState, useEffect } from 'react';


const SingeEventPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState([]);
  const [displayDate, setDisplayDate] = useState("");

  const getEventData = async () => {
    const fetchURL = EVENTSSERVICE + "/" + id;
    try {
      const response = await fetch(fetchURL);
      const responseData = await response.json();
      setEventData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  // Use Effect to only trigger the fetch once
  useEffect(() => {
    getEventData();
  }, []);

  // Get date information.
  useEffect (() => {
    const dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
    const [, year, month, day] = dateRegex.exec(eventData?.date ?? "2000-12-12")
    const date = new Date(year, month, day);
    setDisplayDate(date.toLocaleString('default', { dateStyle: 'short' }))
  }, [eventData]);

  return(
    <div>
      <img src={eventData?.imageURL} loading="lazy" alt={"Image for " + eventData?.eventName + " event"}></img>
      <h1>{eventData?.eventName}</h1>
      <p>Host: {eventData?.host}</p>
      <p>{eventData?.enrolledPartipants}/{eventData?.maxParticipants}</p>
      <p>{displayDate}</p>
    </div>
  )
}

export default SingeEventPage;