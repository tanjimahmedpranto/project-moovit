import { useParams } from 'react-router';
import { EVENTSSERVICE } from "../../constants";
import { useState, useEffect } from 'react';


const SingeEventPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState([]);

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

  return(
    <h1>Event Id {eventData?.msg}</h1>
  )
}

export default SingeEventPage;