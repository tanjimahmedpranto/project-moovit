import React from "react";

const InfoCustomizableTextComponent = ({ headerText, paragraphText }) => {
    return (
        <div>
            <h1 style={{ fontSize: "35px" }}>{headerText}</h1>
            <br></br>
            <p style={{ fontSize: "30px" }}>{paragraphText}</p>
        </div>
    );
};

export default InfoCustomizableTextComponent;
