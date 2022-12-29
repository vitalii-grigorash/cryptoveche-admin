import React from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import iconPlus from "../../img/AddNewVoteQuestuionTypeIconPlus.svg";
import iconBasket from "../../img/AddNewVoteQuestuionTypeIconBasket.svg";
import iconExcel from "../../img/AddNewVoteIconExcel.svg";
import AddMaterials from "../AddMaterials/AddMaterials";

const AddNewVoteTypeSamePositions = (props) => {

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
        <div className="add-new-vote-type-same-positions__container active">
            <div className="add-new-vote-type-same-positions">
                <div className="add-new-vote-type-same-positions__title">
                    <h3 className="add-new-vote-type-same-positions__title-number-question">{constants.ADD_NEW_VOTE.QUESTION} #{questionsList.length + 1}</h3>
                    <img onClick={onCloseModal} className="add-new-vote-type-same-positions__title-icon-close" src={iconCloseModal} alt={constants.GENERAL.ALT_ICON} />
                </div>
                <h5 className="add-new-vote-type-same-positions__title-current-type-question">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_SAME_POSITIONS}</h5>
                <div className="add-new-vote-type-same-positions__name-question">
                    <label className="add-new-vote-type-same-positions__name-question-label">
                        {constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION}
                        <span className="add-new-vote__red-star"> *</span>
                    </label>
                    <input className="add-new-vote-type-same-positions__name-question-input"
                        type={'text'}
                        placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_SELECTION_POSITION}
                    />
                </div>
                <div className="add-new-vote-type-same-positions__number-positions-block">
                    <input className="add-new-vote-type-same-positions__number-positions-name-positions"
                        type={"text"}
                        disabled={true}
                        placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_NUMBER_OF_POSITIONS}
                    />
                    <input className="add-new-vote-type-same-positions__numbers-position" type={"number"} placeholder={'1'} min={1} max={9999} step={1} />
                </div>
                <div className="add-new-vote-type-same-positions__types-variants-answer">
                    <div className="add-new-vote-type-same-positions__types-variants-answer-input-text">
                        <h3 className="add-new-vote-type-same-positions__types-variants-answer-title">
                            {constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER}
                        </h3>
                        <div className="add-new-vote-type-same-positions__type-input-block">
                            <input disabled={false}
                                placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER_PLACEHOLDER_USERNAME}
                                className="add-new-vote-type-same-positions__type-input-text"
                            />
                            <div className="add-new-vote-type-same-positions__type-input-icons">
                                <img className="add-new-vote-type-same-positions__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON} />
                                <img className="add-new-vote-type-same-positions__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON} />
                            </div>
                        </div>
                    </div>
                    <div className="add-new-vote-type-same-positions__import-excel-block">
                        <img className="add-new-vote-type-same-positions__icon-excel" src={iconExcel} alt={constants.GENERAL.ALT_ICON} />
                        <p className="add-new-vote-type-same-positions__import-excel-btn">{constants.ADD_NEW_VOTE.EXPAND_LIST_IMPORT_EXCEL}</p>
                    </div>
                    <div className="add-new-vote-type-same-positions__add-materials-vote">
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
                    <div className="add-new-vote-type-same-positions__add-button-block">
                        <button className="add-new-vote-type-same-positions__add-btn">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_QUESTION_BTN}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewVoteTypeSamePositions;
