import React, {useState} from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import AddMaterials from "../AddMaterials/AddMaterials";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";

const AddNewVoteTypeYnq = (props) => {

    const {
        activeModalTypeQuestion,
        setActiveModalTypeQuestion,
        constants,
        selectedTypeQuestionBtn,
        setSelectedTypeQuestionBtn,
        typeQuestionButtons,
        eventMaterials,
        addEmptyMaterial,
        changeMaterialType,
        linkInputChange,
        titleInputChange,
        changeDocLink,
        deleteMaterial,
        requestHelper
    } = props;

    const [activeSelectTypeQuestion, setActiveSelectTypeQuestion] = useState(false);

    const onGetTypeQuestion = (typeQuestion, nameQuestion) => {
        setSelectedTypeQuestionBtn({typeQuestion, nameQuestion})
    }

    const onCloseModal = () => {
        setActiveModalTypeQuestion(false)
    }

    return (
        <div className={activeModalTypeQuestion ? "add-new-vote-type-ynq__container active" : "add-new-vote-type-ynq__container"}>
            <div className="add-new-vote-type-ynq">
                <div className="add-new-vote-type-ynq__title">
                    <h3 className="add-new-vote-type-ynq__title-number-question">
                        Вопрос #1
                    </h3>
                    <img onClick={onCloseModal} className="add-new-vote-type-ynq__title-icon-close" src={iconCloseModal} alt={constants.GENERAL.ALT_ICON}/>
                </div>
                <h5 className="add-new-vote-type-ynq__title-current-type-question">{selectedTypeQuestionBtn.nameQuestion}</h5>
                <div className="add-new-vote-type-ynq__name-question">
                    <label className="add-new-vote-type-ynq__name-question-label">
                        {constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION}
                        <span className="add-new-vote__red-star">*</span>
                    </label>
                    <input className="add-new-vote-type-ynq__name-question-input"
                           type={'text'}
                           placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_ENTER_YOUR_QUESTION}
                    />
                </div>
                <div className="add-new-vote-type-ynq__types-variants-answer">
                        <div className="add-new-vote-type-ynq__types-variants-answer-input-text">
                            <h3 className="add-new-vote-type-ynq__types-variants-answer-title">
                                {constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER}
                            </h3>
                            <div className="add-new-vote-type-ynq__type-input-block">
                                <input disabled={true}
                                       placeholder={'За'}
                                       className="add-new-vote-type-ynq__type-input-text"
                                />
                            </div>
                            <div className="add-new-vote-type-ynq__type-input-block">
                                <input disabled={true}
                                       placeholder={'Против'}
                                       className="add-new-vote-type-ynq__type-input-text"
                                />
                            </div>
                            <div className="add-new-vote-type-ynq__type-input-block">
                                <input disabled={true}
                                       placeholder={'Воздержаться'}
                                       className="add-new-vote-type-ynq__type-input-text"
                                />
                            </div>
                        </div>
                    <div className="add-new-vote-type-ynq__add-materials-vote">
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
                    <div className="add-new-vote-type-ynq__add-button-block">
                        <button className="add-new-vote-type-ynq__add-btn">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_QUESTION_BTN}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddNewVoteTypeYnq;