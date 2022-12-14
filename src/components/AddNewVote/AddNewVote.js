import React, {useRef, useState} from "react";
import { useLocation } from "react-router-dom";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import AddNewVoteQuestionType from "../AddNewVoteQuestionType/AddNewVoteQuestionType";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";
import iconAddQuestionPlus from "../../img/AddNewVoteIconPlus.svg";
import iconAddQuestionPlusGreen from "../../img/AddNewVoteIconPlusGreen.svg";
import iconPlusTable from "../../img/AddNewVoteIconPlusTable.svg";
import iconMinusTable from "../../img/AddNewVoteIconMinusTable.svg";
import iconDeleteTable from "../../img/AddNewVoteDeleteIconMobile.svg";
import iconCompleteStep from "../../img/AddNewVoteIconComleteStep.svg";
import iconTwoStep from "../../img/AddNewVoteIconTwoStep.svg";
import iconThreeStep from "../../img/AddNewVoteIconThreeStep.svg";
import iconOneStepGreen from "../../img/AddNewVoteIconOneStep.svg";
import iconTwoStepGreen from "../../img/AddNewVoteIconTwoGreenStep.svg";
import iconThreeStepGreen from "../../img/AddNewVoteIconThreeGreenStep.svg";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import AddNewVoteAddObserversCountingMembers from "../AddNewVoteAddObserversCountingMembers/AddNewVoteAddObserversCountingMembers";
import AddNewVoteExpandList from "../AddNewVoteExpandList/AddNewVoteExpandList";
import orgSearchIconMobile from "../../img/PaginationSearchIcon.svg";
import AddNewVoteAddMaterialsVote from "../AddNewVoteAddMaterialsVote/AddNewVoteAddMaterialsVote";
import AddNewVoteCreatedQuestion from "../AddNewVoteCreatedQuestion/AddNewVoteCreatedQuestion";

const AddNewVote = (props) => {

    const {
        constants
    } = props;

    const [activeGeneralSettings, setActiveGeneralSettings] = useState(false);
    const [activeQuestionBlock, setActiveQuestionBlock] = useState(false);
    const [activeAddVoteBtn, setActiveAddVoteBtn] = useState(false);
    const [activeButtonGoQuestionsBlock, setActiveButtonGoQuestionsBlock] = useState(false);
    const [hideGeneralSettingMobile, setHideGeneralSettingMobile] = useState(false);
    const [hideSelectOrg, setHideSelectOrg] = useState(true);
    const [hideSelectOrgBtn, setHideSelectOrgBnt] = useState(true);
    const [activeSelectOrg, setActiveSelectOrg] = useState(false);
    const [activeCloseList, setActiveCloseList] = useState(true);
    const [activeOpenList, setActiveOpenList] = useState(false);
    const [activeAddUsersBtn, setActiveAddUsersBtn] = useState(false);
    const [activeAddGroupBtn, setActiveAddGroupBnt] = useState(true);
    const [activeSelectUsersGroup, setActiveSelectUserGroup] = useState(false);
    const [activeSelectQuorum, setActiveSelectQuorum] = useState(false);
    const [activeModalTypeQuestion, setActiveModalTypeQuestion] = useState(false);
    const [activeTypeQuestionBnt, setActiveTypeQuestionBnt] = useState(false);
    const [activeCompleteOneStep, setActiveCompleteOneStep] = useState(false);
    const [activeCompleteTwoStep, setActiveCompleteTwoStep] = useState(iconTwoStep);
    const [activeCompleteThreeStep, setActiveCompleteThreeStep] = useState(iconTwoStep);
    const { pathname } = useLocation();
    const progressBarRef = useRef(null);
    const [selectedTypeQuestionBtn, setSelectedTypeQuestionBtn] = useState({});

    const typeQuestionButtons = [
        {nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_YNQ}`, classNameBtn: "add-new-vote__select-type-vote-ynq", typeQuestion: "ynq"},
        {nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_NONE}`, classNameBtn: "add-new-vote__select-type-vote-none", typeQuestion: "none"},
        {nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_POSITION_SINGLE}`, classNameBtn: "add-new-vote__select-type-vote-position_single", typeQuestion: "positionSingle"},
        {nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_GRID}`, classNameBtn: "add-new-vote__select-type-vote-grid", typeQuestion: "grid"},
        {nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_RADIO_GRID}`, classNameBtn: "add-new-vote__select-type-vote-radio_grid", typeQuestion: "radioGrid"},
        {nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_POSITION_MULTIPLE}`, classNameBtn: "add-new-vote__select-type-vote-position_multiple", typeQuestion: "positionMultiple"},
        {nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_SAME_POSITIONS}`, classNameBtn: "add-new-vote__select-type-vote-same_positions", typeQuestion: "samePositions"}
    ];

    const onProgressBarStepOne = () => {
       setActiveCompleteOneStep(true);
       progressBarRef.current.style.width = '50%';
       setActiveCompleteTwoStep(iconTwoStepGreen);
    }

    const onProgressBarStepTwo = () => {
        progressBarRef.current.style.width = '100%';
        setActiveCompleteTwoStep(iconCompleteStep);
        setActiveCompleteThreeStep(iconThreeStepGreen);
        setActiveButtonGoQuestionsBlock(false);
    }

    const onShowGeneralSettings = () => {
        const getWightBlock = document.getElementById('addNewVoteWight').clientWidth;
        if (getWightBlock > 491) {
            setHideSelectOrg(false);
            setActiveGeneralSettings(true);
            setActiveQuestionBlock(true);
            setActiveAddVoteBtn(true);
            setHideSelectOrgBnt(false);
        } else {
            setHideSelectOrg(false);
            setActiveGeneralSettings(true);
            setHideSelectOrgBnt(false);
            setActiveButtonGoQuestionsBlock(true);
            onProgressBarStepOne();
        }
    }

    const onButtonGoQuestionBlock = () => {
            setHideGeneralSettingMobile(true);
            setActiveQuestionBlock(true);
            setActiveButtonGoQuestionsBlock(false);
            setActiveAddVoteBtn(true);
            onProgressBarStepTwo();
            window.scrollTo(0, 0);
    }

    const onShowOpenList = () => {
        setActiveOpenList(true);
        setActiveCloseList(false);
    }

    const onShowCloseList = () => {
        setActiveOpenList(false);
        setActiveCloseList(true);
    }

    const onShowSelectAddUsers = () => {
        setActiveAddUsersBtn(true);
        setActiveAddGroupBnt(false);
    }

    const onShowSelectAddGroup = () => {
        setActiveAddUsersBtn(false);
        setActiveAddGroupBnt(true);
    }

    const onShowSelectTypeQuestion = () => {
        const getWightBlock = document.getElementById('addNewVoteWight').clientWidth;
        if (getWightBlock > 491) {
            setActiveTypeQuestionBnt(true);
        } else {
            setActiveModalTypeQuestion(true);
            setActiveTypeQuestionBnt(true);
        }
    }
    const onGetTypeQuestionBtn = (nameQuestion, typeQuestion) => {
        setSelectedTypeQuestionBtn({nameQuestion, typeQuestion});
    }

    return (
        <div id={'addNewVoteWight'} className="add-new-vote__container _container">
           <GeneralTitleAllPages
               titleName={pathname === '/add-new-vote' ? constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_ADD_VOTE : constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_ADD_TEMPLATES_VOTE}
               firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
               secondLetter={pathname === '/add-new-vote' ? constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_ADD_VOTE : constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_ADD_TEMPLATES_VOTE}
           />
            <p className={activeGeneralSettings ? "add-new-vote__current-name-org active" : "add-new-vote__current-name-org"}>
                Название организации</p>
            <div className="add-new-vote__progress-step">
                    <img src={activeCompleteOneStep ? iconCompleteStep : iconOneStepGreen} className="add-new-vote__progress-one-step" alt={constants.GENERAL.ALT_ICON}/>
                    <img src={activeCompleteTwoStep.toString()} className="add-new-vote__progress-two-step" alt={constants.GENERAL.ALT_ICON}/>
                    <img src={activeCompleteThreeStep.toString()} className="add-new-vote__progress-three-step" alt={constants.GENERAL.ALT_ICON}/>
                <div ref={progressBarRef} className="add-new-vote__progress-step-bar">
                </div>
            </div>
                <div className="add-new-vote__general-settings-questions-block">
                    <div className={hideGeneralSettingMobile ? "add-new-vote__general-settings__mobile" : "add-new-vote__general-settings"}>
                        <h3 className="add-new-vote__title-select-org">{activeGeneralSettings ? constants.ADD_NEW_VOTE.ADD_NEW_VOTE_GENERAL_SETTINGS_TITLE : constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_SELECT_ORG}</h3>
                        <h3 className="add-new-vote__title-select-org-mobile">{activeGeneralSettings ? constants.ADD_NEW_VOTE.ADD_NEW_VOTE_GENERAL_SETTINGS_TITLE_MOBILE : constants.ADD_NEW_VOTE.ADD_NEW_VOTE_SELECT_ORG_STEP_MOBILE}</h3>
                        {hideSelectOrg && (
                                <>
                                    <div className="add-new-vote__select-role">
                                        <label className="add-new-vote__label">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_ORG}
                                            <span className="add-new-vote__red-star">*</span>
                                        </label>
                                        <div onClick={() => setActiveSelectOrg(!activeSelectOrg)} className="add-new-vote__time-zone-select-container">
                                            <p className="add-new-vote__time-zone-select-value">Выбранная нами организация</p>
                                            <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt={constants.GENERAL.ALT_ICON}/>
                                            <div className={activeSelectOrg ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                                <p className="add-new-vote__time-zone-option"></p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        {hideSelectOrgBtn && (
                                <>
                                    <div className="add-new-vote__button-block">
                                        <button onClick={onShowGeneralSettings} className="add-new-vote__button-next">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_NEXT_BTN}</button>
                                    </div>
                                </>
                            )}
                        {activeGeneralSettings && (
                            <>
                                <div className="add-new-vote__name-new-vote">
                                    <label className="add-new-vote__name-new-vote-label">{pathname === '/add-new-vote' ? constants.ADD_NEW_VOTE.ADD_NEW_VOTE_NAME_VOTING : constants.ADD_NEW_VOTE.ADD_TEMPLATES_NAME_TEMPLATE}
                                        <span className="add-new-vote__red-star">*</span></label>
                                    <input className="add-new-vote__name-new-vote-field"
                                           placeholder={pathname === '/add-new-vote' ? constants.ADD_NEW_VOTE.ADD_NEW_VOTE_NAME_VOTING_PLACEHOLDER : constants.ADD_NEW_VOTE.ADD_TEMPLATES_NAME_TEMPLATE_PLACEHOLDER}
                                    />
                                </div>
                                <div className="add-new-vote__select-open-close-vote-buttons">
                                    <div className="add-new-vote__close-vote-btn">
                                        <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_CLOSE_VOTING_BTN}</p>
                                    </div>
                                    <div className="add-new-vote__open-vote-btn">
                                        <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_OPEN_VOTING_BTN}</p>
                                    </div>
                                </div>
                                <div className="add-new-vote__select-role">
                                    <label className="add-new-vote__label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUORUM_CONDITION}
                                        <span className="add-new-vote__red-star">*</span>
                                    </label>
                                    <div onClick={() => setActiveSelectQuorum(!activeSelectQuorum)} className="add-new-vote__time-zone-select-container">
                                        <p className="add-new-vote__time-zone-select-value">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUORUM_ANY_NUMBERS}</p>
                                        <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                        <div className={activeSelectQuorum ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                            <p className="add-new-vote__time-zone-option">50% + 1</p>
                                            <p className="add-new-vote__time-zone-option">50%</p>
                                            <p className="add-new-vote__time-zone-option">2/3</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="add-new-vote__select-datetime-events-vote">
                                    <div className="add-new-vote__select-datetime">
                                        <label className="add-new-vote__select-datetime-label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_START_REG}<span className="add-new-vote__red-star">*</span></label>
                                        <input className="add-new-vote__select-datetime-field" type={"datetime-local"}/>
                                    </div>
                                    <div className="add-new-vote__select-datetime">
                                        <label className="add-new-vote__select-datetime-label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_END_REG}<span className="add-new-vote__red-star">*</span></label>
                                        <input className="add-new-vote__select-datetime-field" type={"datetime-local"}/>
                                    </div>
                                    <div className="add-new-vote__select-datetime">
                                        <label className="add-new-vote__select-datetime-label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_START_VOTE}<span className="add-new-vote__red-star">*</span></label>
                                        <input className="add-new-vote__select-datetime-field" type={"datetime-local"}/>
                                    </div>
                                    <div className="add-new-vote__select-datetime">
                                        <label className="add-new-vote__select-datetime-label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_END_VOTE}<span className="add-new-vote__red-star">*</span></label>
                                        <input className="add-new-vote__select-datetime-field" type={"datetime-local"}/>
                                    </div>
                                </div>
                                <div className="add-new-vote__checkboxes-block">
                                    <div className="add-new-vote__checkbox">
                                        <label className='add-new-vote__checkbox_container'>
                                            <input type="checkbox"/>
                                            <span className='add-new-vote__checkmark' />
                                        </label>
                                        <p className="add-new-vote__label-checkbox">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_POSSIBLE_CANCEL_ONLINE_REG}</p>
                                    </div>
                                    <div className="add-new-vote__checkbox">
                                        <label className='add-new-vote__checkbox_container'>
                                            <input type="checkbox"/>
                                            <span className='add-new-vote__checkmark'/>
                                        </label>
                                        <p className="add-new-vote__label-checkbox">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_POSSIBLE_CHANGE_VOTE}</p>
                                    </div>
                                </div>
                                <div className="add-new-vote__materials-vote-block">
                                    <AddNewVoteAddMaterialsVote
                                        constants={constants}
                                        nameMaterialsVote={constants.ADD_NEW_VOTE.ADD_MATERIALS_VOTE_TITLE}
                                    />
                                </div>
                                <h3 className="add-new-vote__title-select-org">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_SETTINGS_USERS}</h3>
                                <div className="add-new-vote__user-settings-open-close-btn">
                                    <div onClick={onShowCloseList} className={activeCloseList ? "add-new-vote__settings-button-close-open-list active" : "add-new-vote__settings-button-close-open-list"}>
                                        <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_CLOSE_LISTS}</p>
                                    </div>
                                    <div onClick={onShowOpenList} className={activeOpenList ? "add-new-vote__settings-button-close-open-list active" : "add-new-vote__settings-button-close-open-list"}>
                                        <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_OPEN_LISTS}</p>
                                    </div>
                                </div>
                                {activeCloseList && (
                                    <div className="add-new-vote__user-settings-add-users-group-block">
                                        <div className="add-new-vote__user-settings-add-users-group-btn">
                                            <div onClick={onShowSelectAddUsers} className={activeAddUsersBtn ? "add-new-vote__settings-button-add-users-group active" : "add-new-vote__settings-button-add-users-group"}>
                                                <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_USERS_BTN}</p>
                                            </div>
                                            <div onClick={onShowSelectAddGroup} className={activeAddGroupBtn ? "add-new-vote__settings-button-add-users-group active" : "add-new-vote__settings-button-add-users-group"}>
                                                <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_GROUP_BTN}</p>
                                            </div>
                                        </div>
                                        <div className="add-new-vote__select-role">
                                            <label className="add-new-vote__label">{activeAddGroupBtn ? `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_GROUP_USERS}` : `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_LIST_USERS}`}
                                            </label>
                                            <div onClick={() => setActiveSelectUserGroup(!activeSelectUsersGroup)} className="add-new-vote__time-zone-select-container">
                                                <p className="add-new-vote__time-zone-select-value"></p>
                                                <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                                <div className={activeSelectUsersGroup ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                                    <p className="add-new-vote__time-zone-option"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="add-new-vote__weight-voting-checkbox">
                                            <div className="add-new-vote__checkbox">
                                                <label className='add-new-vote__checkbox_container'>
                                                    <input type="checkbox"/>
                                                    <span className='add-new-vote__checkmark' />
                                                </label>
                                                <p className="add-new-vote__label-checkbox">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ALLOW_JOIN_LINK_VOTE}</p>
                                            </div>
                                            <div className="add-new-vote__checkbox">
                                                <label className='add-new-vote__checkbox_container'>
                                                    <input type="checkbox"/>
                                                    <span className='add-new-vote__checkmark' />
                                                </label>
                                                <p className="add-new-vote__label-checkbox">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_WEIGHT_VOTE}</p>
                                            </div>
                                        </div>
                                        {activeAddGroupBtn && (
                                       <AddNewVoteExpandList
                                           constants={constants}
                                       />
                                        )}
                                       <div className="add-new-vote__top-pagination">
                                            {/*<PaginationBlock/>   */}
                                           Верхнняя пагинация
                                       </div>
                                        <div className="add-new-vote__list-users-table">
                                            <div className="add-new-vote__list-users-table-header">
                                                <p className="add-new-vote__list-users-table-header-username">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_USERNAME_TABLE}</p>
                                                <p className="add-new-vote__list-users-table-header-weight-vote">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_WEIGHT_VOTE_TABLE}</p>
                                                <p className="add-new-vote__list-users-table-header-action">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ACTION_TABLE}</p>
                                            </div>
                                            <div className="add-new-vote__list-users-table-row">
                                                <div className="add-new-vote__table-row-username-email">
                                                    <p className="add-new-vote__table-row-username">Тимошина Мария Владимировна</p>
                                                    <p className="add-new-vote__table-row-email">anyauskowa@yandex.ru</p>
                                                </div>
                                                <div className="add-new-vote__table-row-count">
                                                    <p className="add-new-vote__table-row-count-weight-mobile">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_WEIGHT_VOTE_TABLE}</p>
                                                    <img className="add-new-vote__table-row-count-minus" src={iconMinusTable} alt={constants.GENERAL.ALT_ICON}/>
                                                    <p className="add-new-vote__table-row-count-number">3</p>
                                                    <img className="add-new-vote__table-row-count-plus" src={iconPlusTable} alt={constants.GENERAL.ALT_ICON}/>
                                                </div>
                                                <div className="add-new-vote__table-row-action">
                                                    <img className="add-new-vote__table-row-action-icon-delete" src={iconDeleteTable} alt={constants.GENERAL.ALT_ICON}/>
                                                    <p className="add-new-vote__table-row-action-delete">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_DELETE_BTN_TABLE}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="add-new-vote__bottom-pagination">
                                            {/*<PaginationBlock/>   */}
                                            Нижняя пагинация
                                        </div>
                                    </div>
                                )}
                                {activeOpenList && (
                                    <div className="add-new-vote__open-list-block">
                                        <label className="add-new-vote__open-list-label-input">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_MAX_NUMBERS_MEMBERS}</label>
                                        <input className="add-new-vote__open-list-input" placeholder={'1'} type={"number"} min={1} max={9999} step={1}/>
                                        <label className="add-new-vote__open-list-info">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_AFTER_CREATE_VOTE_AVAILABLE_LINK}</label>
                                    </div>
                                )}
                                <AddNewVoteAddObserversCountingMembers constants={constants} titleObserversCountingMembers={constants.ADD_NEW_VOTE.ADD_OBSERVERS_TITLE_OBSERVER}/>
                                <AddNewVoteAddObserversCountingMembers constants={constants} titleObserversCountingMembers={constants.ADD_NEW_VOTE.ADD_OBSERVERS_TITLE_COUNTING_MEMBERS}/>
                            </>
                            )}
                    </div>
                    {activeQuestionBlock && (
                        <div className="add-new-vote__questions-block">
                                {/*<AddNewVoteCreatedQuestion constants={constants}/>*/}
                            <div className="add-new-vote__questions">
                                <h3 className="add-new-vote__title-questions">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_TITLE}</h3>
                                    <h3 className="add-new-vote__title-questions-mobile">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_TITLE_MOBILE}</h3>
                                        <div onClick={() => onShowSelectTypeQuestion()} className={activeTypeQuestionBnt ? "add-new-vote__add-question-button hidden" : "add-new-vote__add-question-button"}>
                                            <div className="add-new-vote__icon-bnt-block">
                                                <img src={iconAddQuestionPlus} className="add-new-vote__icon-add-question-bnt" alt={constants.GENERAL.ALT_ICON}/>
                                                <p className="add-new-vote__add-question-label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_QUESTION_BTN}</p>
                                            </div>
                                        </div>
                                        <div className={activeTypeQuestionBnt ? "add-new-vote__select-type-questions active" : "add-new-vote__select-type-questions"}>
                                            {typeQuestionButtons.map((item, i) => {
                                                return (
                                                    <div onClick={() => onGetTypeQuestionBtn(item.nameBtn, item.typeQuestion, setActiveModalTypeQuestion(true))} key={i} className={item.classNameBtn}>
                                                        {item.nameBtn}
                                                    </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                        </div>
                    )}
                </div>
                <AddNewVoteQuestionType
                    activeModalTypeQuestion={activeModalTypeQuestion}
                    setActiveModalTypeQuestion={setActiveModalTypeQuestion}
                    constants={constants}
                    selectedTypeQuestionBtn={selectedTypeQuestionBtn}
                    setSelectedTypeQuestionBtn={setSelectedTypeQuestionBtn}
                    typeQuestionButtons={typeQuestionButtons}
                />
            {activeTypeQuestionBnt && (
                <div className="add-new-vote__add-question-button-mobile">
                    <img className="add-new-vote__add-question-button-mobile-icon" src={iconAddQuestionPlusGreen} alt={constants.GENERAL.ALT_ICON}/>
                    <h3 className="add-new-vote__add-question-button-mobile-title">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_ANOTHER_QUESTION_BTN}</h3>
                </div>
            )}
            {activeAddVoteBtn && (
                <div className="add-new-vote__add-vote-button-block">
                    <button className="add-new-vote-question-type__add-vote-btn">{pathname === '/add-new-vote' ? constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_VOTE_BTN : constants.ADD_NEW_VOTE.ADD_TEMPLATES_SAVE_TEMPLATE_BTN}</button>
                    {pathname === '/add-new-vote' ? <button className="add-new-vote-question-type__save-template-btn">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_SAVE_AS_TEMPLATE_BTN}</button> : null}
                    <p className="add-new-vote-question-type__add-vote-btn-error">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ERROR_MESSAGE}</p>
                </div>
            )}
            {activeButtonGoQuestionsBlock && (
                <div className="add-new-vote-question__go-question-block">
                    <button onClick={onButtonGoQuestionBlock} className="add-new-vote-question__go-question-block-button">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_NEXT_GO_TO_QUESTION_BLOCK}</button>
                </div>
            )}
        </div>
    )}
export default AddNewVote;