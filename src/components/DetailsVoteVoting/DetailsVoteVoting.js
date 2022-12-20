import React, {useState} from "react";
import iconExcel from "../../img/AddNewOrgIconExcel.svg";
import iconDate from "../../img/DetailsVoteStatisitcsVoteIconDate.svg";
import iconTime from "../../img/VotesPageActiveVotes_time_icon.svg";
import iconReg from "../../img/AddNewOrgSuccessIcon.svg";
import iconNoReg from "../../img/DetailsVoteVotingIconNoReg.svg";
import iconVoted from "../../img/DetailsVoteVotingIconVoted.svg";
import iconNoVoted from "../../img/DetailsVoteVotingIconNoVote.svg";
import PaginationBlock from "../PaginationBlock/PaginationBlock";

const DetailsVoteVoting = (props) => {

    const {
        constants
    } = props;

    const [activeChangeStatusReg, setActiveChangeStatusReg] = useState(true);
    const [activeChangeStatusVoted, setActiveChangeStatusVoted] = useState(true);

    return (
        <div className="details-vote-voting__container">
            <h3 className="details-vote-voting__title-mobile">Голосующие</h3>
            <div className="details-vote-voting__title-block">
                <h3 className="details-vote-voting__title">Список голосующих</h3>
                <div className="details-vote-voting__export-excel">
                    <img className="details-vote-voting__export-excel-icon" src={iconExcel} alt={constants.GENERAL.ALT_ICON}/>
                    <p className="details-vote-voting__export-excel-label">ЭКСПОРТ В EXCEL</p>
                </div>
            </div>
            <div className="details-vote-voting__last-update">
                <p className="details-vote-voting__last-update-label">Последнее обновление:</p>
                <img src={iconDate} alt={constants.GENERAL.ALT_ICON}/>
                <p className="details-vote-voting__last-update-icon-label">10.12.2020</p>
                <img src={iconTime} alt={constants.GENERAL.ALT_ICON}/>
                <p className="details-vote-voting__last-update-icon-label">17:20</p>
            </div>
            {/*<PaginationBlock/>*/}
            <div className="details-vote-voting__table">
                <div className="details-vote-voting__table-row">
                    <p className="details-vote-voting__table-row-username">Петрунин Вадим Николаевич</p>
                    <p className="details-vote-voting__table-row-email">v.petrunin@spbu.ru</p>
                    <div className="details-vote-voting__table-row-status">
                        <p className="details-vote-voting__table-row-status-icon-label">
                            <img className="details-vote-voting__table-row-status-icon" src={activeChangeStatusReg ? iconReg : iconNoReg} alt={constants.GENERAL.ALT_ICON}/>
                            <span className="details-vote-voting__table-row-status-label" style={activeChangeStatusReg ? {color: '#4ED4A9'} : {color: 'rgba(54, 59, 77, 0.6)'}}>
                                {activeChangeStatusReg ? 'Зарегистрирован' : 'Не зарегистрирован'}</span>
                            <div className="details-vote-voting__table-row-status-mobile" style={activeChangeStatusReg ? {background: 'rgba(78, 212, 169, 0.15)'} : {background: 'rgba(55, 60, 78, 0.1)'}}>
                                <li className="details-vote-voting__table-row-status-mobile-label" style={activeChangeStatusReg ? {color: '#4ED4A9'} : {color: 'rgba(54, 59, 77, 0.6)'}}>
                                    {activeChangeStatusReg ? 'Зарегистрирован' : 'Не зарегистрирован'}
                                </li>
                            </div>
                        </p>
                        <p className="details-vote-voting__table-row-status-icon-label">
                            <img className="details-vote-voting__table-row-status-icon" src={activeChangeStatusVoted ? iconVoted : iconNoVoted} alt={constants.GENERAL.ALT_ICON}/>
                            <span className="details-vote-voting__table-row-status-label" style={activeChangeStatusVoted ? {color: '#4569FF'} : {color: '#FF4970'}}>
                                {activeChangeStatusVoted ? 'Проголосовал' : 'Не проголосовал'}</span>
                            <div className="details-vote-voting__table-row-status-mobile" style={activeChangeStatusVoted ? {background: 'rgba(69, 105, 255, 0.15)'} : {background: 'rgba(255, 73, 112, 0.15)'}}>
                                <li className="details-vote-voting__table-row-status-mobile-label" style={activeChangeStatusVoted ? {color: '#4569FF'} : {color: '#FF4970'}}>
                                    {activeChangeStatusVoted ? 'Проголосовал' : 'Не проголосовал'}
                                </li>
                            </div>
                        </p>
                    </div>
                </div>
                <p className="details-vote-voting__show-more">ПОКАЗАТЬ ПОЛНОСТЬЮ</p>
            </div>
            {/*<PaginationBlock/>*/}
        </div>
    )
}
export default DetailsVoteVoting;