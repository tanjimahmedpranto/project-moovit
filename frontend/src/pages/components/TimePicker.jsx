import React from "react";
import "./EventCard.css";
import {useState, useRef} from 'react'

const TimePicker = ({defaultTime}) => {

    const elementRef = useRef();
    const [isMoving, setIsMoving] = useState(false);
    const [minuteAngle, setMinuteAngle] = useState(-90);
    const [hourAngle, setHourAngle] = useState(-90);
    const [targetHand, setTargetHand] = useState("H")

    // console.log(elementRef)
    
    
    const handleMouseDown= (event, target) => {setIsMoving(true); setTargetHand(target)};
    const handleMouseUp = () => {setIsMoving(false); console.log("Not moving")};

      const handleMouseMove = (event) => {
        console.log("Is moving", isMoving)
        if (!isMoving) return;
        const boundingBox = elementRef.current.getBoundingClientRect();
        const relativeOrigin = [
            boundingBox.x + boundingBox.width/2,
            boundingBox.y + boundingBox.height/2,
        ]
        const mouseRelativeCoordinate = [
            event.clientX - relativeOrigin[0],
            event.clientY - relativeOrigin[1]
        ]
        
        const angle = (180/Math.PI) * (Math.atan2(
            mouseRelativeCoordinate[1],
            mouseRelativeCoordinate[0],
        ));
        console.log(targetHand);
        if(targetHand === "M") {
            setMinuteAngle(angle);
        } else if(targetHand === "H") {
            setHourAngle(angle);
        }
        console.log(mouseRelativeCoordinate[0], mouseRelativeCoordinate[1]);    

      };
    
    return (
        
        <svg width="200" height="200" viewBox="0 0 200 200" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        {/* Clock face */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="black" strokeWidth="2" ref={elementRef}/>
        <g transform="translate(100, 100)">
            {/* Hour hand */}
            <g transform={"rotate(" + (hourAngle+90) + ")"}>
                <line x1="0" y1="0" x2="0" y2="-70" stroke="black" strokeWidth="4" />
                <circle cx="0" cy="-70" r="10" fill="black" onMouseDown={(event) => handleMouseDown(event, "H")}/>
            </g>
    
            {/* Minute hand */}
            <g transform={"rotate(" + (minuteAngle+90) + ")"}>
                <line x1="0" y1="0" x2="0" y2="-90" stroke="black" strokeWidth="4" />
                <circle cx="0" cy="-90" r="8" fill="black" onMouseDown={(event) => handleMouseDown(event, "M")}/>
            </g>
        </g>
      </svg>
    );
}
export default TimePicker;
