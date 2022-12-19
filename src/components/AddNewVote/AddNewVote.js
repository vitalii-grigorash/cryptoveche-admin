import React, { useEffect, useRef, useState } from "react";
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
// import iconThreeStep from "../../img/AddNewVoteIconThreeStep.svg";
import iconOneStepGreen from "../../img/AddNewVoteIconOneStep.svg";
import iconTwoStepGreen from "../../img/AddNewVoteIconTwoGreenStep.svg";
import iconThreeStepGreen from "../../img/AddNewVoteIconThreeGreenStep.svg";
// import PaginationBlock from "../PaginationBlock/PaginationBlock";
import AddNewVoteAddObserversCountingMembers from "../AddNewVoteAddObserversCountingMembers/AddNewVoteAddObserversCountingMembers";
import AddNewVoteExpandList from "../AddNewVoteExpandList/AddNewVoteExpandList";
// import orgSearchIconMobile from "../../img/PaginationSearchIcon.svg";
import AddMaterials from "../AddMaterials/AddMaterials";
// import AddNewVoteCreatedQuestion from "../AddNewVoteCreatedQuestion/AddNewVoteCreatedQuestion";
import * as Organizations from '../../Api/Organizations';
import { Validation } from '../../utils/Validation';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const AddNewVote = (props) => {

    const {
        constants,
        requestHelper,
    } = props;

    const eventTitle = Validation();
    const currentUser = React.useContext(CurrentUserContext);
    const [activeGeneralSettings, setActiveGeneralSettings] = useState(false);
    const [activeQuestionBlock, setActiveQuestionBlock] = useState(false);
    const [activeAddVoteBtn, setActiveAddVoteBtn] = useState(false);
    const [activeButtonGoQuestionsBlock, setActiveButtonGoQuestionsBlock] = useState(false);
    const [hideGeneralSettingMobile, setHideGeneralSettingMobile] = useState(false);
    const [hideSelectOrg, setHideSelectOrg] = useState(true);
    const [hideSelectOrgBtn, setHideSelectOrgBnt] = useState(false);
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
    const [orgList, setOrgList] = useState([]);
    const [selectedOrgTitle, setSelectedOrgTitle] = useState(constants.ADD_NEW_VOTE.SELECT_ORG);
    const [selectedOrg, setSelectedOrg] = useState({});
    const [currentOrg, setCurrentOrg] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventQuorum, setEventQuorum] = useState('');
    const [selectedQuorumText, setSelectedQuorumText] = useState('');
    const [registrationStartTime, setRegistrationStartTime] = useState('');
    const [registrationEndTime, setRegistrationEndTime] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [reRegistration, setReRegistration] = useState(false);
    const [reVoting, setReVoting] = useState(false);
    const [skipReg, setSkipReg] = useState(false);
    const [eventMaterials, setEventMaterials] = useState([]);

    const typeQuestionButtons = [
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_YNQ}`, classNameBtn: "add-new-vote__select-type-vote-ynq", typeQuestion: "ynq" },
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_NONE}`, classNameBtn: "add-new-vote__select-type-vote-none", typeQuestion: "none" },
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_POSITION_SINGLE}`, classNameBtn: "add-new-vote__select-type-vote-position_single", typeQuestion: "positionSingle" },
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_GRID}`, classNameBtn: "add-new-vote__select-type-vote-grid", typeQuestion: "grid" },
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_RADIO_GRID}`, classNameBtn: "add-new-vote__select-type-vote-radio_grid", typeQuestion: "radioGrid" },
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_POSITION_MULTIPLE}`, classNameBtn: "add-new-vote__select-type-vote-position_multiple", typeQuestion: "positionMultiple" },
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_SAME_POSITIONS}`, classNameBtn: "add-new-vote__select-type-vote-same_positions", typeQuestion: "samePositions" }
    ];

    useEffect(() => {
        requestHelper(Organizations.getUserOrganizations)
            .then((data) => {
                setOrgList(data);
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }, [])

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

    function addEmptyMaterial() {
        // link
        // doc
        const material = {
            id: idGenerate(eventMaterials),
            title: "",
            type: "link",
            value: "",
            isFileSelected: false
        }
        setEventMaterials([...eventMaterials, material]);
    }

    function changeMaterialType(id, type, isEvent) {
        if (isEvent) {
            const foundedMaterial = eventMaterials.find(el => el.id === id);
            const filteredArray = eventMaterials.filter(el => el.id !== id);
            foundedMaterial.type = type;
            filteredArray.push(foundedMaterial);
            setEventMaterials(filteredArray);
        }
    }

    function handleCancelReg() {
        if (reRegistration) {
            setReRegistration(false);
        } else {
            setReRegistration(true);
        }
    }

    function handleChangeVote() {
        if (reVoting) {
            setReVoting(false);
        } else {
            setReVoting(true);
        }
    }

    function handleSkipRegistration() {
        if (skipReg) {
            setSkipReg(false);
            setReRegistration(currentOrg.config.event.default_re_registration);
        } else {
            setSkipReg(true);
            setReRegistration(false);
        }
    }

    function registrationStartTimeChange(evt) {
        setRegistrationStartTime(evt.target.value);
    }

    function registrationEndTimeChange(evt) {
        setRegistrationEndTime(evt.target.value);
    }

    function eventStartTimeChange(evt) {
        setEventStartTime(evt.target.value);
    }

    function eventEndTimeChange(evt) {
        setEventEndTime(evt.target.value);
    }

    function onSecretTypeClick() {
        setEventType('secret');
    }

    function onOpenTypeClick() {
        setEventType('open');
    }

    function eventQuorumChange(quorum) {
        setEventQuorum(quorum);
    }

    useEffect(() => {
        if (eventQuorum === '0') {
            setSelectedQuorumText(constants.ORG_SETTINGS.QUORUM_ANY_VALUE);
        } else if (eventQuorum === '51') {
            setSelectedQuorumText('50% + 1');
        } else if (eventQuorum === '50') {
            setSelectedQuorumText('50%');
        } else if (eventQuorum === '66') {
            setSelectedQuorumText('2/3');
        }
        // eslint-disable-next-line
    }, [eventQuorum])

    function selectOrg(org) {
        setSelectedOrgTitle(org.title);
        setSelectedOrg(org);
        setHideSelectOrgBnt(true);
    }

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

    function datePlus(date) {
        const defaultDate = new Date(date);
        const datePlus = defaultDate.setHours(defaultDate.getHours() + 4);
        const newDate = new Date(datePlus);
        return newDate.toISOString().slice(0, 16)
    }

    function datePlusRegStart(date) {
        const defaultDate = new Date(date);
        const datePlus = defaultDate.setHours(defaultDate.getHours() + 3);
        const newDate = new Date(datePlus);
        return newDate.toISOString().slice(0, 16);
    }

    const onShowGeneralSettings = () => {
        const date = new Date();
        const regStart = datePlusRegStart(date);
        const regEnd = datePlus(regStart);
        const eventStart = datePlus(regEnd);
        const eventEnd = datePlus(eventStart);
        setRegistrationStartTime(regStart);
        setRegistrationEndTime(regEnd);
        setEventStartTime(eventStart);
        setEventEndTime(eventEnd);

        const body = {
            id: selectedOrg.id
        }

        requestHelper(Organizations.getOrganization, body)
            .then((org) => {
                console.log(org);
                setCurrentOrg(org);
                setEventType(org.config.event.default_type);
                setEventQuorum(org.config.event.default_quorum);
                setReRegistration(org.config.event.default_re_registration);
                setReVoting(org.config.event.default_re_voting);
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
            })
            .catch((err) => {
                throw new Error(err.message);
            })
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
        setSelectedTypeQuestionBtn({ nameQuestion, typeQuestion });
    }

    function votersValidate() {
        console.log('Все ок!');
        return true;
    }

    function compareDate(firstDate, secondDate, isSoft) {
        return isSoft ? (firstDate <= secondDate) : (firstDate < secondDate);
    }

    function dateValidate(date) {
        if (!compareDate(date.regStart, date.regEnd, false)) {
            setErrorMessage(constants.ADD_NEW_VOTE.COMPARE_RS_RE);
            return false;
        } else if (!compareDate(date.eventStart, date.eventEnd, false)) {
            setErrorMessage(constants.ADD_NEW_VOTE.COMPARE_ES_EE);
            return false;
        } else if (!compareDate(date.regEnd, date.eventEnd, true)) {
            setErrorMessage(constants.ADD_NEW_VOTE.COMPARE_RE_EE);
            return false;
        } else if (!compareDate(date.regStart, date.eventEnd, false)) {
            setErrorMessage(constants.ADD_NEW_VOTE.COMPARE_EE_RS);
            return false;
        } else if (!compareDate(date.regStart, date.eventStart, true)) {
            setErrorMessage(constants.ADD_NEW_VOTE.COMPARE_ES_RS);
            return false;
        } else {
            setErrorMessage('');
            return votersValidate();
        }
    }

    function eventValidation(date) {
        if (eventTitle.value !== '') {
            setErrorMessage('');
            return dateValidate(date);
        } else {
            setErrorMessage(constants.ADD_NEW_VOTE.EVENT_NAME_ERR);
            return false;
        }
    }

    function addEvent() {

        const date = {
            createdDate: new Date(),
            regStart: new Date(registrationStartTime),
            regEnd: new Date(registrationEndTime),
            eventStart: new Date(eventStartTime),
            eventEnd: new Date(eventEndTime),
        }

        const combinedDate = {
            createdDate: new Date(),
            regStart: new Date(eventStartTime),
            regEnd: new Date(eventEndTime),
            eventStart: new Date(eventStartTime),
            eventEnd: new Date(eventEndTime),
        }

        const dateForSend = skipReg === true || currentOrg.config.event.combined_time === true ? combinedDate : date;

        const isEventValid = eventValidation(dateForSend);

        if (isEventValid) {
            const body = {
                template_title: eventTitle.value,
                title: eventTitle.value,
                registration_start_time: `${dateForSend.regStart.toISOString().split('.')[0] + 'Z'}`,
                registration_end_time: `${dateForSend.regEnd.toISOString().split('.')[0] + 'Z'}`,
                event_start_time: `${dateForSend.eventStart.toISOString().split('.')[0] + 'Z'}`,
                event_end_time: `${dateForSend.eventEnd.toISOString().split('.')[0] + 'Z'}`,
                re_registration: reRegistration,
                re_voting: reVoting,
                observers: ["vitalii.grigorash@yandex.ru"],
                counters: ["vitalii.grigorash@yandex.ru"],
                voters: ["vitalii.grigorash@gmail.com"],
                evoters: [],
                type: eventType,
                quorum: eventQuorum,
                quorum_type: "voting",
                materials: [],
                questions: [{
                    template: "ynq",
                    title: "Простой вопрос",
                    options: {
                        rows: [
                            { value: "За" },
                            { value: "Против" },
                            { value: "Воздержаться" }
                        ],
                        columns: []
                    },
                    materials: [],
                    is_required_grid_rows: false,
                    rules: {
                        pick_eq: 1,
                        pick_lt: -1,
                        pick_gt: -1,
                        pick_le: -1,
                        pick_ge: -1
                    }
                }],
                report_sign: [],
                owner: {
                    user_id: currentUser.id,
                    org_id: currentOrg.id
                },
                is_voters_expandable: false,
                onButton: skipReg,
                max_slots: 50000,
                signed: false,
                save_as_template: false,
                weights: [],
                created_date: `${dateForSend.createdDate.toISOString().split('.')[0] + 'Z'}`,
                users_groups: { group_name: {} }
            }
            console.log(body);
        }
    }

    function saveTemplate() {
        console.log('saveTemblate');
    }

    return (
        <div id={'addNewVoteWight'} className="add-new-vote__container _container">
            <GeneralTitleAllPages
                titleName={pathname === '/add-new-vote' ? constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_ADD_VOTE : constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_ADD_TEMPLATES_VOTE}
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={pathname === '/add-new-vote' ? constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_ADD_VOTE : constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_ADD_TEMPLATES_VOTE}
            />
            <p className={activeGeneralSettings ? "add-new-vote__current-name-org active" : "add-new-vote__current-name-org"}>{currentOrg.title}</p>
            <div className="add-new-vote__progress-step">
                <img src={activeCompleteOneStep ? iconCompleteStep : iconOneStepGreen} className="add-new-vote__progress-one-step" alt={constants.GENERAL.ALT_ICON} />
                <img src={activeCompleteTwoStep.toString()} className="add-new-vote__progress-two-step" alt={constants.GENERAL.ALT_ICON} />
                <img src={activeCompleteThreeStep.toString()} className="add-new-vote__progress-three-step" alt={constants.GENERAL.ALT_ICON} />
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
                                    <span className="add-new-vote__red-star"> *</span>
                                </label>
                                <div onClick={() => setActiveSelectOrg(!activeSelectOrg)} className="add-new-vote__time-zone-select-container">
                                    <p className="add-new-vote__time-zone-select-value">{selectedOrgTitle}</p>
                                    <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt={constants.GENERAL.ALT_ICON} />
                                    <div className={activeSelectOrg ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                        {orgList.map((org) => (
                                            <div className={`add-new-vote__time-zone-option-container ${org.settings.inactive && 'add-new-vote__time-zone-option-container_disabler'}`} key={org.id}>
                                                {org.settings.inactive ? (
                                                    <p className="add-new-vote__time-zone-option">{org.title}</p>
                                                ) : (
                                                    <p className="add-new-vote__time-zone-option" onClick={() => selectOrg(org)}>{org.title}</p>
                                                )}
                                            </div>
                                        ))}
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
                                    <span className="add-new-vote__red-star"> *</span></label>
                                <input
                                    type="text"
                                    className="add-new-vote__name-new-vote-field"
                                    placeholder={pathname === '/add-new-vote' ? constants.ADD_NEW_VOTE.ADD_NEW_VOTE_NAME_VOTING_PLACEHOLDER : constants.ADD_NEW_VOTE.ADD_TEMPLATES_NAME_TEMPLATE_PLACEHOLDER}
                                    name="event-title"
                                    value={eventTitle.value}
                                    onChange={eventTitle.onChange}
                                />
                            </div>
                            {currentOrg.config.event.show_type && (
                                <div className="add-new-vote__select-open-close-vote-buttons">
                                    <div className={`add-new-vote__close-vote-btn ${eventType === 'secret' && "add-new-vote__close-vote-btn_active"}`} onClick={onSecretTypeClick}>
                                        <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_CLOSE_VOTING_BTN}</p>
                                    </div>
                                    <div className={`add-new-vote__open-vote-btn ${eventType === 'open' && "add-new-vote__open-vote-btn_active"}`} onClick={onOpenTypeClick}>
                                        <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_OPEN_VOTING_BTN}</p>
                                    </div>
                                </div>
                            )}
                            {currentOrg.config.event.quorum && (
                                <div className="add-new-vote__select-role">
                                    <label className="add-new-vote__label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUORUM_CONDITION}
                                        <span className="add-new-vote__red-star">*</span>
                                    </label>
                                    <div onClick={() => setActiveSelectQuorum(!activeSelectQuorum)} className="add-new-vote__time-zone-select-container">
                                        <p className="add-new-vote__time-zone-select-value">{selectedQuorumText}</p>
                                        <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню" />
                                        <div className={activeSelectQuorum ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                            <div className="add-new-vote__time-zone-option-container" onClick={() => eventQuorumChange('51')}>
                                                <p className="add-new-vote__time-zone-option">50% + 1</p>
                                            </div>
                                            <div className="add-new-vote__time-zone-option-container" onClick={() => eventQuorumChange('50')}>
                                                <p className="add-new-vote__time-zone-option">50%</p>
                                            </div>
                                            <div className="add-new-vote__time-zone-option-container" onClick={() => eventQuorumChange('66')}>
                                                <p className="add-new-vote__time-zone-option">2/3</p>
                                            </div>
                                            <div className="add-new-vote__time-zone-option-container" onClick={() => eventQuorumChange('0')}>
                                                <p className="add-new-vote__time-zone-option">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUORUM_ANY_NUMBERS}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="add-new-vote__select-datetime-events-vote">
                                {!skipReg ? (
                                    <>
                                        {!currentOrg.config.event.combined_time ? (
                                            <>
                                                <div className="add-new-vote__select-datetime">
                                                    <label className="add-new-vote__select-datetime-label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_START_REG}<span className="add-new-vote__red-star"> *</span></label>
                                                    <input
                                                        className="add-new-vote__select-datetime-field"
                                                        type="datetime-local"
                                                        onChange={registrationStartTimeChange}
                                                        value={registrationStartTime}
                                                    />
                                                </div>
                                                <div className="add-new-vote__select-datetime">
                                                    <label className="add-new-vote__select-datetime-label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_END_REG}<span className="add-new-vote__red-star"> *</span></label>
                                                    <input
                                                        className="add-new-vote__select-datetime-field"
                                                        type="datetime-local"
                                                        onChange={registrationEndTimeChange}
                                                        value={registrationEndTime}
                                                    />
                                                </div>
                                                <div className="add-new-vote__select-datetime">
                                                    <label className="add-new-vote__select-datetime-label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_START_VOTE}<span className="add-new-vote__red-star"> *</span></label>
                                                    <input
                                                        className="add-new-vote__select-datetime-field"
                                                        type="datetime-local"
                                                        onChange={eventStartTimeChange}
                                                        value={eventStartTime}
                                                    />
                                                </div>
                                                <div className="add-new-vote__select-datetime">
                                                    <label className="add-new-vote__select-datetime-label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_END_VOTE}<span className="add-new-vote__red-star"> *</span></label>
                                                    <input
                                                        className="add-new-vote__select-datetime-field"
                                                        type="datetime-local"
                                                        onChange={eventEndTimeChange}
                                                        value={eventEndTime}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="add-new-vote__select-datetime">
                                                    <label className="add-new-vote__select-datetime-label">{constants.ADD_NEW_VOTE.START_REG_AND_VOTE}<span className="add-new-vote__red-star"> *</span></label>
                                                    <input
                                                        className="add-new-vote__select-datetime-field"
                                                        type="datetime-local"
                                                        onChange={eventStartTimeChange}
                                                        value={eventStartTime}
                                                    />
                                                </div>
                                                <div className="add-new-vote__select-datetime">
                                                    <label className="add-new-vote__select-datetime-label">{constants.ADD_NEW_VOTE.END_REG_AND_VOTE}<span className="add-new-vote__red-star"> *</span></label>
                                                    <input
                                                        className="add-new-vote__select-datetime-field"
                                                        type="datetime-local"
                                                        onChange={eventEndTimeChange}
                                                        value={eventEndTime}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="add-new-vote__select-datetime">
                                            <label className="add-new-vote__select-datetime-label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_START_VOTE}<span className="add-new-vote__red-star"> *</span></label>
                                            <input
                                                className="add-new-vote__select-datetime-field"
                                                type="datetime-local"
                                                onChange={eventStartTimeChange}
                                                value={eventStartTime}
                                            />
                                        </div>
                                        <div className="add-new-vote__select-datetime">
                                            <label className="add-new-vote__select-datetime-label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_END_VOTE}<span className="add-new-vote__red-star"> *</span></label>
                                            <input
                                                className="add-new-vote__select-datetime-field"
                                                type="datetime-local"
                                                onChange={eventEndTimeChange}
                                                value={eventEndTime}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="add-new-vote__checkboxes-block">
                                {!skipReg && (
                                    <>
                                        {currentOrg.config.event.re_registration && (
                                            <div className="add-new-vote__checkbox-container" onClick={handleCancelReg}>
                                                <div className={`add-new-vote__checkbox ${reRegistration && 'add-new-vote__checkbox_active'}`} />
                                                <p className="add-new-vote__checkbox-text">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_POSSIBLE_CANCEL_ONLINE_REG}</p>
                                            </div>
                                        )}
                                    </>
                                )}
                                {currentOrg.config.event.re_voting && (
                                    <div className="add-new-vote__checkbox-container" onClick={handleChangeVote}>
                                        <div className={`add-new-vote__checkbox ${reVoting && 'add-new-vote__checkbox_active'}`} />
                                        <p className="add-new-vote__checkbox-text">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_POSSIBLE_CHANGE_VOTE}</p>
                                    </div>
                                )}
                                <div className="add-new-vote__checkbox-container" onClick={handleSkipRegistration}>
                                    <div className={`add-new-vote__checkbox ${skipReg && 'add-new-vote__checkbox_active'}`} />
                                    <p className="add-new-vote__checkbox-text">{constants.ADD_NEW_VOTE.SKIP_REG}</p>
                                </div>
                            </div>
                            <AddMaterials
                                constants={constants}
                                eventMaterials={eventMaterials}
                                isEvent={true}
                                addEmptyMaterial={addEmptyMaterial}
                                changeMaterialType={changeMaterialType}
                            />
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
                                            <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню" />
                                            <div className={activeSelectUsersGroup ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                                <p className="add-new-vote__time-zone-option"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="add-new-vote__weight-voting-checkbox">
                                        <div className="add-new-vote__checkbox-container">
                                            <div className="add-new-vote__checkbox" />
                                            <p className="add-new-vote__checkbox-text">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ALLOW_JOIN_LINK_VOTE}</p>
                                        </div>
                                        <div className="add-new-vote__checkbox-container">
                                            <div className="add-new-vote__checkbox" />
                                            <p className="add-new-vote__checkbox-text">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_WEIGHT_VOTE}</p>
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
                                                <img className="add-new-vote__table-row-count-minus" src={iconMinusTable} alt={constants.GENERAL.ALT_ICON} />
                                                <p className="add-new-vote__table-row-count-number">3</p>
                                                <img className="add-new-vote__table-row-count-plus" src={iconPlusTable} alt={constants.GENERAL.ALT_ICON} />
                                            </div>
                                            <div className="add-new-vote__table-row-action">
                                                <img className="add-new-vote__table-row-action-icon-delete" src={iconDeleteTable} alt={constants.GENERAL.ALT_ICON} />
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
                                    <input className="add-new-vote__open-list-input" placeholder={'1'} type={"number"} min={1} max={9999} step={1} />
                                    <label className="add-new-vote__open-list-info">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_AFTER_CREATE_VOTE_AVAILABLE_LINK}</label>
                                </div>
                            )}
                            <AddNewVoteAddObserversCountingMembers constants={constants} titleObserversCountingMembers={constants.ADD_NEW_VOTE.ADD_OBSERVERS_TITLE_OBSERVER} />
                            <AddNewVoteAddObserversCountingMembers constants={constants} titleObserversCountingMembers={constants.ADD_NEW_VOTE.ADD_OBSERVERS_TITLE_COUNTING_MEMBERS} />
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
                                    <img src={iconAddQuestionPlus} className="add-new-vote__icon-add-question-bnt" alt={constants.GENERAL.ALT_ICON} />
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
                eventMaterials={eventMaterials}
                addEmptyMaterial={addEmptyMaterial}
                changeMaterialType={changeMaterialType}
            />
            {activeTypeQuestionBnt && (
                <div className="add-new-vote__add-question-button-mobile">
                    <img className="add-new-vote__add-question-button-mobile-icon" src={iconAddQuestionPlusGreen} alt={constants.GENERAL.ALT_ICON} />
                    <h3 className="add-new-vote__add-question-button-mobile-title">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_ANOTHER_QUESTION_BTN}</h3>
                </div>
            )}
            {activeAddVoteBtn && (
                <>
                    {pathname === '/add-new-vote' ? (
                        <div className="add-new-vote__add-vote-button-block">
                            <button onClick={addEvent} className="add-new-vote-question-type__add-vote-btn">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_VOTE_BTN}</button>
                            <button
                                className="add-new-vote-question-type__save-template-btn"
                                onClick={saveTemplate}
                            >
                                {constants.ADD_NEW_VOTE.ADD_NEW_VOTE_SAVE_AS_TEMPLATE_BTN}
                            </button>
                            <p className="add-new-vote-question-type__add-vote-btn-error">{errorMessage}</p>
                        </div>
                    ) : (
                        <div className="add-new-vote__add-vote-button-block">
                            <button onClick={saveTemplate} className="add-new-vote-question-type__add-vote-btn">{constants.ADD_NEW_VOTE.ADD_TEMPLATES_SAVE_TEMPLATE_BTN}</button>
                        </div>
                    )}
                </>
            )}
            {activeButtonGoQuestionsBlock && (
                <div className="add-new-vote-question__go-question-block">
                    <button onClick={onButtonGoQuestionBlock} className="add-new-vote-question__go-question-block-button">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_NEXT_GO_TO_QUESTION_BLOCK}</button>
                </div>
            )}
        </div>
    )
}

export default AddNewVote;
