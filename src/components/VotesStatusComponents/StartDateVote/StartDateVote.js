import React from "react";
import './StartDateVote.css';
import DateTime from "../StartDateVote/DataTimeVote";

const StartDateVote = (props) => {

    const {
        dateTimeDate,
        dateTimeWatch,
        title
    } = props;

    console.log(dateTimeWatch)

    return (
        <div className={'status-block__start-vote'}>
            <h4>{title}</h4>
            <DateTime dateTimeDate={dateTimeDate} dateTimeWatch={dateTimeWatch} />
        </div>
    )
}

export default StartDateVote;