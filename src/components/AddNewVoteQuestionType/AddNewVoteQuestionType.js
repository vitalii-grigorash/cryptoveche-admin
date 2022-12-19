import React, {useCallback, useEffect, useRef, useState} from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import iconPlus from "../../img/AddNewVoteQuestuionTypeIconPlus.svg";
import iconBasket from "../../img/AddNewVoteQuestuionTypeIconBasket.svg";
import iconRulePlus from "../../img/AddNewVoteIconPlus.svg";
import iconExcel from "../../img/AddNewVoteIconExcel.svg";
import AddMaterials from "../AddMaterials/AddMaterials";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";

const AddNewVoteQuestionType = (props) => {

    const {
        activeModalTypeQuestion,
        setActiveModalTypeQuestion,
        constants,
        selectedTypeQuestionBtn,
        setSelectedTypeQuestionBtn,
        typeQuestionButtons,
        eventMaterials,
        addEmptyMaterial,
        changeMaterialType
    } = props;

    const [activeRuleSelect, setActiveRuleSelect] = useState(false);
    const [activeRuleRestriction, setActiveRuleRestriction] = useState(false);
    const [activeSelectTypeQuestion, setActiveSelectTypeQuestion] = useState(false);
    const [startValueRange, setStartValueRange] = useState(0);
    const [endValueRange, setEndValueRange] = useState(5);
    const [startValueInput, setStartValueInput] = useState(0);
    const [endValueInput, setEndValueInput] = useState(0);
    const sliderTrackRef = useRef(null);
    const startRangeRef = useRef(null);
    const endRangeRef = useRef(null);
    let minGapRange = 1;

    const onGetTypeQuestion = (typeQuestion, nameQuestion) => {
        setSelectedTypeQuestionBtn({typeQuestion, nameQuestion})
    }

    const onChangeSliderOne = (e) => {
        setStartValueRange(e.target.value)
        setStartValueInput(e.target.value)
    }

    const onChangeSliderTwo = (e) => {
        setEndValueRange(e.target.value)
        setEndValueInput(e.target.value)
    }

    const fillColorRangeTrack = useCallback(() => {
        let bun = (startValueRange / startRangeRef.current.max) * 100;
        let num = (endValueRange / endRangeRef.current.max) * 100;
        sliderTrackRef.current.style.background = `linear-gradient(to right, #dadae5 ${bun}%, #0084FE ${bun}%, #0084FE ${num}%, #dadae5 ${num}%)`;
    },[startValueRange, endValueRange])

    useEffect(() => {
        if (selectedTypeQuestionBtn.typeQuestion === "none") {
            if (parseInt(endValueRange.toString()) - parseInt(startValueRange.toString()) <= minGapRange) {
                return setStartValueRange(parseInt(endValueRange.toString()) - minGapRange);
            }
            fillColorRangeTrack();
        }
    },[endValueRange, startValueRange, minGapRange, fillColorRangeTrack, selectedTypeQuestionBtn.typeQuestion])

    useEffect(() => {
        if (selectedTypeQuestionBtn.typeQuestion === "none") {
            if(parseInt(endValueRange.toString()) - parseInt(startValueRange.toString()) <= minGapRange) {
                setEndValueRange(parseInt(startValueRange.toString()) + minGapRange)
            }
            fillColorRangeTrack();
        }
    },[endValueRange, startValueRange, minGapRange, fillColorRangeTrack, selectedTypeQuestionBtn.typeQuestion])

    const onCloseModal = () => {
        setActiveModalTypeQuestion(false)
    }
    return (
        <div className={activeModalTypeQuestion ? "add-new-vote-question-type__container active" : "add-new-vote-question-type__container"}>
            <div className="add-new-vote-question-type">
                <div className="add-new-vote-question-type__title">
                    <h3 className="add-new-vote-question-type__title-number-question">
                        Вопрос #1
                    </h3>
                    <img onClick={onCloseModal} className="add-new-vote-question-type__title-icon-close" src={iconCloseModal} alt={constants.GENERAL.ALT_ICON}/>
                </div>
                <h5 className="add-new-vote-question-type__title-current-type-question">{selectedTypeQuestionBtn.nameQuestion}</h5>
                <label className="add-new-vote-question-type__select-type-question-mobile">
                    {constants.ADD_NEW_VOTE.QUESTION_TYPE_SELECT_TYPE_QUESTION}<span className="add-new-vote__red-star">*</span>
                </label>
                <div onClick={() => setActiveSelectTypeQuestion(!activeSelectTypeQuestion)} className="add-new-vote-question-type__time-zone-select-container">
                    <p className="add-new-vote-question-type__time-zone-select-value">{selectedTypeQuestionBtn.nameQuestion}</p>
                    <img className="add-new-vote-question-type__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                    <div className={activeSelectTypeQuestion ? "add-new-vote-question-type__time-zone-options-container" : "add-new-vote-question-type__time-zone-options-container hidden"}>
                        {typeQuestionButtons.map((el, i) => {
                            return (
                                <p key={i} onClick={() => onGetTypeQuestion(el.typeQuestion, el.nameBtn)} className="add-new-vote-question-type__time-zone-option">{el.nameBtn}</p>
                            )
                        })}
                    </div>
                </div>
                <div className="add-new-vote-question-type__name-question">
                    <label className="add-new-vote-question-type__name-question-label">
                        {constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION}
                        <span className="add-new-vote__red-star">*</span>
                    </label>
                    <input className="add-new-vote-question-type__name-question-input"
                           type={'text'}
                           placeholder={selectedTypeQuestionBtn.typeQuestion === "ynq" || selectedTypeQuestionBtn.typeQuestion === "none" || selectedTypeQuestionBtn.typeQuestion === "grid" || selectedTypeQuestionBtn.typeQuestion === "radioGrid" ? `${constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_ENTER_YOUR_QUESTION}` : `${constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_SELECTION_POSITION}`}
                    />
                </div>
                {selectedTypeQuestionBtn.typeQuestion === "samePositions" ? <div className="add-new-vote-question-type__number-positions-block">
                    <input className="add-new-vote-question-type__number-positions-name-positions"
                           type={"text"}
                           disabled={true}
                           placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_NUMBER_OF_POSITIONS}
                    />
                    <input className="add-new-vote-question-type__numbers-position" type={"number"} placeholder={'1'} min={1} max={9999} step={1}/>
                </div> : null}
                <div className="add-new-vote-question-type__types-variants-answer">
                    {selectedTypeQuestionBtn.typeQuestion === "ynq" || selectedTypeQuestionBtn.typeQuestion === "none" || selectedTypeQuestionBtn.typeQuestion === "positionMultiple"  || selectedTypeQuestionBtn.typeQuestion === "samePositions" || selectedTypeQuestionBtn.typeQuestion === "positionSingle" ?
                        <div className="add-new-vote-question-type__types-variants-answer-input-text">
                            <h3 className="add-new-vote-question-type__types-variants-answer-title">
                                {constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER}
                            </h3>
                        <div className="add-new-vote-question-type__type-input-block">
                            <input disabled={false}
                                   placeholder={selectedTypeQuestionBtn.typeQuestion === "ynq" || selectedTypeQuestionBtn.typeQuestion === "none" ? `${constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER_PLACEHOLDER_ENTER_VARIANT}` : `${constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER_PLACEHOLDER_USERNAME}`}
                                   className="add-new-vote-question-type__type-input-text"
                            />
                            {selectedTypeQuestionBtn.typeQuestion === "none" || selectedTypeQuestionBtn.typeQuestion === "positionMultiple"  || selectedTypeQuestionBtn.typeQuestion === "samePositions" ?
                                <div className="add-new-vote-question-type__type-input-icons">
                                <img className="add-new-vote-question-type__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON}/>
                                <img className="add-new-vote-question-type__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON}/>
                            </div> : null}
                        </div>
                    </div> : null}
                    {selectedTypeQuestionBtn.typeQuestion === "grid" || selectedTypeQuestionBtn.typeQuestion === "radioGrid" ? <div className="add-new-vote-question-type__types-variants-answer-grid-block">
                        <div className="add-new-vote-question-type__types-variants-answer-grid">
                            <div className="add-new-vote-question-type__grid-row">
                                <h4 className="add-new-vote-question-type__grid-title">{constants.ADD_NEW_VOTE.QUESTION_TYPE_GRID_ROWS}</h4>
                                <div className="add-new-vote-question-type__grid-row-input-block">
                                    <input className="add-new-vote-question-type__grid-input-text" type={"text"} placeholder={'Введите значение'}/>
                                    <div className="add-new-vote-question-type__type-input-icons">
                                        <img className="add-new-vote-question-type__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON}/>
                                        <img className="add-new-vote-question-type__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON}/>
                                    </div>
                                </div>
                            </div>
                            <div className="add-new-vote-question-type__grid-column">
                                <h4 className="add-new-vote-question-type__grid-title">{constants.ADD_NEW_VOTE.QUESTION_TYPE_GRID_COLUMNS}</h4>
                                <div className="add-new-vote-question-type__grid-column-input-block">
                                    <input className="add-new-vote-question-type__grid-input-text"
                                           type={"text"}
                                           placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_GRID_ENTER_VALUES}/>
                                    <div className="add-new-vote-question-type__type-input-icons">
                                        <img className="add-new-vote-question-type__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON}/>
                                        <img className="add-new-vote-question-type__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="add-new-vote-question-type__checkbox">
                            <label className='add-new-vote-question-type__checkbox_container'>
                                <input type="checkbox"/>
                                <span className='add-new-vote-question-type__checkmark' />
                            </label>
                            <p className="add-new-vote-question-type__label-checkbox">{constants.ADD_NEW_VOTE.QUESTION_TYPE_GRID_NOTE}</p>
                        </div>
                    </div> : null}
                    {selectedTypeQuestionBtn.typeQuestion === "none" ? <div className="add-new-vote-question-type__rules-block">
                        <div onClick={() => setActiveRuleSelect(!activeRuleSelect)}  className="add-new-vote-question-type__title-rules-block">
                            <img className="add-new-vote-question-type__rules-icon-plus" src={iconRulePlus} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="add-new-vote-question-type__rules-add-rule-label">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_TITLE}</p>
                        </div>
                        <div className={activeRuleSelect ? "add-new-vote-question-type__select-rules-block active" : "add-new-vote-question-type__select-rules-block"}>
                             <div className="add-new-vote-question-type__select-rules-block-restriction">
                                 <h3 className="add-new-vote-question-type__select-rules-title">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES}</h3>
                                 <div className="add-new-vote-question-type__select-rules-restriction">
                                     <div onClick={() => setActiveRuleRestriction(!activeRuleRestriction)} className="add-new-vote__time-zone-select-container _question-type">
                                         <p className="add-new-vote__time-zone-select-value">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_CHOOSE_EXACTLY}</p>
                                         <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt={constants.GENERAL.ALT_ICON}/>
                                         <div className={activeRuleRestriction ? "add-new-vote__time-zone-options-container _question-type-select" : "add-new-vote__time-zone-options-container hidden"}>
                                             <p className="add-new-vote__time-zone-option">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_CHOOSE_LESS_THAN}</p>
                                             <p className="add-new-vote__time-zone-option">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_CHOOSE_MORE_THAN}</p>
                                             <p className="add-new-vote__time-zone-option">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_CHOOSE_LESS_OR_EXACTLY}</p>
                                             <p className="add-new-vote__time-zone-option">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_CHOOSE_MORE_OR_EXACTLY}</p>
                                         </div>
                                     </div>
                                     <div className="add-new-vote-question-type__select-rules-restriction-input-buttons">
                                        <input className="add-new-vote-question-type__select-rules-restriction-input"
                                               type={"number"}
                                               min={0}
                                               max={15}
                                               placeholder={'1'}
                                        />
                                         <div className="add-new-vote-question-type__type-input-icons">
                                             <img className="add-new-vote-question-type__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON}/>
                                             <img className="add-new-vote-question-type__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON}/>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                            <div className="add-new-vote-question-type__select-rules-block-range">
                                <h3 className="add-new-vote-question-type__select-rules-title">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES}</h3>
                                    <div className="add-new-vote-question-type__select-rules-inputs-number"><p>{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_SELECT_INTERVAL_FROM}</p>
                                        <input className="add-new-vote-question-type__select-rules-input"
                                               defaultValue={startValueInput}
                                               id="valueRange1"
                                               type={"number"}
                                               min={0}
                                               max={15}
                                        />
                                        <p>{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_SELECT_INTERVAL_BEFORE}</p>
                                        <input className="add-new-vote-question-type__select-rules-input"
                                               defaultValue={endValueInput}
                                               id="valueRange2"
                                               type={"number"}
                                               step={1}
                                               min={0}
                                               max={15}
                                        />
                                        <p>{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_SELECT_INTERVAL_ANSWER_OPTIONS}</p>
                                        <div className="add-new-vote-question-type__type-input-icons">
                                            <img className="add-new-vote-question-type__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON}/>
                                            <img className="add-new-vote-question-type__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON}/>
                                        </div>
                                    </div>
                                <div className={activeRuleSelect ? "add-new-vote-question-type__select-rules-range active" : "add-new-vote-question-type__select-rules-range"}>
                                    <div ref={sliderTrackRef} className="add-new-vote-question-type__select-rules-slider-track"></div>
                                    <input className="add-new-vote-question-type__select-rules-range-input"
                                           type="range"
                                           step={1}
                                           min={0}
                                           max={30}
                                           id="slider-1"
                                           onChange={(e) => onChangeSliderOne(e)}
                                           value={startValueRange}
                                           ref={startRangeRef}
                                    />
                                    <input className="add-new-vote-question-type__select-rules-range-input"
                                           type="range"
                                           step={1}
                                           min={0}
                                           max={30}
                                           id="slider-2"
                                           onChange={(e) => onChangeSliderTwo(e)}
                                           value={endValueRange}
                                           ref={endRangeRef}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> : null}
                    {selectedTypeQuestionBtn.typeQuestion === "none" || selectedTypeQuestionBtn.typeQuestion === "positionMultiple" || selectedTypeQuestionBtn.typeQuestion === "samePositions" ?
                        <div className="add-new-vote-question-type__import-excel-block">
                        <img className="add-new-vote-question-type__icon-excel" src={iconExcel} alt={constants.GENERAL.ALT_ICON}/>
                        <p className="add-new-vote-question-type__import-excel-btn">{constants.ADD_NEW_VOTE.EXPAND_LIST_IMPORT_EXCEL}</p>
                    </div> : null}
                    <div className="add-new-vote-question-type__add-materials-vote">
                        <AddMaterials
                            constants={constants}
                            eventMaterials={eventMaterials}
                            isEvent={false}
                            addEmptyMaterial={addEmptyMaterial}
                            changeMaterialType={changeMaterialType}
                        />
                    </div>
                    <div className="add-new-vote-question-type__add-button-block">
                        <button className="add-new-vote-question-type__add-btn">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_QUESTION_BTN}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddNewVoteQuestionType;