import React, { useEffect, useState } from 'react';
import './MyVotesBlock.css';
import './VotesPageActiveVotes.css';
import CurrentStatusVote from "../VotesStatusComponents/CurrentStatusVote/CurrentStatusVote";
import StartDateVote from "../VotesStatusComponents/StartDateVote/StartDateVote";
import MaterialsVoteQuestion from "../VotesStatusComponents/MaterialsVoteQuestion/MaterialsVoteQuestion";
import utcIcon from '../../img/VotesPageActiveVotes_time_icon.svg';
import { useLocation } from "react-router-dom";

const MyVotesBlockForm = ((props) => {

    const {
        votesData,
        handleCurrentEvents,
        toggleEventRegistration,
        showEventResult,
        formatDate,
        formatTime,
        utcOffset
    } = props;

    const { pathname } = useLocation();
    const [labelText, setLabelText] = useState('');
    const [isVoted, setVoted] = useState(false);
    const [isNotFullyVoted, setNotFullyVoted] = useState(false);
    const [hideStatus, setHideStatus] = useState(false);

    useEffect(() => {
        if (votesData.type === 'secret') {
            if (votesData.status === 'ended') {
                setHideStatus(true);
            } else if (votesData.status === 'quorum_unpresant') {
                setHideStatus(true);
            } else {
                if (votesData.questions !== undefined) {
                    if (votesData.ballots !== undefined) {
                        const filteredAnswer = votesData.questions.filter(a => votesData.ballots.find(p => p.bulletinId === a.bulletinId))
                        if (filteredAnswer.length === 0) {
                            setVoted(false);
                            setNotFullyVoted(false);
                        } else {
                            if (filteredAnswer.length === votesData.questions.length) {
                                setVoted(true);
                                setNotFullyVoted(false);
                            } else {
                                setNotFullyVoted(true);
                                setVoted(false);
                            }
                        }
                    }
                }
            }
        } else {
            if (votesData.questions !== undefined) {
                if (votesData.ballots !== undefined) {
                    const filteredAnswer = votesData.questions.filter(a => votesData.ballots.find(p => p.bulletinId === a.bulletinId))
                    if (filteredAnswer.length === 0) {
                        setVoted(false);
                        setNotFullyVoted(false);
                    } else {
                        if (filteredAnswer.length === votesData.questions.length) {
                            setVoted(true);
                            setNotFullyVoted(false);
                        } else {
                            setNotFullyVoted(true);
                            setVoted(false);
                        }
                    }
                }
            }
        }
    }, [votesData.ballots, votesData.questions, votesData.isVoted, votesData.status, votesData.type]);

    useEffect(() => {
        if (votesData.status === 'waiting') {
            if (votesData.onButton) {
                setLabelText('Ожидание голосования');
            } else {
                setLabelText('Ожидание регистрации');
            }
        } else if (votesData.status === 'registration') {
            if (votesData.isVoting) {
                if (votesData.onButton) {
                    setLabelText('Идет голосование');
                } else {
                    setLabelText('Регистрация и голосование');
                }
            } else {
                setLabelText('Идет регистрация');
            }
        } else if (votesData.status === 'event waiting') {
            setLabelText('Ожидание голосования');
        } else if (votesData.status === 'voting') {
            setLabelText('Идет голосование');
        } else if (votesData.status === 'ended') {
            setLabelText('Голосование завершено');
        } else if (votesData.status === 'quorum_unpresant') {
            setLabelText('Кворум не достигнут');
        }
    }, [votesData])

    return (
        <div className={`my-votes-block__vote-form ${pathname === '/votes-page' && 'my-votes-block__vote-form_votes-page'}`}>
            <div className='my-votes-block__container'>
                <div className='my-votes-block__container-title-block'>
                    <h3 className='my-votes-block__container-title-h3' onClick={() => { handleCurrentEvents(votesData, true) }}>{votesData.title}</h3>
                    <h5 className='my-votes-block__container-title-h5'>{votesData.owner.title}</h5>
                    {pathname === '/votes-page' && (
                        <div className='my-votes-block__utc-container'>
                            <img alt='Иконка часового пояса' src={utcIcon} className='my-votes-block__utc-icon' />
                            <p className='my-votes-block__utc-value'>{utcOffset}</p>
                        </div>
                    )}
                </div>
                <div className={pathname === '/' ? 'vote-form__status-block' : 'status-and-start-reg-start-vote'}>
                    <CurrentStatusVote
                        regStatus={labelText}
                        voteStatus={votesData.type === 'secret' ? 'Тайное' : 'Открытое'}
                    />
                    <div className='status-and-start-reg-start-vote__reg-vote-date'>
                        <>
                            {votesData.onButton ? (
                                <>
                                    <div className='reg-vote-date__border-right-mobile'>
                                        <StartDateVote
                                            dateTimeDate={formatDate(votesData.event_start_time)}
                                            dateTimeWatch={formatTime(votesData.event_start_time)}
                                            title={'Начало голосования:'}
                                        />
                                    </div>
                                    {pathname === '/votes-page' && (
                                        <StartDateVote
                                            dateTimeDate={formatDate(votesData.event_end_time)}
                                            dateTimeWatch={formatTime(votesData.event_end_time)}
                                            title={'Конец голосования:'}
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className='reg-vote-date__border-right-mobile'>
                                        {pathname === '/votes-page' && (
                                            <StartDateVote
                                                dateTimeDate={formatDate(votesData.registration_start_time)}
                                                dateTimeWatch={formatTime(votesData.registration_start_time)}
                                                title={'Начало регистрации:'}
                                            />
                                        )}
                                    </div>
                                    <StartDateVote
                                        dateTimeDate={formatDate(votesData.event_start_time)}
                                        dateTimeWatch={formatTime(votesData.event_start_time)}
                                        title={'Начало голосования:'}
                                    />
                                </>
                            )}
                        </>
                    </div>
                    <div className='status-and-start-reg-start-vote__add-border-left'>
                        <MaterialsVoteQuestion
                            currentMaterialsVote={votesData} materialsVoteName={'Материалы голосования'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})
export default MyVotesBlockForm;