import React from "react";
import "./InfoPageLayout.css";
import { Container } from "react-bootstrap";
import BackButton from "./BackButton";
import { useEffect } from "react";


const InfoPageLayout = ({heading, paragraph}) => {
    useEffect(() => {
        console.log("scrollll")
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
          });
      }, [])
    return(
        <div className="info-page-wrapper">
            <BackButton navigateTo="/" />
            <Container>
                <h1>{heading}</h1>
                <p>{paragraph}</p>
            </Container>
        </div>
    )
}

export default InfoPageLayout;