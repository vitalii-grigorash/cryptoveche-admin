import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as excel from 'xlsx';
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import iconExcel from '../../img/AddNewOrgIconExcel.svg';
import iconEmail from '../../img/AddNewOrgIconMail.svg';
import iconExcelActive from '../../img/AddNewOrgExcelActiveIcon.svg';
import iconEmailActive from '../../img/AddNewOrgIconMailActiveIcon.svg';
import iconDelete from '../../img/AddNewOrgDeleteIcon.svg';
import iconSuccessLoad from '../../img/AddNewOrgSuccessIcon.svg';
import * as Users from '../../Api/Users';
import * as Organizations from '../../Api/Organizations';
import { Validation } from '../../utils/Validation';

const AddNewOrganization = (props) => {

    const {
        constants,
        requestHelper
    } = props;

    const navigate = useNavigate();
    const usersTextarea = Validation();
    const descriptionTextarea = Validation();
    const usersSearch = Validation();
    const orgNameInput = Validation();
    const supportEmailInput = Validation();
    const [activeMailBtn, setActiveMailBtn] = useState(false);
    const [activeExcelBtn, setActiveExcelBth] = useState(false);
    const [usersToFind, setUsersToFind] = useState([]);
    const [usersToAdd, setUsersToAdd] = useState([]);
    const [selectedFileName, setSelectedFileName] = useState(constants.ADD_NEW_ORG.ADD_NEW_ORG_SELECT_FILE);
    const [isExcelFileSelected, setExcelFileSelected] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [saveOrgErrorMessage, setSaveOrgErrorMessage] = useState('');
    const [usersForRender, setUsersForRender] = useState([]);
    const [usersSearchInput, setUsersSearchInput] = useState('');
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(5);
    const [result, setResult] = useState(5);
    const [pageCount, setPageCount] = useState(1);
    const [selectedResultsShow, setSelectedResultsShow] = useState(5);
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const onExcelBtnClick = () => {
        setActiveMailBtn(false);
        setActiveExcelBth(true);
    }

    const onEmailBtnClick = () => {
        setActiveMailBtn(true);
        setActiveExcelBth(false);
    }

    useEffect(() => {
        if (usersToFind.length !== 0) {
            const body = {
                usersToFind: usersToFind
            }
            requestHelper(Users.findUsers, body)
                .then((data) => {
                    const users = [];
                    data.forEach((user) => {
                        if (user.id === undefined) {
                            const newUser = {
                                id: user.email,
                                email: user.email,
                                first_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_FIRST_NAME}`,
                                last_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_LAST_NAME}`,
                                second_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_SECOND_NAME}`,
                                isAdmin: false,
                                userFields: user.userFields
                            }
                            users.push(newUser);
                        } else {
                            const newUser = {
                                id: user.id,
                                email: user.email,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                second_name: user.second_name,
                                isAdmin: false,
                                userFields: user.userFields
                            }
                            users.push(newUser);
                        }
                    })
                    setUsersToAdd(users);
                })
                .catch((err) => {
                    throw new Error(err.message);
                })
        }
        // eslint-disable-next-line
    }, [usersToFind])

    function onSelectFileHandler(e) {
        var files = e.target.files, f = files[0];
        setSelectedFileName(files[0].name);
        setExcelFileSelected(true);
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = excel.read(data, { type: 'binary' });
            const uploadedUsers = workbook.Strings.map(user => user.h);
            const filteredUsers = uploadedUsers.filter(user => user !== undefined);
            const validUsersEmails = [];
            filteredUsers.forEach(user => {
                if (regex.test(String(user).toLowerCase())) {
                    validUsersEmails.push(user);
                }
            });
            const uniqАrr = [...new Set(validUsersEmails)];
            setUsersToFind(uniqАrr);
        };
        reader.readAsBinaryString(f);
    }

    function findUsers() {
        const usersArray = usersTextarea.value.trim().split(/(?:\n| |,)+/);
        const validUsersEmails = [];
        usersArray.forEach(user => {
            if (regex.test(String(user).toLowerCase())) {
                validUsersEmails.push(user);
            }
        });
        const uniqАrr = [...new Set(validUsersEmails)];
        if (uniqАrr.length !== 0) {
            setUsersToFind(uniqАrr);
            setEmailErrorMessage('');
        } else {
            setEmailErrorMessage(constants.ADD_NEW_ORG.ADD_NEW_ORG_EMAIL_ERROR);
        }
    }

    function onRemoveUserClick(userForRemove) {
        const filteredUsers = usersToAdd.filter(user => user.id !== userForRemove.id);
        setUsersToAdd(filteredUsers);
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
        if (resultsShow >= usersForRender.length) {
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
        setUsersSearchInput(value);
    }

    useEffect(() => {
        if (usersSearchInput === '') {
            setUsersForRender(usersToAdd);
        } else {
            const dataForRender = [];
            usersToAdd.forEach((user) => {
                if (user.email.toLowerCase().includes(usersSearchInput.toLowerCase())) {
                    dataForRender.push(user);
                } else if (user.last_name.toLowerCase().includes(usersSearchInput.toLowerCase())) {
                    dataForRender.push(user);
                } else if (user.first_name.toLowerCase().includes(usersSearchInput.toLowerCase())) {
                    dataForRender.push(user);
                } else if (user.second_name.toLowerCase().includes(usersSearchInput.toLowerCase())) {
                    dataForRender.push(user);
                }
            })
            setUsersForRender(dataForRender);
        }
    },
        [
            usersSearchInput,
            usersToAdd,
        ]
    );

    function handleChangeSuperUser(userForChange) {
        const foundUser = usersToAdd.find(user => user.id === userForChange.id)
        const filteredUsers = usersToAdd.filter(user => user.id !== userForChange.id);
        if (foundUser.isAdmin === false) {
            foundUser.isAdmin = true;
        } else {
            foundUser.isAdmin = false;
        }
        filteredUsers.push(foundUser);
        setUsersToAdd(filteredUsers);
    }

    function sendRequest() {
        const usersToSend = [];
        const adminsToSend = [];
        usersToAdd.forEach((user) => {
            if (user.isAdmin) {
                adminsToSend.push(user.email);
                usersToSend.push(user.email);
            } else {
                usersToSend.push(user.email);
            }
        })
        const newOrgData = {
            title: orgNameInput.value,
            users: usersToSend,
            admins: adminsToSend,
            settings: {
                email: supportEmailInput.value,
                description: descriptionTextarea.value
            }
        }
        const body = {
            newOrgData: newOrgData
        }
        requestHelper(Organizations.addOrganization, body)
            .then((data) => {
                if (data.status === 'ok') {
                    navigate('/organizations');
                    setSaveOrgErrorMessage('');
                } else {
                    setSaveOrgErrorMessage(constants.ADD_NEW_ORG.ADD_NEW_ORG_FAILURE_ERROR);
                }
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }

    function onSaveButtonClick() {
        if (orgNameInput.value === '') {
            setSaveOrgErrorMessage(constants.ADD_NEW_ORG.ADD_NEW_ORG_SAVE_ERROR);
        } else if (usersToAdd.length === 0) {
            setSaveOrgErrorMessage(constants.ADD_NEW_ORG.ADD_NEW_ORG_NO_USERS);
        } else if (supportEmailInput.value !== '') {
            if (regex.test(String(supportEmailInput.value).toLowerCase())) {
                sendRequest();
            } else {
                setSaveOrgErrorMessage(constants.ADD_NEW_ORG.ADD_NEW_ORG_SUPPORT_EMAIL_ERROR);
            }
        } else {
            sendRequest();
        }
    }

    return (
        <div className="container__add-new-organization _container">
            <GeneralTitleAllPages
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_ADD_ORG}
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_ADD_ORG}
            />
            <div className="add-new-organization">
                <div className="add-new-organization__name-org-input">
                    <label className="name-org-input__label-name-org">{constants.ADD_NEW_ORG.ADD_NEW_ORG_NAME_ORG}<span className="name-org-input__red-star"> *</span></label>
                    <input
                        className="name-org-input__field"
                        placeholder={constants.ADD_NEW_ORG.ADD_NEW_ORG_PLACEHOLDER_NAME}
                        onChange={orgNameInput.onChange}
                        value={orgNameInput.value}
                    />
                </div>
                <div className="add-new-organization__import-excel-add-email-buttons">
                    <div onClick={onExcelBtnClick} className={activeExcelBtn ? "import-excel-add-email-buttons__import-excel-btn active" : "import-excel-add-email-buttons__import-excel-btn"}>
                        <img alt={constants.GENERAL.ALT_ICON} src={activeExcelBtn ? iconExcelActive : iconExcel} className="import-excel-btn__excel-icon" />
                        <p>{constants.ADD_NEW_ORG.ADD_NEW_ORG_IMPORT_EXCEL_BTN}</p>
                    </div>
                    <div onClick={onEmailBtnClick} className={activeMailBtn ? "import-excel-add-email-buttons__add-email-btn active" : "import-excel-add-email-buttons__add-email-btn"}>
                        <img alt={constants.GENERAL.ALT_ICON} src={activeMailBtn ? iconEmailActive : iconEmail} className="add-email-btn__email-icon" />
                        <p className="add-email-btn__button-desktop">{constants.ADD_NEW_ORG.ADD_NEW_ORG_ADD_USERS_MAIL_BTN}</p>
                        <p className="add-email-btn__button-mobile">{constants.ADD_NEW_ORG.ADD_NEW_ORG_ADD_USERS_MAIL_BTN_MOBILE}</p>
                    </div>
                </div>
                {activeMailBtn && (
                    <div className="add-new-organization__mail-addresses-users">
                        <label className="mail-addresses-users__label-mail">{constants.ADD_NEW_ORG.ADD_NEW_ORG_MAIL_ADDRESS_USERS}<span className="name-org-input__red-star"> *</span></label>
                        <textarea
                            className="mail-addresses-users__input-field"
                            type="text"
                            onChange={usersTextarea.onChange}
                            value={usersTextarea.value}
                        />
                        <p className="add-new-organization__error-message">{emailErrorMessage}</p>
                        <button
                            className="mail-addresses-users__search-base-users"
                            onClick={findUsers}
                        >
                            {constants.ADD_NEW_ORG.ADD_NEW_ORG_SEARCH_USERS_BASE_BTN}
                        </button>
                    </div>
                )}
                {activeExcelBtn && (
                    <div className="add-new-organization__download-file-load-button">
                        <label className="download-file-load-button__label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DOWNLOAD_FILE_LABEL}<span className="name-org-input__red-star"> *</span></label>
                        <div className="add-new-organization__excel-add-container">
                            <input
                                className="add-new-organization__excel-add-input"
                                id="excel__file"
                                type="file"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange={(e) => onSelectFileHandler(e)}
                            />
                            <label htmlFor="excel__file" className="add-new-organization__excel-add-input-container">
                                <div className="add-new-organization__excel-add-input-file-name-container">
                                    <p className={`add-new-organization__excel-add-input-file-name-text ${isExcelFileSelected && 'add-new-organization__excel-add-input-file-name-text_selected'}`}>{selectedFileName}</p>
                                </div>
                                <div className="add-new-organization__excel-add-input-button">
                                    <p className='add-new-organization__excel-add-input-button-text'>{constants.ADD_NEW_ORG.ADD_NEW_ORG_LOAD_BTN}</p>
                                </div>
                            </label>
                            {isExcelFileSelected && (
                                <div className="field-file-load-button__success-info">
                                    <img className="field-file-load-button__icon-success" src={iconSuccessLoad} alt={iconSuccessLoad} />
                                    <p className="field-file-load-button__label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_SUCCESS_INFO}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div className="add-new-organization__top-pagination">
                    <PaginationBlock
                        sortList={usersForRender}
                        search={usersSearch}
                        searchInput={searchInput}
                        onChoiceClick={onChoiceClick}
                        selectedResultsShow={selectedResultsShow}
                        pageCount={pageCount}
                        showPrevResults={showPrevResults}
                        showNextResults={showNextResults}
                        constants={constants}
                    />
                </div>
                {usersForRender.length !== 0 ? (
                    <div className="add-new-organization__table-list-users">
                        {usersForRender.sort(function (a, b) {
                            var emailA = a.email.toLowerCase(), emailB = b.email.toLowerCase()
                            if (emailA < emailB)
                                return -1
                            if (emailA > emailB)
                                return 1
                            return 0
                        }).slice(showResultsFrom, resultsShow).map((user) => (
                            <div key={user.id} className="table-list-users">
                                <div className="table-list-users__name-user-icon-lock">
                                    <p className="table-list-users__column-name">{user.last_name} {user.first_name} {user.second_name}</p>
                                </div>
                                <p className="table-list-users__column-e-mail">{user.email}</p>
                                <div className="table-list-users__column-checkbox-superuser">
                                    <label className='table-list-users__checkbox_container'>
                                        <input
                                            checked={user.isAdmin}
                                            onChange={() => handleChangeSuperUser(user)}
                                            type="checkbox"
                                        />
                                        <span className='table-list-users__checkmark' />
                                    </label>
                                    <p className="column-checkbox-superuser__label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_SUPERUSER}</p>
                                </div>
                                <div className="table-list-users__delete-icon-button" onClick={() => onRemoveUserClick(user)}>
                                    <img alt={constants.GENERAL.ALT_ICON} src={iconDelete} className="delete-icon-button__icon-delete" />
                                    <p className="delete-icon-button__delete-btn">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN}</p>
                                    <p className="delete-icon-button__delete-btn-mobile">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN_MOBILE}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="table-list-users__no-users-container">
                        <p className="table-list-users__no-users">{constants.ADD_NEW_ORG.ADD_NEW_ORG_NO_USERS}<span className="name-org-input__red-star"> *</span></p>
                    </div>
                )}
                <div className="add-new-organization__bottom-pagination">
                    <PaginationBlock
                        sortList={usersForRender}
                        search={usersSearch}
                        searchInput={searchInput}
                        onChoiceClick={onChoiceClick}
                        selectedResultsShow={selectedResultsShow}
                        pageCount={pageCount}
                        showPrevResults={showPrevResults}
                        showNextResults={showNextResults}
                        constants={constants}
                    />
                </div>
                <div className="add-new-organization__e-mail-support">
                    <label className="e-mail-support__e-mail-label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_E_MAIL_SUPPORT}</label>
                    <input
                        className="e-mail-support__field"
                        placeholder={constants.ADD_NEW_ORG.ADD_NEW_ORG_E_MAIL_SUPPORT_PLACEHOLDER}
                        onChange={supportEmailInput.onChange}
                        value={supportEmailInput.value}
                    />
                </div>
                <div className="add-new-organization__note-input">
                    <label className="note-input__note-label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_NOTE}</label>
                    <textarea
                        className="note-input__field"
                        placeholder={constants.ADD_NEW_ORG.ADD_NEW_ORG_INPUT_NOTE}
                        type="text"
                        onChange={descriptionTextarea.onChange}
                        value={descriptionTextarea.value}
                    />
                </div>
                <p className="add-new-organization__error-message">{saveOrgErrorMessage}</p>
                <button className="save-button__add-new-org-save-btn" onClick={onSaveButtonClick}>{constants.ADD_NEW_ORG.ADD_NEW_ORG_SAVE_BTN}</button>
            </div>
        </div>
    )
}

export default AddNewOrganization;
