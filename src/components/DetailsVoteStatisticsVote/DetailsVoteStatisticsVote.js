import React from "react";
import iconTime from "../../img/VotesPageActiveVotes_time_icon.svg";
import iconDate from "../../img/DetailsVoteStatisitcsVoteIconDate.svg";
import iconGreenCircle from "../../img/DetailsVoteStaticticsIconGreenCircle.svg";
import iconYellowCircle from "../../img/DetailsVoteStaticticsIconYellowCircle.svg";
import iconGreenDash from "../../img/DetailsVoteStaticticsIconGreenDash.svg";
import iconYellowDash from "../../img/DetailsVoteStaticticsIconYellowDash.svg";
import iconSuccess from "../../img/AddNewOrgSuccessIcon.svg";

const DetailsVoteStatisticsVote = (props) => {

    const {
        constants
    } = props;

    return (
        <div className="details-vote-statistics-vote__container">
            <h3 className="details-vote-statistics-vote__title-mobile">Статистика</h3>
            <h3 className="details-vote-statistics-vote__title">Ход регистрации</h3>
            <div className="details-vote-statistics-vote__last-update">
                <p className="details-vote-statistics-vote__last-update-label">Последнее обновление:</p>
                <img src={iconDate} alt={constants.GENERAL.ALT_ICON}/>
                <p className="details-vote-statistics-vote__last-update-icon-label">10.12.2020</p>
                <img src={iconTime} alt={constants.GENERAL.ALT_ICON}/>
                <p className="details-vote-statistics-vote__last-update-icon-label">17:20</p>
            </div>
            <div className="details-vote-general-info__results-diagramm-block">

                <div className="details-vote-statistics-vote__result-voted-registred-block">
                    <div className="details-vote-statistics-vote__result-registred">
                        <div className="details-vote-statistics-vote__result-registred-items">
                            <img className="details-vote-statistics-vote__result-registred-icon" src={iconGreenCircle} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="details-vote-statistics-vote__result-registred-label">Зарегистрированы (65%)</p>
                        </div>
                        <div className="details-vote-statistics-vote__result-registred-items">
                            <img className="details-vote-statistics-vote__result-registred-icon" src={iconYellowCircle} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="details-vote-statistics-vote__result-registred-label">Не зарегистрированы (35%)</p>
                        </div>
                    </div>
                    <div className="details-vote-statistics-vote__result-voted">
                        <div className="details-vote-statistics-vote__result-voted-items">
                            <img className="details-vote-statistics-vote__result-voted-icon" src={iconGreenDash} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="details-vote-statistics-vote__result-voted-label">Проголосовали (40%) </p>
                        </div>
                        <div className="details-vote-statistics-vote__result-voted-items">
                            <img className="details-vote-statistics-vote__result-voted-icon" src={iconYellowDash} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="details-vote-statistics-vote__result-voted-label">Не проголосовали (60%)</p>
                        </div>
                    </div>
                </div>
                <div className="details-vote-statistics-vote__diagramm-block">

                </div>
                <div className="details-vote-statistics-vote__status-event-quorum-condition">
                    <div className="details-vote-statistics-vote__quorum">
                        <p className="details-vote-statistics-vote__quorum-label">Условие кворума</p>
                        <p className="details-vote-statistics-vote__quorum-note">Необходимо участие в голосовании более чем половины участников</p>
                    </div>
                    <div className="details-vote-statistics-vote__status-event">
                        <p className="details-vote-statistics-vote__status-event-label">Статус события</p>
                        <p className="details-vote-statistics-vote__status-event-icon">
                            <img src={iconSuccess} alt={constants.GENERAL.ALT_ICON}/>Кворум достигнут</p>
                    </div>
                   <div className="details-vote-statistics-vote__progress-visit-vote">
                       <p className="details-vote-statistics-vote__progress-visit-vote-label">Электронная явка (70%)</p>
                       <div className="details-vote-statistics-vote__progress">
                           <div className="details-vote-statistics-vote__progress-bar"></div>
                       </div>

                   </div>
                </div>
            </div>
            ПОКАЗАТЬ ПОЛНОСТЬЮ
        </div>
    )
}
export default DetailsVoteStatisticsVote;