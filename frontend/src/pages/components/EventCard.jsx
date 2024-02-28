import React from "react";
import "./EventCard.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const EventCard = ({eventData}) => {
    const linkDestination = "/event/" + eventData._id;

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [labels, setLabels] = useState("");

    // Get date and time.
    if ( (date === "" || time === "") && eventData.date != null ) {
        const newDate = new Date(eventData.date);
        const dateString = newDate.toLocaleDateString("fi-FI");
        
        let hours = newDate.getHours();
        if ( hours < 10)
            hours = "0" + hours
        let minutes = newDate.getMinutes();
        if ( minutes < 10)
            minutes = "0" + minutes

        const timeString = hours + "." + minutes;
        setTime(timeString);
        setDate(dateString);
    }

    // Get tags and categories.
    if ( labels === "" )  {
        const tagsElements = eventData.tags?.map(
            (tag) => <li className="event-tag" key={tag}>{tag.substring(0, (Math.floor(Math.random() * 5) + 5))}</li>
        
        )
        const categoriesElements = eventData.tags?.map(
            (category) => <li className="event-category" key={category}>{category.substring(0, 6)}</li>
        )
        const labelsElements = [...(categoriesElements ?? []), ...(tagsElements ?? [])];
        if ( labelsElements.length > 0 ) {
            const labelsList = <ul>{labelsElements}</ul>
            setLabels(labelsList)
        }
    }

    return (
        <div className="card-background">
            <Link to={linkDestination}>
            <div className="card-image" >
                <img src={eventData.imageURL} alt=""/>
            </div>
            <p className="event-name">{eventData.eventName}</p>
            <p className="event-host">Hosted by {eventData.host}</p>
            <p className="event-date">
                <i className="bi bi-calendar-event"></i>
                {date}
            </p>
            </Link>
            <p className="event-time">
                <i className="bi bi-clock"></i>
                {time}
            </p>
            <div className="event-labels">{labels}</div>
        </div>
    );
}
export default EventCard;
