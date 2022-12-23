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
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import AddNewVoteAddObserversCountingMembers from "../AddNewVoteAddObserversCountingMembers/AddNewVoteAddObserversCountingMembers";
import AddNewVoteExpandList from "../AddNewVoteExpandList/AddNewVoteExpandList";
// import orgSearchIconMobile from "../../img/PaginationSearchIcon.svg";
import AddMaterials from "../AddMaterials/AddMaterials";
// import AddNewVoteCreatedQuestion from "../AddNewVoteCreatedQuestion/AddNewVoteCreatedQuestion";
import * as Organizations from '../../Api/Organizations';
import * as AddEvent from '../../Api/AddEvent';
import { Validation } from '../../utils/Validation';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const AddNewVote = (props) => {

    const {
        constants,
        requestHelper,
    } = props;

    const eventTitle = Validation();
    const votersListSearch = Validation();
    const currentUser = React.useContext(CurrentUserContext);
    const [votersListForRender, setVotersListForRender] = useState([]);
    const [votersListSearchInput, setVotersListSearchInput] = useState('');
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(5);
    const [result, setResult] = useState(5);
    const [pageCount, setPageCount] = useState(1);
    const [selectedResultsShow, setSelectedResultsShow] = useState(5);
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
    const [activeAddUsersBtn, setActiveAddUsersBtn] = useState(true);
    const [activeAddGroupBtn, setActiveAddGroupBnt] = useState(false);
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
    const [isLinkUsersActive, setLinkUsersActive] = useState(false);
    const [isWeightActive, setWeightActive] = useState(false);
    const [votersList, setVotersList] = useState([]);
    const [usersListForSelect, setUsersListForSelect] = useState([]);
    const [groupsListForSelect, setGroupsListForSelect] = useState([]);
    const [isUsersDropDownActive, setUsersDropDownActive] = useState(false);
    const [isGroupsDropDownActive, setGroupsDropDownActive] = useState(false);
    const [usersSelectedValue, setUsersSelectedValue] = useState(constants.ADD_NEW_VOTE.SELECT_LIST_USERS);
    const [groupSelectedValue, setGroupSelectedValue] = useState(constants.ADD_NEW_VOTE.SELECT_LIST_GROUP);
    const [isExpandListActive, setExpandListActive] = useState(false);
    const typeQuestionButtons = [
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_YNQ}`, classNameBtn: "add-new-vote__select-type-vote-ynq", typeQuestion: "ynq" },
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_NONE}`, classNameBtn: "add-new-vote__select-type-vote-none", typeQuestion: "none" },
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_POSITION_SINGLE}`, classNameBtn: "add-new-vote__select-type-vote-position_single", typeQuestion: "positionSingle" },
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_GRID}`, classNameBtn: "add-new-vote__select-type-vote-grid", typeQuestion: "grid" },
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_RADIO_GRID}`, classNameBtn: "add-new-vote__select-type-vote-radio_grid", typeQuestion: "radioGrid" },
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_POSITION_MULTIPLE}`, classNameBtn: "add-new-vote__select-type-vote-position_multiple", typeQuestion: "positionMultiple" },
        { nameBtn: `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_QUESTION_SAME_POSITIONS}`, classNameBtn: "add-new-vote__select-type-vote-same_positions", typeQuestion: "samePositions" }
    ];

    function handleOpenExpandList() {
        if (isExpandListActive) {
            setExpandListActive(false);
        } else {
            setExpandListActive(true);
        }
    }

    function handleShowResultsFrom(value) {
        setShowResultsFrom(value);
    }

    function handleResultsShow(value) {
        setResultsShow(value);
    }

    function showPrevResults() {
        if (resultsShow <= result) {
            return
        } else {
            setShowResultsFrom(showResultsFrom - result);
            handleShowResultsFrom(showResultsFrom - result);
            setResultsShow(resultsShow - result);
            handleResultsShow(resultsShow - result);
            setPageCount(pageCount - 1);
        }
    }

    function showNextResults() {
        if (resultsShow >= votersListForRender.length) {
            return
        } else {
            setShowResultsFrom(0 + resultsShow);
            handleShowResultsFrom(0 + resultsShow);
            setResultsShow(result + resultsShow);
            handleResultsShow(result + resultsShow);
            setPageCount(pageCount + 1);
        }
    }

    function onChoiceClick(value) {
        setResultsShow(value);
        handleResultsShow(value);
        setResult(value);
        setSelectedResultsShow(value);
        setShowResultsFrom(0);
        handleShowResultsFrom(0);
        setPageCount(1);
    }

    function searchInput(value) {
        setVotersListSearchInput(value);
    }

    useEffect(() => {
        if (votersListSearchInput === '') {
            setVotersListForRender(votersList);
        } else {
            const dataForRender = [];
            votersList.forEach((user) => {
                if (user.email.toLowerCase().includes(votersListSearchInput.toLowerCase())) {
                    dataForRender.push(user);
                } else if (user.last_name.toLowerCase().includes(votersListSearchInput.toLowerCase())) {
                    dataForRender.push(user);
                } else if (user.first_name.toLowerCase().includes(votersListSearchInput.toLowerCase())) {
                    dataForRender.push(user);
                } else if (user.second_name.toLowerCase().includes(votersListSearchInput.toLowerCase())) {
                    dataForRender.push(user);
                }
            })
            setVotersListForRender(dataForRender);
        }
    },
        [
            votersListSearchInput,
            votersList
        ]
    );

    useEffect(() => {
        requestHelper(Organizations.getUserOrganizations)
            .then((data) => {
                setOrgList(data);
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }, [])

    function handleUsersDropDownActive() {
        if (isUsersDropDownActive) {
            setUsersDropDownActive(false);
        } else {
            setUsersDropDownActive(true);
        }
    }

    function handleGroupsDropDownActive() {
        if (isGroupsDropDownActive) {
            setGroupsDropDownActive(false);
        } else {
            setGroupsDropDownActive(true);
        }
    }

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
            valueLink: "",
            valueDoc: "",
            selectedFileName: constants.ADD_NEW_ORG.ADD_NEW_ORG_SELECT_FILE,
            isFileSelected: false
        }
        setEventMaterials([...eventMaterials, material]);
    }

    function deleteMaterial(id) {
        const filteredArray = eventMaterials.filter(el => el.id !== id);
        setEventMaterials(filteredArray);
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

    function linkInputChange(e, id) {
        const foundedEl = eventMaterials.find(el => el.id === id);
        const filteredArray = eventMaterials.filter(el => el.id !== id);
        foundedEl.valueLink = e.target.value
        filteredArray.push(foundedEl);
        setEventMaterials(filteredArray);
    }

    function titleInputChange(e, id) {
        const foundedEl = eventMaterials.find(el => el.id === id);
        const filteredArray = eventMaterials.filter(el => el.id !== id);
        foundedEl.title = e.target.value
        filteredArray.push(foundedEl);
        setEventMaterials(filteredArray);
    }

    function changeDocLink(id, fileName, link) {
        const foundedEl = eventMaterials.find(el => el.id === id);
        const filteredArray = eventMaterials.filter(el => el.id !== id);
        foundedEl.isFileSelected = true;
        foundedEl.selectedFileName = fileName;
        foundedEl.valueDoc = link;
        filteredArray.push(foundedEl);
        setEventMaterials(filteredArray);
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

    function increaseWeight(user) {
        const foundedUser = votersList.find(userFromList => userFromList.id === user.id);
        const filteredUsers = votersList.filter(userFromList => userFromList.id !== user.id);
        foundedUser.weight = foundedUser.weight + 1;
        filteredUsers.push(foundedUser);
        setVotersList(filteredUsers);
    }

    function decreaseWeight(user) {
        const foundedUser = votersList.find(userFromList => userFromList.id === user.id);
        const filteredUsers = votersList.filter(userFromList => userFromList.id !== user.id);
        foundedUser.weight = foundedUser.weight === 1 ? foundedUser.weight : foundedUser.weight - 1;
        filteredUsers.push(foundedUser);
        setVotersList(filteredUsers);
    }

    useEffect(() => {
        if (votersList.length === 0) {
            setUsersSelectedValue(constants.ADD_NEW_VOTE.SELECT_LIST_USERS);
            setGroupSelectedValue(constants.ADD_NEW_VOTE.SELECT_LIST_GROUP);
        }
        // eslint-disable-next-line
    }, [votersList.length])

    function deleteUserFromTable(user) {
        const filteredUsers = votersList.filter(userFromList => userFromList.id !== user.id);
        setVotersList(filteredUsers);
    }

    function addUsersFromExpandList(usersArr) {
        const users = votersList;
        setVotersList([]);
        usersArr.forEach((user) => {
            if ((votersList.find(userFromList => userFromList.id === user.id)) === undefined) {
                users.push(user);
            }
        })
        setVotersList(users);
    }

    function addUsersFromGroup(group) {
        setGroupSelectedValue(group.group_title);
        const users = votersList;
        group.users.forEach((user) => {
            if ((votersList.find(userFromList => userFromList.id === user.id)) === undefined) {
                if (user.last_name === undefined) {
                    const userToAdd = {
                        email: user.email,
                        first_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_FIRST_NAME}`,
                        id: user.id,
                        last_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_LAST_NAME}`,
                        second_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_SECOND_NAME}`,
                        weight: 1,
                        userFields: user.userFields
                    }
                    users.push(userToAdd);
                } else {
                    const userToAdd = {
                        email: user.email,
                        first_name: user.first_name,
                        id: user.id,
                        last_name: user.last_name,
                        second_name: user.second_name,
                        weight: 1,
                        userFields: user.userFields
                    }
                    users.push(userToAdd);
                }
            }
        })
        setVotersList(users);
    }

    function addUsersFromList(user) {
        setUsersSelectedValue(`${user.email} - ${user.last_name} ${user.first_name} ${user.second_name}`);
        const users = votersList;
        if ((votersList.find(userFromList => userFromList.id === user.id)) === undefined) {
            const userToAdd = {
                email: user.email,
                first_name: user.first_name,
                id: user.id,
                last_name: user.last_name,
                second_name: user.second_name,
                weight: 1,
                userFields: user.userFields
            }
            users.push(userToAdd);
        }
        setVotersList(users);
    }

    function addUsersForSelectFromGroups(orgUsers) {
        const users = orgUsers;
        const groups = [];
        if (selectedOrg.groupIds.length !== 0) {
            selectedOrg.groupIds.forEach((id) => {
                const body = {
                    groupId: id
                }
                requestHelper(AddEvent.getGroup, body)
                    .then((data) => {
                        groups.push(data);
                        data.users.forEach((user) => {
                            if ((orgUsers.find(orgUsers => orgUsers.id === user.id)) === undefined) {
                                if (user.last_name === undefined) {
                                    const userToAdd = {
                                        email: user.email,
                                        first_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_FIRST_NAME}`,
                                        id: user.id,
                                        last_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_LAST_NAME}`,
                                        second_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_SECOND_NAME}`,
                                        weight: 1,
                                        userFields: user.userFields
                                    }
                                    users.push(userToAdd);
                                } else {
                                    const userToAdd = {
                                        email: user.email,
                                        first_name: user.first_name,
                                        id: user.id,
                                        last_name: user.last_name,
                                        second_name: user.second_name,
                                        weight: 1,
                                        userFields: user.userFields
                                    }
                                    users.push(userToAdd);
                                }
                            }
                        })
                    })
                    .catch((err) => {
                        throw new Error(err.message);
                    })
            })
        }
        setUsersListForSelect(users);
        setGroupsListForSelect(groups);
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
                setCurrentOrg(org);
                const users = [];
                org.users.forEach((user) => {
                    if (user.last_name === undefined) {
                        const userToAdd = {
                            email: user.email,
                            first_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_FIRST_NAME}`,
                            id: user.id,
                            last_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_LAST_NAME}`,
                            second_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_SECOND_NAME}`,
                            weight: 1,
                            userFields: user.userFields
                        }
                        users.push(userToAdd);
                    } else {
                        const userToAdd = {
                            email: user.email,
                            first_name: user.first_name,
                            id: user.id,
                            last_name: user.last_name,
                            second_name: user.second_name,
                            weight: 1,
                            userFields: user.userFields
                        }
                        users.push(userToAdd);
                    }
                })
                addUsersForSelectFromGroups(users);
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

    function handleWeightActive() {
        if (isWeightActive) {
            setWeightActive(false);
        } else {
            setWeightActive(true);
        }
    }

    function showLinkUsers() {
        if (isLinkUsersActive) {
            setLinkUsersActive(false);
        } else {
            setLinkUsersActive(true);
        }
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
        setUsersDropDownActive(false);
        setGroupsDropDownActive(false);
    }

    const onShowSelectAddGroup = () => {
        setActiveAddUsersBtn(false);
        setActiveAddGroupBnt(true);
        setUsersDropDownActive(false);
        setGroupsDropDownActive(false);
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
        if (votersList.length === 0) {
            setErrorMessage(constants.ADD_NEW_VOTE.VOTERS_ERR);
            return false;
        } else {
            setErrorMessage('');
            return true;
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
            setErrorMessage(constants.ADD_NEW_VOTE.EVENT_MATERIALS_ERR);
            return false;
        } else {
            setErrorMessage('');
            return votersValidate();
        }
    }

    function compareDate(firstDate, secondDate, isSoft) {
        return isSoft ? (firstDate <= secondDate) : (firstDate < secondDate);
    }

    function dateValidate(date, materials) {
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
            return materialsValidate(materials);
        }
    }

    function eventValidation(date, materials) {
        if (eventTitle.value !== '') {
            setErrorMessage('');
            return dateValidate(date, materials);
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
        const materials = [];
        eventMaterials.forEach((material) => {
            if (material.type === "link") {
                const data = {
                    title: material.title,
                    type: material.type,
                    value: material.valueLink
                }
                materials.push(data);
            } else {
                const data = {
                    title: material.title,
                    type: material.type,
                    value: material.valueDoc
                }
                materials.push(data);
            }
        })
        const voters = [];
        const weights = [];
        votersList.forEach((user) => {
            const voter = {
                id: user.id,
                weight: user.weight
            }
            weights.push(voter);
            voters.push(user.id);
        })
        const dateForSend = skipReg === true || currentOrg.config.event.combined_time === true ? combinedDate : date;
        const isEventValid = eventValidation(dateForSend, materials);
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
                voters: voters,
                evoters: [],
                type: eventType,
                quorum: eventQuorum,
                quorum_type: "voting",
                materials: materials,
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
                weights: isWeightActive ? weights : [],
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
                        <div className="add-new-vote__button-block">
                            <button onClick={onShowGeneralSettings} className="add-new-vote__button-next">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_NEXT_BTN}</button>
                        </div>
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
                                linkInputChange={linkInputChange}
                                titleInputChange={titleInputChange}
                                changeDocLink={changeDocLink}
                                deleteMaterial={deleteMaterial}
                                requestHelper={requestHelper}
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
                                    {activeAddUsersBtn && (
                                        <div className="add-new-vote__select-role">
                                            <label className="add-new-vote__label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_LIST_USERS}</label>
                                            <div onClick={handleUsersDropDownActive} className="add-new-vote__time-zone-select-container">
                                                <p className="add-new-vote__time-zone-select-value">{usersSelectedValue}</p>
                                                <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt={constants.GENERAL.ALT_ICON} />
                                                <div className={isUsersDropDownActive ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                                    {usersListForSelect.map((user) => (
                                                        <div key={user.id} className="add-new-vote__time-zone-option-container" onClick={() => addUsersFromList(user)}>
                                                            <p className="add-new-vote__time-zone-option">{user.email} - {user.last_name} {user.first_name} {user.second_name}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeAddGroupBtn && (
                                        <div className="add-new-vote__select-role">
                                            <label className="add-new-vote__label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_GROUP_USERS}</label>
                                            <div onClick={handleGroupsDropDownActive} className="add-new-vote__time-zone-select-container">
                                                <p className="add-new-vote__time-zone-select-value">{groupSelectedValue}</p>
                                                <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt={constants.GENERAL.ALT_ICON} />
                                                <div className={isGroupsDropDownActive ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                                    {groupsListForSelect.length === 0 ? (
                                                        <div className="add-new-vote__time-zone-option-container">
                                                            <p className="add-new-vote__time-zone-option">{constants.ADD_NEW_VOTE.NO_GROUPS}</p>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {groupsListForSelect.map((group) => (
                                                                <div key={group.id} className="add-new-vote__time-zone-option-container" onClick={() => addUsersFromGroup(group)}>
                                                                    <p className="add-new-vote__time-zone-option">{group.group_title} ({constants.ADD_NEW_VOTE.USERS_IN_GROUP}: {group.member_count})</p>
                                                                </div>
                                                            ))}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div onClick={handleOpenExpandList} className="add-new-vote__expand-list-container">
                                        <div className="add-new-vote__expand-list-icon" />
                                        <p className="add-new-vote__expand-list-text">{constants.ADD_NEW_VOTE.EXPAND_LIST_TITLE}</p>
                                    </div>
                                    {isExpandListActive && (
                                        <AddNewVoteExpandList
                                            constants={constants}
                                            requestHelper={requestHelper}
                                            addUsersFromExpandList={addUsersFromExpandList}
                                        />
                                    )}
                                    {votersList.length !== 0 && (
                                        <>
                                            <div className="add-new-vote__top-pagination">
                                                <PaginationBlock
                                                    sortList={votersListForRender}
                                                    search={votersListSearch}
                                                    searchInput={searchInput}
                                                    onChoiceClick={onChoiceClick}
                                                    selectedResultsShow={selectedResultsShow}
                                                    pageCount={pageCount}
                                                    showPrevResults={showPrevResults}
                                                    showNextResults={showNextResults}
                                                    constants={constants}
                                                />
                                            </div>
                                            {votersListForRender.length !== 0 ? (
                                                <div className="add-new-vote__list-users-table">
                                                    <div className="add-new-vote__list-users-table-header">
                                                        <p className="add-new-vote__list-users-table-header-username">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_USERNAME_TABLE}</p>
                                                        {isWeightActive && (
                                                            <p className="add-new-vote__list-users-table-header-weight-vote">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_WEIGHT_VOTE_TABLE}</p>
                                                        )}
                                                        <p className="add-new-vote__list-users-table-header-action">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ACTION_TABLE}</p>
                                                    </div>
                                                    {votersListForRender.sort(function (a, b) {
                                                        const emailA = a.email.toLowerCase();
                                                        const emailB = b.email.toLowerCase();
                                                        if (emailA < emailB)
                                                            return -1
                                                        if (emailA > emailB)
                                                            return 1
                                                        return 0
                                                    }).slice(showResultsFrom, resultsShow).map((user) => (
                                                        <div key={user.id} className="add-new-vote__list-users-table-row">
                                                            <div className="add-new-vote__table-row-username-email">
                                                                <p className="add-new-vote__table-row-username">{user.last_name} {user.first_name} {user.second_name}</p>
                                                                <p className="add-new-vote__table-row-email">{user.email}</p>
                                                            </div>
                                                            {isWeightActive && (
                                                                <div className="add-new-vote__table-row-count">
                                                                    <p className="add-new-vote__table-row-count-weight-mobile">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_WEIGHT_VOTE_TABLE}</p>
                                                                    <img className="add-new-vote__table-row-count-minus" onClick={() => decreaseWeight(user)} src={iconMinusTable} alt={constants.GENERAL.ALT_ICON} />
                                                                    <p className="add-new-vote__table-row-count-number">{user.weight}</p>
                                                                    <img className="add-new-vote__table-row-count-plus" onClick={() => increaseWeight(user)} src={iconPlusTable} alt={constants.GENERAL.ALT_ICON} />
                                                                </div>
                                                            )}
                                                            <div className="add-new-vote__table-row-action">
                                                                <img className="add-new-vote__table-row-action-icon-delete" onClick={() => deleteUserFromTable(user)} src={iconDeleteTable} alt={constants.GENERAL.ALT_ICON} />
                                                                <p className="add-new-vote__table-row-action-delete" onClick={() => deleteUserFromTable(user)}>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_DELETE_BTN_TABLE}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="add-new-vote__no-users-container">
                                                    <p className="add-new-vote__no-users">{constants.ADD_NEW_ORG.ADD_NEW_ORG_NO_USERS}<span className="name-org-input__red-star"> *</span></p>
                                                </div>
                                            )}
                                            <div className="add-new-vote__bottom-pagination">
                                                <div className="add-new-organization__bottom-pagination">
                                                    <PaginationBlock
                                                        sortList={votersListForRender}
                                                        search={votersListSearch}
                                                        searchInput={searchInput}
                                                        onChoiceClick={onChoiceClick}
                                                        selectedResultsShow={selectedResultsShow}
                                                        pageCount={pageCount}
                                                        showPrevResults={showPrevResults}
                                                        showNextResults={showNextResults}
                                                        constants={constants}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className={`add-new-vote__weight-voting-checkbox ${votersList.length !== 0 && 'add-new-vote__weight-voting-checkbox_with-table'}`}>
                                        {votersList.length !== 0 && (
                                            <div className="add-new-vote__checkbox-container" onClick={handleWeightActive}>
                                                <div className={`add-new-vote__checkbox ${isWeightActive && "add-new-vote__checkbox_active"}`} />
                                                <p className="add-new-vote__checkbox-text">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_WEIGHT_VOTE}</p>
                                            </div>
                                        )}
                                        <div className="add-new-vote__checkbox-container" onClick={showLinkUsers}>
                                            <div className={`add-new-vote__checkbox ${isLinkUsersActive && "add-new-vote__checkbox_active"}`} />
                                            <p className="add-new-vote__checkbox-text">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ALLOW_JOIN_LINK_VOTE}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(isLinkUsersActive || activeOpenList) && (
                                <div className="add-new-vote__open-list-block">
                                    <label className="add-new-vote__open-list-label-input">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_MAX_NUMBERS_MEMBERS}</label>
                                    <input className="add-new-vote__open-list-input" placeholder={'1'} type={"number"} min={1} max={9999} step={1} />
                                    <label className="add-new-vote__open-list-info">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_AFTER_CREATE_VOTE_AVAILABLE_LINK}</label>
                                </div>
                            )}
                            {!currentOrg.config.general.observers && (
                                <AddNewVoteAddObserversCountingMembers constants={constants} titleObserversCountingMembers={constants.ADD_NEW_VOTE.ADD_OBSERVERS_TITLE_OBSERVER} />
                            )}
                            {currentOrg.config.general.counters && (
                                <AddNewVoteAddObserversCountingMembers constants={constants} titleObserversCountingMembers={constants.ADD_NEW_VOTE.ADD_OBSERVERS_TITLE_COUNTING_MEMBERS} />
                            )}
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
                linkInputChange={linkInputChange}
                titleInputChange={titleInputChange}
                changeDocLink={changeDocLink}
                deleteMaterial={deleteMaterial}
                requestHelper={requestHelper}
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
