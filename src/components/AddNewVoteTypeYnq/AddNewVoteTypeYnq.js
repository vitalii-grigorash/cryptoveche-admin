import React, { useState } from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import AddMaterials from "../AddMaterials/AddMaterials";
import { Validation } from '../../utils/Validation';

const AddNewVoteTypeYnq = (props) => {

    const {
        onCloseModal,
        constants,
        requestHelper,
        questionsList,
        addQuestion
    } = props;

    const questionTitle = Validation();
    const [materials, setMaterials] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const rows = [
        { value: constants.ADD_NEW_VOTE.FOR },
        { value: constants.ADD_NEW_VOTE.AGAINST },
        { value: constants.ADD_NEW_VOTE.ABSTAIN }
    ]

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

    function questionValidation(materials) {
        if (questionTitle.value !== '') {
            setErrorMessage('');
            return materialsValidate(materials);
        } else {
            setErrorMessage(constants.ADD_NEW_VOTE.QUESTION_TITLE_ERROR);
            return false;
        }
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
                id: idGenerate(questionsList),
                template: "ynq",
                title: questionTitle.value,
                options: {
                    rows: rows,
                    columns: []
                },
                materials: materials,
                is_required_grid_rows: false,
                rules: {
                    pick_eq: 1,
                    pick_lt: -1,
                    pick_gt: -1,
                    pick_le: -1,
                    pick_ge: -1
                }
            }
            addQuestion(question);
            onCloseModal();
            setErrorMessage('');
            setMaterials([]);
            questionTitle.setValue('');
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
        <div className="add-new-vote-type-ynq__container active">
            <div className="add-new-vote-type-ynq">
                <div className="add-new-vote-type-ynq__title">
                    <h3 className="add-new-vote-type-ynq__title-number-question">{constants.ADD_NEW_VOTE.QUESTION} #{questionsList.length + 1}</h3>
                    <img onClick={onCloseModal} className="add-new-vote-type-ynq__title-icon-close" src={iconCloseModal} alt={constants.GENERAL.ALT_ICON} />
                </div>
                <h5 className="add-new-vote-type-ynq__title-current-type-question">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_YNQ}</h5>
                <div className="add-new-vote-type-ynq__name-question">
                    <label className="add-new-vote-type-ynq__name-question-label">
                        {constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION}
                        <span className="add-new-vote__red-star"> *</span>
                    </label>
                    <input className="add-new-vote-type-ynq__name-question-input"
                        type='text'
                        placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_ENTER_YOUR_QUESTION}
                        name="question-title"
                        value={questionTitle.value}
                        onChange={questionTitle.onChange}
                    />
                </div>
                <div className="add-new-vote-type-ynq__types-variants-answer">
                    <div className="add-new-vote-type-ynq__types-variants-answer-input-text">
                        <h3 className="add-new-vote-type-ynq__types-variants-answer-title">
                            {constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER}
                        </h3>
                        {rows.map((row, i) => (
                            <div key={i} className="add-new-vote-type-ynq__type-input-block">
                                <input disabled={true}
                                    placeholder={row.value}
                                    className="add-new-vote-type-ynq__type-input-text"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="add-new-vote-type-ynq__add-materials-vote">
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
                    <p className="add-new-vote-type-ynq__error-message">{errorMessage}</p>
                    <div className="add-new-vote-type-ynq__add-button-block">
                        <button className="add-new-vote-type-ynq__add-btn" onClick={addNewQuestion}>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_QUESTION_BTN}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewVoteTypeYnq;
