import React from "react";
import iconTimeZone from "../../img/VotesPageActiveVotes_time_icon.svg";
import iconTimeEvent from "../../img/MyVotes_icon_time.svg";
import iconDateEvent from "../../img/MyVotes_data_icon.svg";
import MaterialsVoteQuestion from "../VotesStatusComponents/MaterialsVoteQuestion/MaterialsVoteQuestion";

const DetailsVoteGeneralInfo = (props) => {

    const {
        constants
    } = props;

    return (
        <div className="details-vote-general-info__container">
            <h3 className="details-vote-general-info__title-name-vote">Выбор делегатов конференции в Ученый Совет СПбГУ</h3>
            <div className="details-vote-general-info__main-block">
                <div className="details-vote-general-info__name-org-status-block">
                    <p className="details-vote-general-info__name-org">Ученый совет</p>
                    <div className="details-vote-general-info__timezone-vote">
                        <img className="details-vote-general-info__time-icon" src={iconTimeZone} alt={constants.GENERAL.ALT_ICON}/>
                        <p className="details-vote-general-info__timezone-label">(UTC+3) Россия - Москва</p>
                    </div>
                    <div className="details-vote-general-info__status-possible-revote-block">
                        <div className="details-vote-general-info__current-status-vote">
                            <div className="details-vote-general-info__status-vote"><li>Регистрация и голосование</li></div>
                            <div className="details-vote-general-info__type-vote"><li>Открытое</li></div>
                        </div>
                        <div className="details-vote-general-info__possible-revote-cancel-reg">
                           <p className="details-vote-general-info__possible-label">
                               Возможность переголосования: <span className="details-vote-general-info__possible-value">есть</span>
                           </p>
                           <p className="details-vote-general-info__possible-label">
                               Возможность отмены регистрации: <span className="details-vote-general-info__possible-value">есть</span>
                           </p>
                        </div>
                    </div>
                </div>
                <div className="details-vote-general-info__datetime-block">
                    <div className="details-vote-general-info__datetime-event">
                        <p className="details-vote-general-info__datetime-event-label">Начало регистрации:</p>
                        <div className="details-vote-general-info__datetime-icons-values">
                            <img src={iconDateEvent} alt={constants.GENERAL.ALT_ICON}/>
                            <p>05.01.2023</p>
                            <img src={iconTimeEvent} alt={constants.GENERAL.ALT_ICON}/>
                            <p>18:00</p>
                        </div>
                    </div>
                    <div className="details-vote-general-info__datetime-event">
                        <p className="details-vote-general-info__datetime-event-label">Конец регистрации:</p>
                        <div className="details-vote-general-info__datetime-icons-values">
                            <img src={iconDateEvent} alt={constants.GENERAL.ALT_ICON}/>
                            <p>05.01.2023</p>
                            <img src={iconTimeEvent} alt={constants.GENERAL.ALT_ICON}/>
                            <p>18:00</p>
                        </div>
                    </div>
                    <div className="details-vote-general-info__datetime-event">
                        <p className="details-vote-general-info__datetime-event-label">Начало голосования:</p>
                        <div className="details-vote-general-info__datetime-icons-values">
                            <img src={iconDateEvent} alt={constants.GENERAL.ALT_ICON}/>
                            <p>05.01.2023</p>
                            <img src={iconTimeEvent} alt={constants.GENERAL.ALT_ICON}/>
                            <p>18:00</p>
                        </div>
                    </div>
                    <div className="details-vote-general-info__datetime-event">
                        <p className="details-vote-general-info__datetime-event-label">Конец голосования:</p>
                        <div className="details-vote-general-info__datetime-icons-values">
                            <img src={iconDateEvent} alt={constants.GENERAL.ALT_ICON}/>
                            <p>05.01.2023</p>
                            <img src={iconTimeEvent} alt={constants.GENERAL.ALT_ICON}/>
                            <p>18:00</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="details-vote-general-info__materials-vote">
                <MaterialsVoteQuestion materialsVoteName={constants.VOTES_PAGE.VOTES_PAGE_MATERIALS_VOTE}/>
            </div>
            <div className="details-vote-general-info__buttons-block">
                <button className="details-vote-general-info__start-end-vote-btn">Начать голосование</button>
                <button className="details-vote-general-info__start-end-reg-btn">Начать регистрацию</button>
                <button className="details-vote-general-info__delete-vote-btn">Удалить голосование</button>
            </div>
        </div>
    )
}
export default DetailsVoteGeneralInfo;