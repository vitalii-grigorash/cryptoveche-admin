import React from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import iconPlus from "../../img/AddNewVoteQuestuionTypeIconPlus.svg";
import iconBasket from "../../img/AddNewVoteQuestuionTypeIconBasket.svg";
import AddMaterials from "../AddMaterials/AddMaterials";

const AddNewVoteTypeGrid = (props) => {

    const {
        onCloseModal,
        constants,
        eventMaterials,
        addEmptyMaterial,
        changeMaterialType,
        linkInputChange,
        titleInputChange,
        changeDocLink,
        deleteMaterial,
        requestHelper,
        questionsList,
        addQuestion,
        questionForEdit,
        changeEditQuestion
    } = props;

    return (
        <div className="add-new-vote-type-grid__container active">
            <div className="add-new-vote-type-grid">
                <div className="add-new-vote-type-grid__title">
                    <h3 className="add-new-vote-type-grid__title-number-question">{constants.ADD_NEW_VOTE.QUESTION} #{questionsList.length + 1}</h3>
                    <img onClick={onCloseModal} className="add-new-vote-type-grid__title-icon-close" src={iconCloseModal} alt={constants.GENERAL.ALT_ICON} />
                </div>
                <h5 className="add-new-vote-type-grid__title-current-type-question">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_GRID}</h5>
                <div className="add-new-vote-type-grid__name-question">
                    <label className="add-new-vote-type-grid__name-question-label">
                        {constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION}
                        <span className="add-new-vote__red-star"> *</span>
                    </label>
                    <input className="add-new-vote-type-grid__name-question-input"
                        type={'text'}
                        placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_ENTER_YOUR_QUESTION}
                    />
                </div>
                <div className="add-new-vote-type-grid__types-variants-answer">
                    <div className="add-new-vote-type-grid__types-variants-answer-grid-block">
                        <div className="add-new-vote-type-grid__types-variants-answer-grid">
                            <div className="add-new-vote-type-grid__grid-row">
                                <h4 className="add-new-vote-type-grid__grid-title">{constants.ADD_NEW_VOTE.QUESTION_TYPE_GRID_ROWS}</h4>
                                <div className="add-new-vote-type-grid__grid-row-input-block">
                                    <input className="add-new-vote-type-grid__grid-input-text" type={"text"} placeholder={'Введите значение'} />
                                    <div className="add-new-vote-type-grid__type-input-icons">
                                        <img className="add-new-vote-type-grid__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON} />
                                        <img className="add-new-vote-type-grid__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON} />
                                    </div>
                                </div>
                            </div>
                            <div className="add-new-vote-type-grid__grid-column">
                                <h4 className="add-new-vote-type-grid__grid-title">{constants.ADD_NEW_VOTE.QUESTION_TYPE_GRID_COLUMNS}</h4>
                                <div className="add-new-vote-type-grid__grid-column-input-block">
                                    <input className="add-new-vote-type-grid__grid-input-text"
                                        type={"text"}
                                        placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_GRID_ENTER_VALUES} />
                                    <div className="add-new-vote-type-grid__type-input-icons">
                                        <img className="add-new-vote-type-grid__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON} />
                                        <img className="add-new-vote-type-grid__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="add-new-vote-type-grid__checkbox">
                            <label className='add-new-vote-type-grid__checkbox_container'>
                                <input type="checkbox" />
                                <span className='add-new-vote-type-grid__checkmark' />
                            </label>
                            <p className="add-new-vote-type-grid__label-checkbox">{constants.ADD_NEW_VOTE.QUESTION_TYPE_GRID_NOTE}</p>
                        </div>
                    </div>
                    <div className="add-new-vote-type-grid__add-materials-vote">
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
                    <div className="add-new-vote-type-grid__add-button-block">
                        <button className="add-new-vote-type-grid__add-btn">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_QUESTION_BTN}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewVoteTypeGrid;
