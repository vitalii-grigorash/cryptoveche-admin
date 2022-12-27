import React, {useState} from "react";
import iconTime from "../../img/VotesPageActiveVotes_time_icon.svg";
import iconDate from "../../img/DetailsVoteStatisitcsVoteIconDate.svg";
import iconGreenCircle from "../../img/DetailsVoteStaticticsIconGreenCircle.svg";
import iconYellowCircle from "../../img/DetailsVoteStaticticsIconYellowCircle.svg";
import iconGreenDash from "../../img/DetailsVoteStaticticsIconGreenDash.svg";
import iconYellowDash from "../../img/DetailsVoteStaticticsIconYellowDash.svg";
import iconBlueDashGraph from "../../img/DetailsVoteStaticticsIconBlueDashGraph.svg";
import iconGreenDashGraph from "../../img/DetailsVoteStaticticsIconGreenDashGraph.svg";
import iconSuccess from "../../img/AddNewOrgSuccessIcon.svg";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import PaginationBlock from "../PaginationBlock/PaginationBlock";

const DetailsVoteStatisticsVote = (props) => {

    const {
        constants
    } = props;

    const [activeDynamicsVisit, setActiveDynamicsVisit] = useState(false);
    const [activeGraphVisit, setActiveGraphVisit] = useState(true);
    const [activeTableVisit, setActiveTableVisit] = useState(false);
    const [sectorCircle, setSectorCircle] = useState(0.5);

    const onChangeGraphVisit = () => {
        setActiveGraphVisit(true);
        setActiveTableVisit(false);
    }

    const onChangeTableVisit = () => {
        setActiveTableVisit(true);
        setActiveGraphVisit(false);
    }

    function drawCircles(radius, sectorCircle, colorsCircle) {
        let circleFull = 2 * Math.PI * radius;
        let gapBetweenCircle = sectorCircle === 1 ? 0 : 1;
        let circleFill = circleFull * sectorCircle;
        let circleEmpty = circleFull - circleFill;
        let circleOffset = circleFull / 4;

        return (
            <>
                {sectorCircle && typeof (sectorCircle) === 'number' && (
                    <svg className={'diagramm-circle'} viewBox={'0 0 50 50'}>
                        <circle className={'circle__style'} r={radius} cx={'50%'} cy={'50%'} stroke={colorsCircle[0]} strokeDasharray={(circleFill - gapBetweenCircle) + ' ' + circleEmpty} strokeDashoffset={circleOffset} />
                        <circle className={'circle__style'} r={radius} cx={'50%'} cy={'50%'} stroke={colorsCircle[1]} strokeDasharray={(circleEmpty - gapBetweenCircle) + ' ' + circleFill} strokeDashoffset={circleOffset - circleFill + gapBetweenCircle / 2} />
                    </svg>
                )}
            </>
        )
    }

    return (
        <div className="details-vote-statistics-vote__container">
            <h3 className="details-vote-statistics-vote__title-mobile">{constants.DETAILS_VOTE.STATISTICS_TITLE_MOBILE}</h3>
            <h3 className="details-vote-statistics-vote__title">{constants.DETAILS_VOTE.STATISTIC_TITLE}</h3>
            <div className="details-vote-statistics-vote__last-update">
                <p className="details-vote-statistics-vote__last-update-label">{constants.DETAILS_VOTE.STATISTIC_LATEST_UPDATE}</p>
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
                            <p className="details-vote-statistics-vote__result-registred-label">{constants.DETAILS_VOTE.STATISTIC_REGISTRED_MEMBERS} (65%)</p>
                        </div>
                        <div className="details-vote-statistics-vote__result-registred-items">
                            <img className="details-vote-statistics-vote__result-registred-icon" src={iconYellowCircle} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="details-vote-statistics-vote__result-registred-label">{constants.DETAILS_VOTE.STATISTIC_NOT_REGISTRED_MEMBERS} (35%)</p>
                        </div>
                    </div>
                    <div className="details-vote-statistics-vote__result-voted">
                        <div className="details-vote-statistics-vote__result-voted-items">
                            <img className="details-vote-statistics-vote__result-voted-icon" src={iconGreenDash} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="details-vote-statistics-vote__result-voted-label">{constants.DETAILS_VOTE.STATISTIC_VOTED} (40%) </p>
                        </div>
                        <div className="details-vote-statistics-vote__result-voted-items">
                            <img className="details-vote-statistics-vote__result-voted-icon" src={iconYellowDash} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="details-vote-statistics-vote__result-voted-label">{constants.DETAILS_VOTE.STATISTIC_NOT_VOTED} (60%)</p>
                        </div>
                    </div>
                </div>
                <div className="details-vote-statistics-vote__diagramm-block">
                    {drawCircles(22, sectorCircle, ['#4ED4A9', '#F9C521'])}
                    <div className="details-vote-statistics-vote__diagramm-block-numbers-reg-voting">
                        <p className="details-vote-statistics-vote__diagramm-num-reg">12 387</p>
                        <p className="details-vote-statistics-vote__diagramm-label-reg">{constants.DETAILS_VOTE.STATISTIC_REG_GENERAL_MEMBERS}</p>
                        {/*<p className="details-vote-statistics-vote__diagramm-num-vote">2 387</p>*/}
                        {/*<p className="details-vote-statistics-vote__diagramm-label-vote">проголосовало</p>*/}
                    </div>
                </div>
                <div className="details-vote-statistics-vote__status-event-quorum-condition">
                    <div className="details-vote-statistics-vote__quorum">
                        <p className="details-vote-statistics-vote__quorum-label">{constants.DETAILS_VOTE.STATISTIC_QUORUM_CONDITION}</p>
                        <p className="details-vote-statistics-vote__quorum-note">Необходимо участие в голосовании более чем половины участников</p>
                    </div>
                    <div className="details-vote-statistics-vote__status-event">
                        <p className="details-vote-statistics-vote__status-event-label">{constants.DETAILS_VOTE.STATISTIC_STATUS_EVENT}</p>
                        <p className="details-vote-statistics-vote__status-event-icon">
                            <img src={iconSuccess} alt={constants.GENERAL.ALT_ICON}/>{constants.DETAILS_VOTE.STATISTIC_QUORUM_SUCCESS}</p>
                    </div>
                   <div className="details-vote-statistics-vote__progress-visit-vote">
                       <p className="details-vote-statistics-vote__progress-visit-vote-label">{constants.DETAILS_VOTE.STATISTIC_ELECTRONIC_VISIT} (70%)</p>
                       <div className="details-vote-statistics-vote__progress">
                           <div className="details-vote-statistics-vote__progress-bar"></div>
                       </div>
                   </div>
                </div>
            </div>
                <p onClick={() => setActiveDynamicsVisit(true)} className={activeDynamicsVisit ? "details-vote-statistics-vote__show-more-btn hidden" : "details-vote-statistics-vote__show-more-btn" }>
                    {constants.DETAILS_VOTE.STATISTIC_SHOW_MORE_BTN}
                </p>
                <div className={activeDynamicsVisit ? "details-vote-statistics-vote__dynamics-visit" : "details-vote-statistics-vote__dynamics-visit hidden"}>
                    <p className="details-vote-statistics-vote__dynamics-visit-title">{constants.DETAILS_VOTE.STATISTIC_DYNAMIC_VISIT}</p>
                    <div className="details-vote-statistics-vote__dynamics-visit-change-graph-table">
                        <div onClick={() => onChangeGraphVisit()} className={activeGraphVisit ? "details-vote-statistics-vote__change-graph-btn active" : "details-vote-statistics-vote__change-graph-btn"}>
                        </div>
                        <div onClick={() => onChangeTableVisit()} className={activeTableVisit ? "details-vote-statistics-vote__change-table-btn active" : "details-vote-statistics-vote__change-table-btn"}>
                        </div>
                    </div>
                    {activeGraphVisit && (
                        <div className="details-vote-statistics-vote__dynamics-visit-graph">
                            <div className="details-vote-statistics-vote__visit-graph-explanations">
                                <div className="details-vote-statistics-vote__visit-graph-explanations-general-visit">
                                    <img src={iconBlueDashGraph} alt={constants.GENERAL.ALT_ICON}/>
                                    <p>{constants.DETAILS_VOTE.STATISTIC_GENERAL_VISIT}</p>
                                </div>
                                <div className="details-vote-statistics-vote__visit-graph-explanations-voting-visit">
                                    <img src={iconGreenDashGraph} alt={constants.GENERAL.ALT_ICON}/>
                                    <p>{constants.DETAILS_VOTE.STATISTIC_VISIT_VOTING}</p>
                                </div>
                            </div>
                         <div className="details-vote-statistics-vote__visit-graph">
                             <div className="details-vote-statistics-vote__hidden-block"></div>
                             <Chart width={'914px'} height={'453px'} type={'line'} data={{
                                 labels: ['12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00'],
                                 datasets: [
                                     {
                                         label: 'Общая явка',
                                         data: [0, 20, 30, 35, 40, 50, 55, 70],
                                         fill: false,
                                         borderColor: '#0084FE',
                                         tension: 0.5,
                                         pointRadius: 3,
                                         pointBackgroundColor: '#0084FE',
                                         borderWidth: 2,
                                         backgroundColor: '#0084FE'
                                     },
                                     {
                                         label: 'Явка голосующих',
                                         data: [0, 2, 5, 12, 15, 19, 22, 30],
                                         fill: false,
                                         borderColor: '#4ED4A9',
                                         tension: 0.5,
                                         pointRadius: 3,
                                         pointBackgroundColor: '#4ED4A9',
                                         borderWidth: 2,
                                         backgroundColor: '#4ED4A9'
                                     }
                                 ]
                             }}/>
                         </div>
                        </div>
                    )}
                    {activeTableVisit && (
                        <div className="details-vote-statistics-vote__dynamics-visit-table">
                            {/*<PaginationBlock/>*/}
                            <div className="details-vote-statistics-vote__visit-table">
                                <div className="details-vote-statistics-vote__visit-table-header">
                                    <p className="details-vote-statistics-vote__visit-table-header-time">{constants.DETAILS_VOTE.STATISTIC_TABLE_TIME}</p>
                                    <p className="details-vote-statistics-vote__visit-table-header-visit-time">{constants.DETAILS_VOTE.STATISTIC_TABLE_VISIT_TIME}</p>
                                    <p className="details-vote-statistics-vote__visit-table-header-general-visit">{constants.DETAILS_VOTE.STATISTIC_GENERAL_VISIT}</p>
                                </div>
                                <div className="details-vote-statistics-vote__visit-table-row">
                                    <p className="details-vote-statistics-vote__visit-table-row-colimn-time">12:00 - 13:00</p>
                                    <p className="details-vote-statistics-vote__visit-table-row-colimn-visit-time">10%</p>
                                    <p className="details-vote-statistics-vote__visit-table-row-colimn-general-visit">10%</p>
                                </div>
                            </div>
                            {/*<PaginationBlock/>*/}
                        </div>
                    )}
                </div>
            <p onClick={() => setActiveDynamicsVisit(false)} className={activeDynamicsVisit ? "details-vote-statistics-vote__roll-up-btn" : "details-vote-statistics-vote__roll-up-btn hidden"}>
                {constants.DETAILS_VOTE.STATISTIC_HIDE_BTN}
            </p>
        </div>
    )
}
export default DetailsVoteStatisticsVote;