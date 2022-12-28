import React from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import AddMaterials from "../AddMaterials/AddMaterials";

const AddNewVoteTypePositionSingle = (props) => {

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
        addQuestion
    } = props;

    return (
        <div className="add-new-vote-type-position-single__container active">
            <div className="add-new-vote-type-position-single">
                <div className="add-new-vote-type-position-single__title">
                    <h3 className="add-new-vote-type-position-single__title-number-question">{constants.ADD_NEW_VOTE.QUESTION} #{questionsList.length + 1}</h3>
                    <img onClick={onCloseModal} className="add-new-vote-type-position-single__title-icon-close" src={iconCloseModal} alt={constants.GENERAL.ALT_ICON} />
                </div>
                <h5 className="add-new-vote-type-position-single__title-current-type-question">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_POSITION_SINGLE}</h5>
                <div className="add-new-vote-type-position-single__name-question">
                    <label className="add-new-vote-type-position-single__name-question-label">
                        {constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION}
                        <span className="add-new-vote__red-star"> *</span>
                    </label>
                    <input className="add-new-vote-type-position-single__name-question-input"
                        type={'text'}
                        placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_SELECTION_POSITION}
                    />
                </div>
                <div className="add-new-vote-type-position-single__types-variants-answer">
                    <div className="add-new-vote-type-position-single__types-variants-answer-input-text">
                        <h3 className="add-new-vote-type-position-single__types-variants-answer-title">
                            {constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER}
                        </h3>
                        <div className="add-new-vote-type-position-single__type-input-block">
                            <input disabled={false}
                                placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER_PLACEHOLDER_USERNAME}
                                className="add-new-vote-type-position-single__type-input-text"
                            />
                        </div>
                    </div>
                    <div className="add-new-vote-type-position-single__add-materials-vote">
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
                    <div className="add-new-vote-type-position-single__add-button-block">
                        <button className="add-new-vote-type-position-single__add-btn">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_QUESTION_BTN}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewVoteTypePositionSingle;
