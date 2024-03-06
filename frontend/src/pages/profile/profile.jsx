import React from "react";
import "./profile.css";

export default function Profile() {
    return (
        <div
            className="d-flex"
            style={{
                padding: "30px 20px 10px 10px",
                background:
                    "linear-gradient(120deg, rgba(255,205,210,1) 0%, rgba(242,72,85,1) 100%)",
            }}
        >
            <div className="heading">
                <h1>Name:</h1>
                <h2>Email Adress:</h2>
                <h3>Join Date: </h3>
            </div>
        </div>
    );
}
