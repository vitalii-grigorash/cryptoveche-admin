import React from "react";
import MaterialsVoteQuestion from "../VotesStatusComponents/MaterialsVoteQuestion/MaterialsVoteQuestion";
import iconEditBnt from "../../img/OrganizationsLisеIconEditButton.svg";
import iconDeleteBtn from "../../img/AddNewGroupIconBasket.svg";

const AddNewVoteCreatedQuestionGrid = (props) => {

    const {
        constants
    } = props;

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
                    <div className="add-new-vote-created-question__checkbox">
                        <label className='add-new-vote-created-question__checkbox_container'>
                            <input type="checkbox"/>
                            <span className='add-new-vote-created-question__checkmark' />
                        </label>
                        <p className="add-new-vote-created-question__label-checkbox">Только через КриптоВече</p>
                    </div>
                </div>
                <div className="add-new-vote-created-question__buttons-block">
                    <div className="add-new-vote-created-question__edit-button">
                        <img className="add-new-vote-created-question__icon-edit" src={iconEditBnt} alt={constants.GENERAL.ALT_ICON}/>
                        <p>РЕДАКТИРОВАТЬ</p>
                    </div>
                    <div className="add-new-vote-created-question__delete-button">
                        <img className="add-new-vote-created-question__icon-delete" src={iconDeleteBtn} alt={constants.GENERAL.ALT_ICON}/>
                        <p>УДАЛИТЬ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddNewVoteCreatedQuestionGrid;