import React, {useState} from "react";
import iconEditBnt from "../../img/OrganizationsLisеIconEditButton.svg";
import iconDeleteBtn from "../../img/AddNewGroupIconBasket.svg";

const AddNewVoteCreatedQuestion = (props) => {

    const {
        constants
    } = props;

    return (
        <div className="add-new-vote-created-question">
            <div className="add-new-vote-created-question__question-block">
                <div className="add-new-vote-created-question__name-type-questions">
                    <h3 className="add-new-vote-created-question__name-question">1. Как должен происходить процесс выбора делегатов конференции?</h3>
                    <p className="add-new-vote-created-question__type-question">Тип вопроса</p>
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