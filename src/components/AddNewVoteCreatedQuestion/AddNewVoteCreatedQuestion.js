import React, { useEffect, useState } from "react";
import iconEditBnt from "../../img/OrganizationsLisеIconEditButton.svg";
import iconDeleteBtn from "../../img/AddNewGroupIconBasket.svg";

const AddNewVoteCreatedQuestion = (props) => {

    const {
        constants,
        question,
        deleteQuestion,
        editQuestion
    } = props;

    console.log(question);

    const [type, setType] = useState('');

    useEffect(() => {
        // проверить на правильность названия template-ов
        if (question.template === 'ynq') {
            setType(constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_YNQ);
        } else if (question.template === 'none') {
            setType(constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_NONE);
        } else if (question.template === 'position_single') {
            setType(constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_POSITION_SINGLE);
        } else if (question.template === 'grid') {
            setType(constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_GRID);
        } else if (question.template === 'radio_grid') {
            setType(constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_RADIO_GRID);
        } else if (question.template === 'position_multiple') {
            setType(constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_POSITION_MULTIPLE);
        } else if (question.template === 'same_positions') {
            setType(constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_SAME_POSITIONS);
        }
    }, [question.template])

    return (
        <div className="add-new-vote-created-question">
            <div className="add-new-vote-created-question__question-block">
                <div className="add-new-vote-created-question__name-type-questions">
                    <h3 className="add-new-vote-created-question__name-question">{question.title}</h3>
                    <p className="add-new-vote-created-question__type-question">{type}</p>
                </div>
                <div className="add-new-vote-created-question__buttons-block">
                    <div className="add-new-vote-created-question__edit-button" onClick={() => editQuestion(question)}>
                        <img className="add-new-vote-created-question__icon-edit" src={iconEditBnt} alt={constants.GENERAL.ALT_ICON} />
                        <p>{constants.ADD_NEW_VOTE.CREATED_QUESTION_EDIT_BTN}</p>
                    </div>
                    <div className="add-new-vote-created-question__delete-button" onClick={() => deleteQuestion(question)}>
                        <img className="add-new-vote-created-question__icon-delete" src={iconDeleteBtn} alt={constants.GENERAL.ALT_ICON} />
                        <p>{constants.ADD_NEW_VOTE.CREATED_QUESTION_DELETE_BTN}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewVoteCreatedQuestion;
