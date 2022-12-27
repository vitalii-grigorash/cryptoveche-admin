import React, {useState} from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import iconPlus from "../../img/AddNewVoteQuestuionTypeIconPlus.svg";
import iconBasket from "../../img/AddNewVoteQuestuionTypeIconBasket.svg";
import iconExcel from "../../img/AddNewVoteIconExcel.svg";
import AddMaterials from "../AddMaterials/AddMaterials";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";

const AddNewVoteTypePositionMultiple = (props) => {

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
        <div className={activeModalTypeQuestion ? "add-new-vote-type-position-multiple__container active" : "add-new-vote-type-position-multiple__container"}>
            <div className="add-new-vote-type-position-multiple">
                <div className="add-new-vote-type-position-multiple__title">
                    <h3 className="add-new-vote-type-position-multiple__title-number-question">
                        Вопрос #1
                    </h3>
                    <img onClick={onCloseModal} className="add-new-vote-type-position-multiple__title-icon-close" src={iconCloseModal} alt={constants.GENERAL.ALT_ICON}/>
                </div>
                <h5 className="add-new-vote-type-position-multiple__title-current-type-question">{selectedTypeQuestionBtn.nameQuestion}</h5>
                <div className="add-new-vote-type-position-multiple__name-question">
                    <label className="add-new-vote-type-position-multiple__name-question-label">
                        {constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION}
                        <span className="add-new-vote__red-star">*</span>
                    </label>
                    <input className="add-new-vote-type-position-multiple__name-question-input"
                           type={'text'}
                           placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_SELECTION_POSITION}
                    />
                </div>
                <div className="add-new-vote-type-position-multiple__types-variants-answer">
                        <div className="add-new-vote-type-position-multiple__types-variants-answer-input-text">
                            <h3 className="add-new-vote-type-position-multiple__types-variants-answer-title">
                                {constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER}
                            </h3>
                            <div className="add-new-vote-type-position-multiple__type-input-block">
                                <input disabled={false}
                                       placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER_PLACEHOLDER_USERNAME}
                                       className="add-new-vote-type-position-multiple__type-input-text"
                                />
                                <div className="add-new-vote-type-position-multiple__type-input-icons">
                                    <img className="add-new-vote-type-position-multiple__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON}/>
                                    <img className="add-new-vote-type-position-multiple__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON}/>
                                </div>
                            </div>
                        </div>
                        <div className="add-new-vote-type-position-multiple__import-excel-block">
                            <img className="add-new-vote-type-position-multiple__icon-excel" src={iconExcel} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="add-new-vote-type-position-multiple__import-excel-btn">{constants.ADD_NEW_VOTE.EXPAND_LIST_IMPORT_EXCEL}</p>
                        </div>
                    <div className="add-new-vote-type-position-multiple__add-materials-vote">
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
                    <div className="add-new-vote-type-position-multiple__add-button-block">
                        <button className="add-new-vote-type-position-multiple__add-btn">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_QUESTION_BTN}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddNewVoteTypePositionMultiple;