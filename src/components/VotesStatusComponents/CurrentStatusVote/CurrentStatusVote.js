import React from "react";
import './CurrentStatusVote.css';

const CurrentStatusVote = ({ regStatus, voteStatus }) => {

    const styleStatusObj = {
        'Ожидание регистрации': 'current-status__wait-voiting',
        'Идет регистрация': 'current-status__registration',
        'Ожидание голосования': 'current-status__wait-voiting',
        'Идет голосование': 'current-status__voiting',
        'Регистрация и голосование': 'current-status__registration-and-votes',
        'Голосование завершено': 'current-status__ended-voiting',
        'Кворум не достигнут': 'current-status__quorum_unpresant'
    }

    const findStyleForRegStatus = (regStatus) => {
        for (let key in styleStatusObj) {
            if (regStatus === key) {
                return styleStatusObj[key];
            }
        }
    };

    return (
        <div className={'status-block__current-status'}>
            <div className={findStyleForRegStatus(regStatus)}>
                {/*<div className={'current-status__registration'}>*/}
                <ul><li>{regStatus}</li></ul>
            </div>
            <div className={'current-status__types-vote'}>
                <ul><li>{voteStatus}</li></ul></div>
        </div>
    )
}

export default CurrentStatusVote;