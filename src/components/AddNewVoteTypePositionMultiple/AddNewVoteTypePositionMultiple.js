import React, { useEffect, useState } from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import AddMaterials from "../AddMaterials/AddMaterials";
import { Validation } from '../../utils/Validation';
import iconPlus from "../../img/AddNewVoteQuestuionTypeIconPlus.svg";
import iconBasket from "../../img/AddNewVoteQuestuionTypeIconBasket.svg";
// import iconExcel from "../../img/AddNewVoteIconExcel.svg";

const AddNewVoteTypePositionMultiple = (props) => {

    const {
        onCloseModal,
        constants,
        requestHelper,
        questionsList,
        addQuestion,
        questionForEdit,
        changeEditQuestion
    } = props;

    // Сделать валидаю для пустых строк с ответами
    // Сделать preparePositionMultiple с материалами и строками

    const questionTitle = Validation();
    const [materials, setMaterials] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditMode, setEditMode] = useState(false);
    const [rows, setRows] = useState([]);

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

    function addEmptyRow() {
        const row = {
            id: idGenerate(rows),
            value: ""
        }
        setRows([...rows, row]);
    }

    useEffect(() => {
        if (questionForEdit.id) {
            questionTitle.setValue(questionForEdit.title);
            setMaterials(questionForEdit.materials);
            setRows(questionForEdit.options.rows);
            setEditMode(true);
        } else {
            addEmptyRow();
        }
        // eslint-disable-next-line
    }, [questionForEdit])

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

    function onClose() {
        onCloseModal();
        setErrorMessage('');
        setMaterials([]);
        setRows([]);
        questionTitle.setValue('');
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
                template: "position_multiple",
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

    function deleteRow(id) {
        if (rows.length !== 1) {
            const filteredArray = rows.filter(el => el.id !== id);
            setRows(filteredArray);
        }
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

    function rowInputChange(e, id) {
        const foundedEl = rows.find(el => el.id === id);
        const filteredArray = rows.filter(el => el.id !== id);
        foundedEl.value = e.target.value
        filteredArray.push(foundedEl);
        setRows(filteredArray);
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
        <div className="add-new-vote-type-position-multiple__container active">
            <div className="add-new-vote-type-position-multiple">
                <div className="add-new-vote-type-position-multiple__title">
                    <h3 className="add-new-vote-type-position-multiple__title-number-question">{!isEditMode && `${constants.ADD_NEW_VOTE.QUESTION} #${questionsList.length + 1}`}</h3>
                    <img onClick={onCloseModal} className="add-new-vote-type-position-multiple__title-icon-close" src={iconCloseModal} alt={constants.GENERAL.ALT_ICON} />
                </div>
                <h5 className="add-new-vote-type-position-multiple__title-current-type-question">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_POSITION_MULTIPLE}</h5>
                <div className="add-new-vote-type-position-multiple__name-question">
                    <label className="add-new-vote-type-position-multiple__name-question-label">
                        {constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION}
                        <span className="add-new-vote__red-star"> *</span>
                    </label>
                    <input
                        className="add-new-vote-type-position-multiple__name-question-input"
                        type='text'
                        placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_SELECTION_POSITION}
                        name="question-title"
                        value={questionTitle.value}
                        onChange={questionTitle.onChange}
                    />
                </div>
                <div className="add-new-vote-type-position-multiple__types-variants-answer">
                    <div className="add-new-vote-type-position-multiple__types-variants-answer-input-text">
                        <h3 className="add-new-vote-type-position-multiple__types-variants-answer-title">
                            {constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER}
                        </h3>
                        {rows.sort(function (a, b) {
                            const aId = a.id;
                            const bId = b.id;
                            if (aId < bId)
                                return -1
                            if (aId > bId)
                                return 1
                            return 0
                        }).map((row) => (
                            <div key={row.id} className="add-new-vote-type-position-multiple__type-input-block">
                                <input
                                    placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER_PLACEHOLDER_USERNAME}
                                    className="add-new-vote-type-position-multiple__type-input-text"
                                    value={row.value}
                                    onChange={(e) => rowInputChange(e, row.id)}
                                />
                                <div className="add-new-vote-type-position-multiple__type-input-icons">
                                    <img className="add-new-vote-type-position-multiple__type-input-gray-plus" onClick={addEmptyRow} src={iconPlus} alt={constants.GENERAL.ALT_ICON} />
                                    <img className="add-new-vote-type-position-multiple__type-input-gray-basket" onClick={() => deleteRow(row.id)} src={iconBasket} alt={constants.GENERAL.ALT_ICON} />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="add-new-vote-type-position-multiple__import-excel-block">
                        <img className="add-new-vote-type-position-multiple__icon-excel" src={iconExcel} alt={constants.GENERAL.ALT_ICON} />
                        <p className="add-new-vote-type-position-multiple__import-excel-btn">{constants.ADD_NEW_VOTE.EXPAND_LIST_IMPORT_EXCEL}</p>
                    </div> */}
                    <div className="add-new-vote-type-position-multiple__add-materials-vote">
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
                    <p className="add-new-vote-type-position-multiple__error-message">{errorMessage}</p>
                    <div className="add-new-vote-type-position-multiple__add-button-block">
                        <button className="add-new-vote-type-position-multiple__add-btn" onClick={addNewQuestion}>{isEditMode ? constants.ADD_NEW_VOTE.SAVE_CHANGES : constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_QUESTION_BTN}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewVoteTypePositionMultiple;
