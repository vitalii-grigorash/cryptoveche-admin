import React, {useCallback, useEffect, useRef, useState} from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import iconPlus from "../../img/AddNewVoteQuestuionTypeIconPlus.svg";
import iconBasket from "../../img/AddNewVoteQuestuionTypeIconBasket.svg";
import iconRulePlus from "../../img/AddNewVoteIconPlus.svg";
import iconExcel from "../../img/AddNewVoteIconExcel.svg";
import AddNewVoteAddMaterialsVote from "../AddNewVoteAddMaterialsVote/AddNewVoteAddMaterialsVote";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";

const AddNewVoteQuestionType = (props) => {

    const {
        activeModalTypeQuestion,
        setActiveModalTypeQuestion,
        constants,
        typeQuestionBtn,
        setTypeQuestionBtn,
        typeQuestionButtons
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
        setTypeQuestionBtn({typeQuestion, nameQuestion})
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
        if (typeQuestionBtn.typeQuestion === "none") {
            if (parseInt(endValueRange.toString()) - parseInt(startValueRange.toString()) <= minGapRange) {
                return setStartValueRange(parseInt(endValueRange.toString()) - minGapRange);
            }
            fillColorRangeTrack();
        }
    },[endValueRange, startValueRange, minGapRange, fillColorRangeTrack, typeQuestionBtn.typeQuestion])

    useEffect(() => {
        if (typeQuestionBtn.typeQuestion === "none") {
            if(parseInt(endValueRange.toString()) - parseInt(startValueRange.toString()) <= minGapRange) {
                setEndValueRange(parseInt(startValueRange.toString()) + minGapRange)
            }
            fillColorRangeTrack();
        }
    },[endValueRange, startValueRange, minGapRange, fillColorRangeTrack, typeQuestionBtn.typeQuestion])

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
                <h5 className="add-new-vote-question-type__title-current-type-question">{typeQuestionBtn.nameQuestion}</h5>
                <label className="add-new-vote-question-type__select-type-question-mobile">
                    Выберите тип вопроса<span className="add-new-vote__red-star">*</span>
                </label>
                <div onClick={() => setActiveSelectTypeQuestion(!activeSelectTypeQuestion)} className="add-new-vote-question-type__time-zone-select-container">
                    <p className="add-new-vote-question-type__time-zone-select-value">{typeQuestionBtn.nameQuestion}</p>
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
                        Заголовок вопроса
                        <span className="add-new-vote__red-star">*</span>
                    </label>
                    <input className="add-new-vote-question-type__name-question-input"
                           type={'text'}
                           placeholder={typeQuestionBtn.typeQuestion === "ynq" || typeQuestionBtn.typeQuestion === "none" || typeQuestionBtn.typeQuestion === "grid" || typeQuestionBtn.typeQuestion === "radioGrid" ? "Введите ваш вопрос" : "Отбор на позицию профессора"}
                    />
                </div>
                {typeQuestionBtn.typeQuestion === "samePositions" ? <div className="add-new-vote-question-type__number-positions-block">
                    <input className="add-new-vote-question-type__number-positions-name-positions" type={"text"} disabled={true} placeholder={'Количество должностных позиций'}/>
                    <input className="add-new-vote-question-type__numbers-position" type={"number"} placeholder={'1'} min={1} max={9999} step={1}/>
                </div> : null}
                <div className="add-new-vote-question-type__types-variants-answer">
                    {typeQuestionBtn.typeQuestion === "ynq" || typeQuestionBtn.typeQuestion === "none" || typeQuestionBtn.typeQuestion === "positionMultiple"  || typeQuestionBtn.typeQuestion === "samePositions" || typeQuestionBtn.typeQuestion === "positionSingle" ?
                        <div className="add-new-vote-question-type__types-variants-answer-input-text">
                            <h3 className="add-new-vote-question-type__types-variants-answer-title">
                                Варианты ответа
                            </h3>
                        <div className="add-new-vote-question-type__type-input-block">
                            <input disabled={false} placeholder={typeQuestionBtn.typeQuestion === "ynq" || typeQuestionBtn.typeQuestion === "none" ? 'Введите вариант ответа' : 'ФИО претендента'} className="add-new-vote-question-type__type-input-text"/>
                            {typeQuestionBtn.typeQuestion === "none" || typeQuestionBtn.typeQuestion === "positionMultiple"  || typeQuestionBtn.typeQuestion === "samePositions" ?
                                <div className="add-new-vote-question-type__type-input-icons">
                                <img className="add-new-vote-question-type__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON}/>
                                <img className="add-new-vote-question-type__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON}/>
                            </div> : null}
                        </div>
                    </div> : null}
                    {typeQuestionBtn.typeQuestion === "grid" || typeQuestionBtn.typeQuestion === "radioGrid" ? <div className="add-new-vote-question-type__types-variants-answer-grid-block">
                        <div className="add-new-vote-question-type__types-variants-answer-grid">
                            <div className="add-new-vote-question-type__grid-row">
                                <h4 className="add-new-vote-question-type__grid-title">Строки</h4>
                                <div className="add-new-vote-question-type__grid-row-input-block">
                                    <input className="add-new-vote-question-type__grid-input-text" type={"text"} placeholder={'Введите значение'}/>
                                    <div className="add-new-vote-question-type__type-input-icons">
                                        <img className="add-new-vote-question-type__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON}/>
                                        <img className="add-new-vote-question-type__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON}/>
                                    </div>
                                </div>
                            </div>
                            <div className="add-new-vote-question-type__grid-column">
                                <h4 className="add-new-vote-question-type__grid-title">Столбцы</h4>
                                <div className="add-new-vote-question-type__grid-column-input-block">
                                    <input className="add-new-vote-question-type__grid-input-text" type={"text"} placeholder={'Введите значение'}/>
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
                            <p className="add-new-vote-question-type__label-checkbox">Все строки обязательны для заполнения</p>
                        </div>
                    </div> : null}
                    {typeQuestionBtn.typeQuestion === "none" ? <div className="add-new-vote-question-type__rules-block">
                        <div onClick={() => setActiveRuleSelect(!activeRuleSelect)}  className="add-new-vote-question-type__title-rules-block">
                            <img className="add-new-vote-question-type__rules-icon-plus" src={iconRulePlus} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="add-new-vote-question-type__rules-add-rule-label">ДОБАВИТЬ ПРАВИЛО</p>
                        </div>
                        <div className={activeRuleSelect ? "add-new-vote-question-type__select-rules-block active" : "add-new-vote-question-type__select-rules-block"}>
                             <div className="add-new-vote-question-type__select-rules-block-restriction">
                                 <h3 className="add-new-vote-question-type__select-rules-title">Правило</h3>
                                 <div className="add-new-vote-question-type__select-rules-restriction">
                                     <div onClick={() => setActiveRuleRestriction(!activeRuleRestriction)} className="add-new-vote__time-zone-select-container _question-type">
                                         <p className="add-new-vote__time-zone-select-value">Выбрать ровно</p>
                                         <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt={constants.GENERAL.ALT_ICON}/>
                                         <div className={activeRuleRestriction ? "add-new-vote__time-zone-options-container _question-type-select" : "add-new-vote__time-zone-options-container hidden"}>
                                             <p className="add-new-vote__time-zone-option">Выбрать меньше чем</p>
                                             <p className="add-new-vote__time-zone-option">Выбрать больше чем</p>
                                             <p className="add-new-vote__time-zone-option">Выбрать меньше или ровно</p>
                                             <p className="add-new-vote__time-zone-option">Выбрать больше или ровно</p>
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
                                <h3 className="add-new-vote-question-type__select-rules-title">Правило</h3>
                                    <div className="add-new-vote-question-type__select-rules-inputs-number"><p>Выбрать интервал от</p>
                                        <input className="add-new-vote-question-type__select-rules-input"
                                               defaultValue={startValueInput}
                                               id="valueRange1"
                                               type={"number"}
                                               min={0}
                                               max={15}
                                        />
                                        <p>до</p>
                                        <input className="add-new-vote-question-type__select-rules-input"
                                               defaultValue={endValueInput}
                                               id="valueRange2"
                                               type={"number"}
                                               step={1}
                                               min={0}
                                               max={15}
                                        />
                                        <p>вариантов ответов</p>
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
                    {typeQuestionBtn.typeQuestion === "none" || typeQuestionBtn.typeQuestion === "positionMultiple" || typeQuestionBtn.typeQuestion === "samePositions" ?
                        <div className="add-new-vote-question-type__import-excel-block">
                        <img className="add-new-vote-question-type__icon-excel" src={iconExcel} alt={constants.GENERAL.ALT_ICON}/>
                        <p className="add-new-vote-question-type__import-excel-btn">ИМПОРТ ДАННЫХ ИЗ EXCEL</p>
                    </div> : null}
                    <div className="add-new-vote-question-type__add-materials-vote">
                        <AddNewVoteAddMaterialsVote
                            constants={constants}
                            nameMaterialsVote={'ПРИКРЕПИТЬ МАТЕРИАЛЫ К ВОПРОСУ'}
                        />
                    </div>
                    <div className="add-new-vote-question-type__add-button-block">
                        <button className="add-new-vote-question-type__add-btn">Добавить вопрос</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddNewVoteQuestionType;