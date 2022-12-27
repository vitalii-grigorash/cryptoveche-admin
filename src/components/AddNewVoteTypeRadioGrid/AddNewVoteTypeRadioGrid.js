import React from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import iconPlus from "../../img/AddNewVoteQuestuionTypeIconPlus.svg";
import iconBasket from "../../img/AddNewVoteQuestuionTypeIconBasket.svg";
import AddMaterials from "../AddMaterials/AddMaterials";

const AddNewVoteTypeRadioGrid = (props) => {

    const {
        activeModalTypeQuestion,
        setActiveModalTypeQuestion,
        constants,
        selectedTypeQuestionBtn,
        eventMaterials,
        addEmptyMaterial,
        changeMaterialType,
        linkInputChange,
        titleInputChange,
        changeDocLink,
        deleteMaterial,
        requestHelper,
        questionsList
    } = props;

    const onCloseModal = () => {
        setActiveModalTypeQuestion(false);
    }
    return (
        <div className={activeModalTypeQuestion ? "add-new-vote-type-radio-grid__container active" : "add-new-vote-type-radio-grid__container"}>
            <div className="add-new-vote-type-radio-grid">
                <div className="add-new-vote-type-radio-grid__title">
                    <h3 className="add-new-vote-type-radio-grid__title-number-question">Вопрос #{questionsList.length + 1}</h3>
                    <img onClick={onCloseModal} className="add-new-vote-type-radio-grid__title-icon-close" src={iconCloseModal} alt={constants.GENERAL.ALT_ICON} />
                </div>
                <h5 className="add-new-vote-type-radio-grid__title-current-type-question">{selectedTypeQuestionBtn.nameQuestion}</h5>
                <div className="add-new-vote-type-radio-grid__name-question">
                    <label className="add-new-vote-type-radio-grid__name-question-label">
                        {constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION}
                        <span className="add-new-vote__red-star">*</span>
                    </label>
                    <input className="add-new-vote-type-radio-grid__name-question-input"
                        type={'text'}
                        placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_ENTER_YOUR_QUESTION}
                    />
                </div>
                <div className="add-new-vote-type-radio-grid__types-variants-answer">
                    <div className="add-new-vote-type-radio-grid__types-variants-answer-grid-block">
                        <div className="add-new-vote-type-radio-grid__types-variants-answer-grid">
                            <div className="add-new-vote-type-radio-grid__grid-row">
                                <h4 className="add-new-vote-type-radio-grid__grid-title">{constants.ADD_NEW_VOTE.QUESTION_TYPE_GRID_ROWS}</h4>
                                <div className="add-new-vote-type-radio-grid__grid-row-input-block">
                                    <input className="add-new-vote-type-radio-grid__grid-input-text" type={"text"} placeholder={'Введите значение'} />
                                    <div className="add-new-vote-type-radio-grid__type-input-icons">
                                        <img className="add-new-vote-type-radio-grid__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON} />
                                        <img className="add-new-vote-type-radio-grid__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON} />
                                    </div>
                                </div>
                            </div>
                            <div className="add-new-vote-type-radio-grid__grid-column">
                                <h4 className="add-new-vote-type-radio-grid__grid-title">{constants.ADD_NEW_VOTE.QUESTION_TYPE_GRID_COLUMNS}</h4>
                                <div className="add-new-vote-type-radio-grid__grid-column-input-block">
                                    <input className="add-new-vote-type-radio-grid__grid-input-text"
                                        type={"text"}
                                        placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_GRID_ENTER_VALUES} />
                                    <div className="add-new-vote-type-radio-grid__type-input-icons">
                                        <img className="add-new-vote-type-radio-grid__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON} />
                                        <img className="add-new-vote-type-radio-grid__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="add-new-vote-type-radio-grid__checkbox">
                            <label className='add-new-vote-type-radio-grid__checkbox_container'>
                                <input type="checkbox" />
                                <span className='add-new-vote-type-radio-grid__checkmark' />
                            </label>
                            <p className="add-new-vote-type-radio-grid__label-checkbox">{constants.ADD_NEW_VOTE.QUESTION_TYPE_GRID_NOTE}</p>
                        </div>
                    </div>
                    <div className="add-new-vote-type-radio-grid__add-materials-vote">
                        <AddMaterials
                            constants={constants}
                            eventMaterials={eventMaterials}
                            isEvent={false}
                            addEmptyMaterial={addEmptyMaterial}
                            changeMaterialType={changeMaterialType}
                            linkInputChange={linkInputChange}
                            titleInputChange={titleInputChange}
                            changeDocLink={changeDocLink}
                            deleteMaterial={deleteMaterial}
                            requestHelper={requestHelper}
                        />
                    </div>
                    <div className="add-new-vote-type-radio-grid__add-button-block">
                        <button className="add-new-vote-type-radio-grid__add-btn">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_QUESTION_BTN}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewVoteTypeRadioGrid;
