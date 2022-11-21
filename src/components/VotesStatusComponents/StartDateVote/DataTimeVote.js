import React from "react";
import './DataTimeVote.css';
import icon_data from "../../../img/MyVotes_data_icon.svg";
import icon_time from "../../../img/MyVotes_icon_time.svg";

const DataTimeVote = ({DateVote, TimeVote}) => {

    return (
        <div className={'start-vote__data'}>
            <img alt={'иконка календарь'} src={icon_data}/>
            <span>{DateVote}</span>
            <img alt={'иконка часы'} src={icon_time}/>
            <span>{TimeVote}</span>
        </div>
    )
}

export default DataTimeVote;