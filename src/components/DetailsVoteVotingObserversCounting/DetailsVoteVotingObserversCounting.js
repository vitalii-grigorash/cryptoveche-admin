import React, {useEffect, useState} from "react";
import iconExcel from "../../img/AddNewOrgIconExcel.svg";
import iconDate from "../../img/DetailsVoteStatisitcsVoteIconDate.svg";
import iconTime from "../../img/VotesPageActiveVotes_time_icon.svg";
import iconReg from "../../img/AddNewOrgSuccessIcon.svg";
import iconNoReg from "../../img/DetailsVoteVotingIconNoReg.svg";
import iconVoted from "../../img/DetailsVoteVotingIconVoted.svg";
import iconNoVoted from "../../img/DetailsVoteVotingIconNoVote.svg";
import imageNoActiveVoting from "../../img/DetailsVoteObserversIconEmptyComponent.svg";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import {Link} from "react-router-dom";

const DetailsVoteVotingObserversCounting = (props) => {

    const {
        constants,
        titleName,
        titleNameMobile,
        changeStatusColumn
    } = props;

    const [testObj, setTestObj] = useState([]);
    const [showNoActiveVotingObservers, setShowNoActiveVotingObservers] = useState(false);
    const [hideBlock, setHideBlock] = useState(true);

    useEffect(() => {
       switch (changeStatusColumn) {
           case 'voting' : {
               setTestObj(votingObj)
               break;
           }
           case 'observers' : {
               setTestObj(observersObj)
               break;
           }
           case 'counting' : {
               setTestObj(countingObj)
               break;
           } default: {}
       }
    }, [])

    const votingObj = [
        {name: 'Петрунин Вадим Николаевич', email: 'v.petrunin@spbu.ru', statusReg: true, statusVote: false},
        {name: 'Тимошина Анастасия Владимировна', email: 'anastasia.timoshina98@yandex.ru', statusReg: false, statusVote: false},
        {name: 'Ускова Анна Владимировна', email: 'anyauskowa@yandex.ru', statusReg: true, statusVote: true},
        {name: 'Кузнецов Алексей Николаевич', email: 'ahk.hystrix@gmail.com', statusReg: true, statusVote: true},
        {name: 'Кузнецов Алексей Николаевич', email: 'ahk.hystrix@gmail.com', statusReg: false, statusVote: false}
    ]

    const observersObj = [
        {name: 'Петрунин Вадим Николаевич', email: 'v.petrunin@spbu.ru', phone: '+7 921 654 30 61'},
        {name: 'Тимошина Анастасия Владимировна', email: 'anastasia.timoshina98@yandex.ru' , phone: '+7 921 654 30 21'},
        {name: 'Ускова Анна Владимировна', email: 'anyauskowa@yandex.ru', phone: '+7 921 654 10 11'},
        {name: 'Кузнецов Алексей Николаевич', email: 'ahk.hystrix@gmail.com', phone: '+7 921 600 00 21'},
        {name: 'Кузнецов Алексей Николаевич', email: 'ahk.hystrix@gmail.com', phone: '+7 921 999 30 99'}
    ]

    const countingObj = [
        {name: 'Петрунин Вадим Николаевич', email: 'v.petrunin@spbu.ru' , status: true},
        {name: 'Тимошина Анастасия Владимировна', email: 'anastasia.timoshina98@yandex.ru' , status: false},
        {name: 'Ускова Анна Владимировна', email: 'anyauskowa@yandex.ru' , status: false},
        {name: 'Кузнецов Алексей Николаевич', email: 'ahk.hystrix@gmail.com' , status: true},
        {name: 'Кузнецов Алексей Николаевич', email: 'ahk.hystrix@gmail.com' , status: true}
    ]

    return (
        <div className="details-vote-voting-observers-counting__container">
            <h3 className="details-vote-voting-observers-counting__title-mobile">{titleNameMobile}</h3>
            <div className="details-vote-voting-observers-counting__title-block">
                <h3 className="details-vote-voting-observers-counting__title">{titleName}</h3>
                {hideBlock && (
                    <div className="details-vote-voting-observers-counting__export-excel">
                    <img className="details-vote-voting-observers-counting__export-excel-icon" src={iconExcel} alt={constants.GENERAL.ALT_ICON}/>
                    <p className="details-vote-voting-observers-counting__export-excel-label">ЭКСПОРТ В EXCEL</p>
                </div>
                )}
            </div>
            <div className="details-vote-voting-observers-counting__last-update">
                <p className="details-vote-voting-observers-counting__last-update-label">{constants.DETAILS_VOTE.STATISTIC_LATEST_UPDATE}</p>
                <img src={iconDate} alt={constants.GENERAL.ALT_ICON}/>
                <p className="details-vote-voting-observers-counting__last-update-icon-label">10.12.2020</p>
                <img src={iconTime} alt={constants.GENERAL.ALT_ICON}/>
                <p className="details-vote-voting-observers-counting__last-update-icon-label">17:20</p>
            </div>
            {showNoActiveVotingObservers && (
                <div className="details-vote-voting-observers-counting__no-active-voting-block">
                    <img className="details-vote-voting-observers-counting__no-active-voting-img" src={imageNoActiveVoting} alt={constants.GENERAL.ALT_ICON}/>
                    <p>{constants.DETAILS_VOTE.VOTING_EMPTY_INFO} <Link to={'/add-new-vote'}>{constants.DETAILS_VOTE.VOTING_EMPTY_INFO_LINK}</Link></p>
                </div>
                )
            }
            {hideBlock && (
            <>
            {/*<PaginationBlock/>*/}
            <div className="details-vote-voting-observers-counting__table">
                {testObj.map((el, i) => {
                return (
                <div key={i} className="details-vote-voting-observers-counting__table-row">
                    <p className="details-vote-voting-observers-counting__table-row-username">{el.name}</p>
                    <p className="details-vote-voting-observers-counting__table-row-email">{el.email}</p>
                    {changeStatusColumn === 'voting' ?
                        <div className="details-vote-voting-observers-counting__table-row-status">
                        <div className="details-vote-voting-observers-counting__table-row-status-icon-label">
                            <img className="details-vote-voting-observers-counting__table-row-status-icon" src={el.statusReg ? iconReg : iconNoReg} alt={constants.GENERAL.ALT_ICON}/>
                            <span className="details-vote-voting-observers-counting__table-row-status-label" style={el.statusReg ? {color: '#4ED4A9'} : {color: 'rgba(54, 59, 77, 0.6)'}}>
                                {el.statusReg ? `${constants.DETAILS_VOTE.VOTING_STATUS_REGISTRED}` : `${constants.DETAILS_VOTE.VOTING_STATUS_NO_REGISTRED}`}</span>
                            <div className="details-vote-voting-observers-counting__table-row-status-mobile" style={el.statusReg ? {background: 'rgba(78, 212, 169, 0.15)'} : {background: 'rgba(55, 60, 78, 0.1)'}}>
                                <li className="details-vote-voting-observers-counting__table-row-status-mobile-label" style={el.statusReg ? {color: '#4ED4A9'} : {color: 'rgba(54, 59, 77, 0.6)'}}>
                                    {el.statusReg ? `${constants.DETAILS_VOTE.VOTING_STATUS_REGISTRED}` : `${constants.DETAILS_VOTE.VOTING_STATUS_NO_REGISTRED}`}
                                </li>
                            </div>
                        </div>
                        <div className="details-vote-voting-observers-counting__table-row-status-icon-label">
                            <img className="details-vote-voting-observers-counting__table-row-status-icon" src={el.statusVote ? iconVoted : iconNoVoted} alt={constants.GENERAL.ALT_ICON}/>
                            <span className="details-vote-voting-observers-counting__table-row-status-label" style={el.statusVote ? {color: '#4569FF'} : {color: '#FF4970'}}>
                                {el.statusVote ? `${constants.DETAILS_VOTE.VOTING_STATUS_VOTED}` : `${constants.DETAILS_VOTE.VOTING_STATUS_NO_VOTED}`}</span>
                            <div className="details-vote-voting-observers-counting__table-row-status-mobile" style={el.statusVote ? {background: 'rgba(69, 105, 255, 0.15)'} : {background: 'rgba(255, 73, 112, 0.15)'}}>
                                <li className="details-vote-voting-observers-counting__table-row-status-mobile-label" style={el.statusVote ? {color: '#4569FF'} : {color: '#FF4970'}}>
                                    {el.statusVote ? `${constants.DETAILS_VOTE.VOTING_STATUS_VOTED}` : `${constants.DETAILS_VOTE.VOTING_STATUS_NO_VOTED}`}
                                </li>
                            </div>
                        </div>
                    </div> : null}
                    {changeStatusColumn === 'counting' ?
                    <div className="details-vote-voting-observers-counting__table-row-status">
                        <div className="details-vote-voting-observers-counting__table-row-status-counting-icon-label">
                            <img className="details-vote-voting-observers-counting__table-row-status-counting-icon" src={el.status ? iconReg : iconNoVoted} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="details-vote-voting-observers-counting__table-row-status-counting-label" style={el.status ? {color: '#4ED4A9'} : {color: '#FF4970'}}>
                                {el.status ? `${constants.DETAILS_VOTE.COUNTING_STATUS_SIGNED}` : `${constants.DETAILS_VOTE.COUNTING_STATUS_NO_SIGNED}`}</p>
                        </div>
                    </div> : null}
                    {changeStatusColumn === 'observers' ?
                    <div className="details-vote-voting-observers-counting__table-row-status">
                        <p className='details-vote-voting-observers-counting__table-row-status-observers-label'>{el.phone}</p>
                    </div> : null}
                </div>
                )})}
                <p className="details-vote-voting-observers-counting__show-more">{constants.DETAILS_VOTE.STATISTIC_SHOW_MORE_BTN}</p>
            </div>
            </>
            )}
            {/*<PaginationBlock/>*/}
        </div>
    )
}
export default DetailsVoteVotingObserversCounting;