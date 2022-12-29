import React, { useCallback, useEffect, useRef, useState } from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import iconPlus from "../../img/AddNewVoteQuestuionTypeIconPlus.svg";
import iconBasket from "../../img/AddNewVoteQuestuionTypeIconBasket.svg";
import iconRulePlus from "../../img/AddNewVoteIconPlus.svg";
import iconExcel from "../../img/AddNewVoteIconExcel.svg";
import AddMaterials from "../AddMaterials/AddMaterials";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";

const AddNewVoteTypeNone = (props) => {

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

    const [activeRuleSelect, setActiveRuleSelect] = useState(false);
    const [activeRuleRestriction, setActiveRuleRestriction] = useState(false);
    const [startValueRange, setStartValueRange] = useState(0);
    const [endValueRange, setEndValueRange] = useState(5);
    const [startValueInput, setStartValueInput] = useState(0);
    const [endValueInput, setEndValueInput] = useState(0);
    const sliderTrackRef = useRef(null);
    const startRangeRef = useRef(null);
    const endRangeRef = useRef(null);
    let minGapRange = 1;

    const onChangeSliderOne = (e) => {
        setStartValueRange(e.target.value);
        setStartValueInput(e.target.value);
    }

    const onChangeSliderTwo = (e) => {
        setEndValueRange(e.target.value);
        setEndValueInput(e.target.value);
    }

    const fillColorRangeTrack = useCallback(() => {
        let startVal = (startValueRange / startRangeRef.current.max) * 100;
        let endVal = (endValueRange / endRangeRef.current.max) * 100;
        sliderTrackRef.current.style.background = `linear-gradient(to right, #dadae5 ${startVal}%, #0084FE ${startVal}%, #0084FE ${endVal}%, #dadae5 ${endVal}%)`;
    }, [startValueRange, endValueRange])

    useEffect(() => {
            if (parseInt(endValueRange.toString()) - parseInt(startValueRange.toString()) <= minGapRange) {
                return setStartValueRange(parseInt(endValueRange.toString()) - minGapRange);
            }
            fillColorRangeTrack();
    }, [endValueRange, startValueRange, minGapRange, fillColorRangeTrack])

    useEffect(() => {
            if (parseInt(endValueRange.toString()) - parseInt(startValueRange.toString()) <= minGapRange) {
                setEndValueRange(parseInt(startValueRange.toString()) + minGapRange)
            }
            fillColorRangeTrack();
    }, [endValueRange, startValueRange, minGapRange, fillColorRangeTrack])

    return (
        <div className="add-new-vote-type-none__container active">
            <div className="add-new-vote-type-none">
                <div className="add-new-vote-type-none__title">
                    <h3 className="add-new-vote-type-none__title-number-question">{constants.ADD_NEW_VOTE.QUESTION} #{questionsList.length + 1}</h3>
                    <img onClick={onCloseModal} className="add-new-vote-type-none__title-icon-close" src={iconCloseModal} alt={constants.GENERAL.ALT_ICON} />
                </div>
                <h5 className="add-new-vote-type-none__title-current-type-question">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_NONE}</h5>
                <div className="add-new-vote-type-none__name-question">
                    <label className="add-new-vote-type-none__name-question-label">
                        {constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION}
                        <span className="add-new-vote__red-star"> *</span>
                    </label>
                    <input className="add-new-vote-type-none__name-question-input"
                        type={'text'}
                        placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_NAME_QUESTION_PLACEHOLDER_ENTER_YOUR_QUESTION}
                    />
                </div>
                <div className="add-new-vote-type-none__types-variants-answer">
                    <div className="add-new-vote-type-none__types-variants-answer-input-text">
                        <h3 className="add-new-vote-type-none__types-variants-answer-title">
                            {constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER}
                        </h3>
                        <div className="add-new-vote-type-none__type-input-block">
                            <input disabled={false}
                                placeholder={constants.ADD_NEW_VOTE.QUESTION_TYPE_VARIANTS_ANSWER_PLACEHOLDER_ENTER_VARIANT}
                                className="add-new-vote-type-none__type-input-text"
                            />
                            <div className="add-new-vote-type-none__type-input-icons">
                                <img className="add-new-vote-type-none__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON} />
                                <img className="add-new-vote-type-none__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON} />
                            </div>
                        </div>
                    </div>
                    <div className="add-new-vote-type-none__rules-block">
                        <div onClick={() => setActiveRuleSelect(!activeRuleSelect)} className="add-new-vote-type-none__title-rules-block">
                            <img className="add-new-vote-type-none__rules-icon-plus" src={iconRulePlus} alt={constants.GENERAL.ALT_ICON} />
                            <p className="add-new-vote-type-none__rules-add-rule-label">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_TITLE}</p>
                        </div>
                        <div className={activeRuleSelect ? "add-new-vote-type-none__select-rules-block active" : "add-new-vote-type-none__select-rules-block"}>
                            <div className="add-new-vote-type-none__select-rules-block-restriction">
                                <h3 className="add-new-vote-type-none__select-rules-title">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES}</h3>
                                <div className="add-new-vote-type-none__select-rules-restriction">
                                    <div onClick={() => setActiveRuleRestriction(!activeRuleRestriction)} className="add-new-vote__time-zone-select-container _question-type">
                                        <p className="add-new-vote__time-zone-select-value">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_CHOOSE_EXACTLY}</p>
                                        <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt={constants.GENERAL.ALT_ICON} />
                                        <div className={activeRuleRestriction ? "add-new-vote__time-zone-options-container _question-type-select" : "add-new-vote__time-zone-options-container hidden"}>
                                            <p className="add-new-vote__time-zone-option">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_CHOOSE_LESS_THAN}</p>
                                            <p className="add-new-vote__time-zone-option">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_CHOOSE_MORE_THAN}</p>
                                            <p className="add-new-vote__time-zone-option">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_CHOOSE_LESS_OR_EXACTLY}</p>
                                            <p className="add-new-vote__time-zone-option">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_CHOOSE_MORE_OR_EXACTLY}</p>
                                        </div>
                                    </div>
                                    <div className="add-new-vote-type-none__select-rules-restriction-input-buttons">
                                        <input className="add-new-vote-type-none__select-rules-restriction-input"
                                            type={"number"}
                                            min={0}
                                            max={15}
                                            placeholder={'1'}
                                        />
                                        <div className="add-new-vote-type-none__type-input-icons">
                                            <img className="add-new-vote-type-none__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON} />
                                            <img className="add-new-vote-type-none__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="add-new-vote-type-none__select-rules-block-range">
                                <h3 className="add-new-vote-type-none__select-rules-title">{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES}</h3>
                                <div className="add-new-vote-type-none__select-rules-inputs-number"><p>{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_SELECT_INTERVAL_FROM}</p>
                                    <input className="add-new-vote-type-none__select-rules-input"
                                        defaultValue={startValueInput}
                                        id="valueRange1"
                                        type={"number"}
                                        min={0}
                                        max={15}
                                    />
                                    <p>{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_SELECT_INTERVAL_BEFORE}</p>
                                    <input className="add-new-vote-type-none__select-rules-input"
                                        defaultValue={endValueInput}
                                        id="valueRange2"
                                        type={"number"}
                                        step={1}
                                        min={0}
                                        max={15}
                                    />
                                    <p>{constants.ADD_NEW_VOTE.QUESTION_TYPE_RULES_SELECT_SELECT_INTERVAL_ANSWER_OPTIONS}</p>
                                    <div className="add-new-vote-type-none__type-input-icons">
                                        <img className="add-new-vote-type-none__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON} />
                                        <img className="add-new-vote-type-none__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON} />
                                    </div>
                                </div>
                                <div className={activeRuleSelect ? "add-new-vote-type-none__select-rules-range active" : "add-new-vote-type-none__select-rules-range"}>
                                    <div ref={sliderTrackRef} className="add-new-vote-type-none__select-rules-slider-track"></div>
                                    <input className="add-new-vote-type-none__select-rules-range-input"
                                        type="range"
                                        step={1}
                                        min={0}
                                        max={30}
                                        id="slider-1"
                                        onChange={(e) => onChangeSliderOne(e)}
                                        value={startValueRange}
                                        ref={startRangeRef}
                                    />
                                    <input className="add-new-vote-type-none__select-rules-range-input"
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
                    </div>
                    <div className="add-new-vote-type-none__import-excel-block">
                        <img className="add-new-vote-type-none__icon-excel" src={iconExcel} alt={constants.GENERAL.ALT_ICON} />
                        <p className="add-new-vote-type-none__import-excel-btn">{constants.ADD_NEW_VOTE.EXPAND_LIST_IMPORT_EXCEL}</p>
                    </div>
                    <div className="add-new-vote-type-none__add-materials-vote">
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
                    <div className="add-new-vote-type-none__add-button-block">
                        <button className="add-new-vote-type-none__add-btn">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_QUESTION_BTN}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewVoteTypeNone;
