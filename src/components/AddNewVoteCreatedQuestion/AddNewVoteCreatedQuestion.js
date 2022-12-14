import React, {useState} from "react";
import MaterialsVoteQuestion from "../VotesStatusComponents/MaterialsVoteQuestion/MaterialsVoteQuestion";
import iconEditBnt from "../../img/OrganizationsLisеIconEditButton.svg";
import iconDeleteBtn from "../../img/AddNewGroupIconBasket.svg";

const AddNewVoteCreatedQuestion = (props) => {

    const {
        constants
    } = props;

    const [activeTypeRow, setActiveTypeRow] = useState(false);
    const [activeTypeGrid, setActiveTypeGrid] = useState(true);

    return (
        <div className="add-new-vote-created-question">
            <div className="add-new-vote-created-question__question-block">
                <div className="add-new-vote-created-question__name-question-materials-rules">
                    <h3 className="add-new-vote-created-question__name-question">1. Как должен происходить процесс выбора делегатов конференции?</h3>
                    <p className="add-new-vote-created-question__rules">Необходимо выбрать ровно 1</p>
                    <div className="add-new-vote-created-question__materials">
                        <MaterialsVoteQuestion materialsVoteName={'Материалы вопроса'}/>
                    </div>
                </div>
                <div className="add-new-vote-created-question__checkbox-answer-block">
                    {activeTypeRow && (
                        <>
                            <div className="add-new-vote-created-question__checkbox">
                                <label className='add-new-vote-created-question__checkbox_container'>
                                    <input type="checkbox"/>
                                    <span className='add-new-vote-created-question__checkmark' />
                                </label>
                                <p className="add-new-vote-created-question__label-checkbox">Только через КриптоВече</p>
                            </div>
                        </>
                    )}
                    {activeTypeGrid && (
                        <>
                            <div className="add-new-vote-created-question__grid">
                                <div className="add-new-vote-created-question__grid-answer-header">
                                    <p className="add-new-vote-created-question__grid-answer-header-empty-block"></p>
                                    <p className="add-new-vote-created-question__grid-answer-header-item">Против</p>
                                    <p className="add-new-vote-created-question__grid-answer-header-item">Воздержаться</p>
                                    <p className="add-new-vote-created-question__grid-answer-header-item">За</p>
                                </div>
                                <div className="add-new-vote-created-question__grid-answer-row">
                                    <div className="add-new-vote-created-question__grid-answer-row-item">
                                        <p className="add-new-vote-created-question__grid-answer-row-name">Вариант один какой-то</p>
                                        <div className="add-new-vote-created-question__grid-answer-row-checkbox">
                                            <label className='add-new-vote-created-question__checkbox_container'>
                                                <input type="checkbox"/>
                                                <span className='add-new-vote-created-question__checkmark' />
                                            </label>
                                        </div>
                                        <div className="add-new-vote-created-question__grid-answer-row-checkbox">
                                            <label className='add-new-vote-created-question__checkbox_container'>
                                                <input type="checkbox"/>
                                                <span className='add-new-vote-created-question__checkmark' />
                                            </label>
                                        </div>
                                        <div className="add-new-vote-created-question__grid-answer-row-checkbox">
                                            <label className='add-new-vote-created-question__checkbox_container'>
                                                <input type="checkbox"/>
                                                <span className='add-new-vote-created-question__checkmark' />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="add-new-vote-created-question__grid-answer-row-item">
                                    <p className="add-new-vote-created-question__grid-answer-row-name">Довольно длинный четвертый</p>
                                    <div className="add-new-vote-created-question__grid-answer-row-checkbox">
                                        <label className='add-new-vote-created-question__checkbox_container'>
                                            <input type="checkbox"/>
                                            <span className='add-new-vote-created-question__checkmark' />
                                        </label>
                                    </div>
                                    <div className="add-new-vote-created-question__grid-answer-row-checkbox">
                                        <label className='add-new-vote-created-question__checkbox_container'>
                                            <input type="checkbox"/>
                                            <span className='add-new-vote-created-question__checkmark' />
                                        </label>
                                    </div>
                                    <div className="add-new-vote-created-question__grid-answer-row-checkbox">
                                        <label className='add-new-vote-created-question__checkbox_container'>
                                            <input type="checkbox"/>
                                            <span className='add-new-vote-created-question__checkmark' />
                                        </label>
                                    </div>
                                </div>
                                <div className="add-new-vote-created-question__grid-answer-row-item">
                                    <p className="add-new-vote-created-question__grid-answer-row-name">Некий третий варик</p>
                                    <div className="add-new-vote-created-question__grid-answer-row-checkbox">
                                        <label className='add-new-vote-created-question__checkbox_container'>
                                            <input type="checkbox"/>
                                            <span className='add-new-vote-created-question__checkmark' />
                                        </label>
                                    </div>
                                    <div className="add-new-vote-created-question__grid-answer-row-checkbox">
                                        <label className='add-new-vote-created-question__checkbox_container'>
                                            <input type="checkbox"/>
                                            <span className='add-new-vote-created-question__checkmark' />
                                        </label>
                                    </div>
                                    <div className="add-new-vote-created-question__grid-answer-row-checkbox">
                                        <label className='add-new-vote-created-question__checkbox_container'>
                                            <input type="checkbox"/>
                                            <span className='add-new-vote-created-question__checkmark' />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="add-new-vote-created-question__buttons-block">
                    <div className="add-new-vote-created-question__edit-button">
                        <img className="add-new-vote-created-question__icon-edit" src={iconEditBnt} alt={constants.GENERAL.ALT_ICON}/>
                        <p>{constants.ADD_NEW_VOTE.CREATED_QUESTION_EDIT_BTN}</p>
                    </div>
                    <div className="add-new-vote-created-question__delete-button">
                        <img className="add-new-vote-created-question__icon-delete" src={iconDeleteBtn} alt={constants.GENERAL.ALT_ICON}/>
                        <p>{constants.ADD_NEW_VOTE.CREATED_QUESTION_DELETE_BTN}</p>
                    </div>
                </div>
            </div>
        </div>
    )}
export default AddNewVoteCreatedQuestion;