import React, { useEffect, useState } from 'react';
import './MyVotesBlock.css';
import './VotesPageActiveVotes.css';
import CurrentStatusVote from "../VotesStatusComponents/CurrentStatusVote/CurrentStatusVote";
import StartDateVote from "../VotesStatusComponents/StartDateVote/StartDateVote";
import MaterialsVoteQuestion from "../VotesStatusComponents/MaterialsVoteQuestion/MaterialsVoteQuestion";
import utcIcon from '../../img/VotesPageActiveVotes_time_icon.svg';
import {useLocation, useNavigate} from "react-router-dom";
import deleteIcon from '../../img/AddNewGroupIconBasket.svg';
import editIcon from '../../img/OrganizationsLisеIconEditButton.svg';
import showVote from '../../img/ListUsersIconEye.svg';

const MyVotesBlockForm = (props) => {

    const {
        votesData,
        constants,
        authAs,
        handleCurrentEvents,
        toggleEventRegistration,
        showEventResult,
        formatDate,
        formatTime,
        utcOffset
    } = props;

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [labelText, setLabelText] = useState('');
    const [isVoted, setVoted] = useState(false);
    const [isNotFullyVoted, setNotFullyVoted] = useState(false);
    const [hideStatus, setHideStatus] = useState(false);

    // useEffect(() => {
    //     if (votesData.type === 'secret') {
    //         if (votesData.status === 'ended') {
    //             setHideStatus(true);
    //         } else if (votesData.status === 'quorum_unpresant') {
    //             setHideStatus(true);
    //         } else {
    //             if (votesData.questions !== undefined) {
    //                 if (votesData.ballots !== undefined) {
    //                     const filteredAnswer = votesData.questions.filter(a => votesData.ballots.find(p => p.bulletinId === a.bulletinId))
    //                     if (filteredAnswer.length === 0) {
    //                         setVoted(false);
    //                         setNotFullyVoted(false);
    //                     } else {
    //                         if (filteredAnswer.length === votesData.questions.length) {
    //                             setVoted(true);
    //                             setNotFullyVoted(false);
    //                         } else {
    //                             setNotFullyVoted(true);
    //                             setVoted(false);
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     } else {
    //         if (votesData.questions !== undefined) {
    //             if (votesData.ballots !== undefined) {
    //                 const filteredAnswer = votesData.questions.filter(a => votesData.ballots.find(p => p.bulletinId === a.bulletinId))
    //                 if (filteredAnswer.length === 0) {
    //                     setVoted(false);
    //                     setNotFullyVoted(false);
    //                 } else {
    //                     if (filteredAnswer.length === votesData.questions.length) {
    //                         setVoted(true);
    //                         setNotFullyVoted(false);
    //                     } else {
    //                         setNotFullyVoted(true);
    //                         setVoted(false);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }, [votesData.ballots, votesData.questions, votesData.isVoted, votesData.status, votesData.type]);

    // useEffect(() => {
    //     if (votesData.status === 'waiting') {
    //         if (votesData.onButton) {
    //             setLabelText('Ожидание голосования');
    //         } else {
    //             setLabelText('Ожидание регистрации');
    //         }
    //     } else if (votesData.status === 'registration') {
    //         if (votesData.isVoting) {
    //             if (votesData.onButton) {
    //                 setLabelText('Идет голосование');
    //             } else {
    //                 setLabelText('Регистрация и голосование');
    //             }
    //         } else {
    //             setLabelText('Идет регистрация');
    //         }
    //     } else if (votesData.status === 'event waiting') {
    //         setLabelText('Ожидание голосования');
    //     } else if (votesData.status === 'voting') {
    //         setLabelText('Идет голосование');
    //     } else if (votesData.status === 'ended') {
    //         setLabelText('Голосование завершено');
    //     } else if (votesData.status === 'quorum_unpresant') {
    //         setLabelText('Кворум не достигнут');
    //     }
    // }, [votesData])



    return (
        <div className={`my-votes-block__vote-form ${pathname === '/votes-page' && 'my-votes-block__vote-form_votes-page'}`}>
            <div className='my-votes-block__container'>
                <div className='my-votes-block__container-title-block'>
                    <h3 onClick={() => navigate('/details-vote')} className='my-votes-block__container-title-h3'>
                        Выбор делегатов конференции в Ученый Совет СПбГУ и еще парочка слов чтобы совсем уже было длинно</h3>
                    <h5 className='my-votes-block__container-title-h5'>Ученый совет</h5>
                </div>
                <div className="my-votes-block__content-vote">
                <div className={'status-and-start-reg-start-vote'}>
                    <CurrentStatusVote
                        regStatus={'Идет голосование'}
                        voteStatus={'Открытое'}
                        constants={constants}
                    />
                    <div className='status-and-start-reg-start-vote__reg-vote-date'>
                        <StartDateVote
                            dateTimeDate={'05.01.2021'}
                            dateTimeWatch={'18:00'}
                            title={'Начало регистрации:'}
                        />
                        <div className='reg-vote-date__border-right-mobile'>
                                <StartDateVote
                                    dateTimeDate={'05.01.2021'}
                                    dateTimeWatch={'18:00'}
                                    title={'Начало голосования:'}
                                />
                        </div>
                    </div>
                    <div className='status-and-start-reg-start-vote__add-border-left'>
                        <div className='my-votes-block__utc-container'>
                            <img alt='Иконка часового пояса' src={utcIcon} className='my-votes-block__utc-icon' />
                            <p className='my-votes-block__utc-value'>(UTC+3) Россия - Москва</p>
                        </div>
                        <MaterialsVoteQuestion
                            currentMaterialsVote={votesData} materialsVoteName={constants.VOTES_PAGE.VOTES_PAGE_MATERIALS_VOTE}
                        />
                    </div>
                </div>
                    <div className="my-votes-block__buttons-block">
                        {authAs === 'superAdmin' ? <div className="my-votes-block__btn-block-show">
                            <img className="my-votes-block__show-vote-icon" src={showVote} alt={showVote}/>
                            <p className='my-votes-block__show-label'>{constants.VOTES_PAGE.VOTES_PAGE_SHOW_VOTE_BTN}</p>
                        </div> : null}
                        {authAs === 'admin' ? <div className="my-votes-block__btn-block-edit">
                            <img className="my-votes-block__edit-icon" src={editIcon} alt={editIcon}/>
                            <p className='my-votes-block__edit-label'>{constants.VOTES_PAGE.VOTES_PAGE_EDIT_VOTE_BTN}</p>
                        </div> : null}
                        {authAs === 'admin' ? <div className="my-votes-block__btn-block-delete">
                            <img className="my-votes-block__delete-icon" src={deleteIcon} alt={deleteIcon}/>
                            <p className='my-votes-block__delete-label'>{constants.VOTES_PAGE.VOTES_PAGE_DELETE_VOTE_BNT}</p>
                        </div> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyVotesBlockForm;