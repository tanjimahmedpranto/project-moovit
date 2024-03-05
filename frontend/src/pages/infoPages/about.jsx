import React from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import BackButton from "../components/BackButton";
import InfoPageLayout from "../components/InfoPageLayout";

export default function about() {
    return (
        <InfoPageLayout heading={"About Muuvit"}
                    paragraph={"Muuvit is a social platform (on the web) where members can create and participate in small scale outdoor sport/exercise events (eg. skiing, yoga in the park, functional training at the outdoor gym). When one hosts events the event gets an own page where one can add information about the event. The events are open so everybody can participate. The events may have an upper limit of participants"}
                    />
        
    );
}
