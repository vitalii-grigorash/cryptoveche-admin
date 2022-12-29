import React, { useEffect, useState } from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import AddMaterials from "../AddMaterials/AddMaterials";
import { Validation } from '../../utils/Validation';

const AddNewVoteTypePositionSingle = (props) => {

    const {
        onCloseModal,
        constants,
        requestHelper,
        questionsList,
        addQuestion,
        questionForEdit,
        changeEditQuestion
    } = props;

    const questionTitle = Validation();
    const questionAnswer = Validation();
    const [materials, setMaterials] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditMode, setEditMode] = useState(false);

    const rows = [
        { value: questionAnswer.value }
    ]

    useEffect(() => {
        if (questionForEdit.id) {
            questionTitle.setValue(questionForEdit.title);
            questionAnswer.setValue(questionForEdit.options.rows[0].value);
            setMaterials(questionForEdit.materials);
            setEditMode(true);
        }
        // eslint-disable-next-line
    }, [questionForEdit])

    function idGenerate(arr) {
        if (arr.length < 1) {
            return 1;
        } else {
            const allIdArray = arr.map((arr) => {
                return arr.id
            });
            return Math.max(...allIdArray) + 1;
        }
    }

    function materialsValidate(materials) {
        const materialsValidation = () => {
            for (let val of materials) {
                for (let key in val) {
                    if (!val[key]) {
                        return false;
                    }
                }
            }
        }
        const isMaterialsValid = materialsValidation();
        if (isMaterialsValid === false) {
            setErrorMessage(constants.ADD_NEW_VOTE.QUESTION_MATERIALS_ERR);
            return false;
        } else {
            setErrorMessage('');
            return true;
        }
    }

    function rowsValidate(materials) {
        if (questionAnswer.value === '') {
            setErrorMessage(constants.ADD_NEW_VOTE.ROWS_ERR);
            return false;
        } else {
            setErrorMessage('');
            return materialsValidate(materials);
        }
    }

    function questionValidation(materials) {
        if (questionTitle.value !== '') {
            setErrorMessage('');
            return rowsValidate(materials);
        } else {
            setErrorMessage(constants.ADD_NEW_VOTE.QUESTION_TITLE_ERROR);
            return false;
        }
    }

    function onClose() {
        onCloseModal();
        setErrorMessage('');
        setMaterials([]);
        questionTitle.setValue('');
        questionAnswer.setValue('');
        setEditMode(false);
    }

    function addNewQuestion() {
        const materialsForValidation = [];
        materials.forEach((material) => {
            if (material.type === "link") {
                const data = {
                    title: material.title,
                    type: material.type,
                    value: material.valueLink
                }
                materialsForValidation.push(data);
            } else {
                const data = {
                    title: material.title,
                    type: material.type,
                    value: material.valueDoc
                }
                materialsForValidation.push(data);
            }
        })

        const isQuestionValid = questionValidation(materialsForValidation);
        if (isQuestionValid) {
            const question = {
                id: isEditMode ? questionForEdit.id : idGenerate(questionsList),
                template: "position_single",
                title: questionTitle.value,
                options: {
                    rows: rows,
                    columns: []
                },
                materials: materials,
                is_required_grid_rows: false,
                rules: {
                    pick_eq: -1,
                    pick_lt: -1,
                    pick_gt: -1,
                    pick_le: 1,
                    pick_ge: -1
                }
            }
            if (isEditMode) {
                changeEditQuestion(question);
            } else {
                addQuestion(question);
            }
            onClose();
        }
    }

    function addEmptyMaterial() {
        const material = {
            id: idGenerate(materials),
            title: "",
            type: "link",
            valueLink: "",
            valueDoc: "",
            selectedFileName: constants.ADD_NEW_ORG.ADD_NEW_ORG_SELECT_FILE,
            isFileSelected: false
        }
        setMaterials([...materials, material]);
    }

    function deleteMaterial(id) {
        const filteredArray = materials.filter(el => el.id !== id);
        setMaterials(filteredArray);
    }

    function changeMaterialType(id, type, isEvent) {
        if (!isEvent) {
            const foundedMaterial = materials.find(el => el.id === id);
            const filteredArray = materials.filter(el => el.id !== id);
            foundedMaterial.type = type;
            filteredArray.push(foundedMaterial);
            setMaterials(filteredArray);
        }
    }

    function linkInputChange(e, id) {
        const foundedEl = materials.find(el => el.id === id);
        const filteredArray = materials.filter(el => el.id !== id);
        foundedEl.valueLink = e.target.value
        filteredArray.push(foundedEl);
        setMaterials(filteredArray);
    }

    function titleInputChange(e, id) {
        const foundedEl = materials.find(el => el.id === id);
        const filteredArray = materials.filter(el => el.id !== id);
        foundedEl.title = e.target.value
        filteredArray.push(foundedEl);
        setMaterials(filteredArray);
    }

    function changeDocLink(id, fileName, link) {
        const foundedEl = materials.find(el => el.id === id);
        const filteredArray = materials.filter(el => el.id !== id);
        foundedEl.isFileSelected = true;
        foundedEl.selectedFileName = fileName;
        foundedEl.valueDoc = link;
        filteredArray.push(foundedEl);
        setMaterials(filteredArray);
    }

    return (
        <div className="add-new-vote-type-position-single__container active">
            <div className="add-new-vote-type-position-single">
                <div className="add-new-vote-type-position-single__title">
                    <h3 className="add-new-vote-type-position-single__title-number-question">{!isEditMode && `${constants.ADD_NEW_VOTE.QUESTION} #${questionsList.length + 1}`}</h3>
                    <img onClick={onClose} className="add-new-vote-type-position-single__title-icon-close" src={iconCloseModal} alt={constants.GENERAL.ALT_ICON} />
                </div>
                <h5 className="add-new-vote-type-position-single__title-current-type-question">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_POSITION_SINGLE}</h5>
                <div className="add-new-vote-type-position-single__name-question">
                    <label className="add-new-vote-type-position-single__name-question-label">
                        {constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION}
                        <span className="add-new-vote__red-star"> *</span>
                    </label>
                    <input
                        className="add-new-vote-type-position-single__name-question-input"
                        type='text'
                        placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_SELECTION_POSITION}
                        name="question-title"
                        value={questionTitle.value}
                        onChange={questionTitle.onChange}
                    />
                </div>
                <div className="add-new-vote-type-position-single__types-variants-answer">
                    <div className="add-new-vote-type-position-single__types-variants-answer-input-text">
                        <h3 className="add-new-vote-type-position-single__types-variants-answer-title">
                            {constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER}
                        </h3>
                        <div className="add-new-vote-type-position-single__type-input-block">
                            <input
                                className="add-new-vote-type-position-single__type-input-text"
                                type='text'
                                placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER_PLACEHOLDER_USERNAME}
                                name="question-answer"
                                value={questionAnswer.value}
                                onChange={questionAnswer.onChange}
                            />
                        </div>
                    </div>
                    <div className="add-new-vote-type-position-single__add-materials-vote">
                        <AddMaterials
                            constants={constants}
                            eventMaterials={materials}
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
                    <p className="add-new-vote-type-position-single__error-message">{errorMessage}</p>
                    <div className="add-new-vote-type-position-single__add-button-block">
                        <button className="add-new-vote-type-position-single__add-btn" onClick={addNewQuestion}>{isEditMode ? constants.ADD_NEW_VOTE.SAVE_CHANGES : constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_QUESTION_BTN}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewVoteTypePositionSingle;
