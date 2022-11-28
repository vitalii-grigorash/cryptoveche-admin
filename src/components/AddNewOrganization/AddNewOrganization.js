import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import AddUsers from "../AddUsers/AddUsers";
import * as Organizations from '../../Api/Organizations';
import { Validation } from '../../utils/Validation';

const AddNewOrganization = (props) => {

    const {
        constants,
        requestHelper
    } = props;

    const navigate = useNavigate();
    const descriptionTextarea = Validation();
    const orgNameInput = Validation();
    const supportEmailInput = Validation();
    const [usersToAdd, setUsersToAdd] = useState([]);
    const [saveOrgErrorMessage, setSaveOrgErrorMessage] = useState('');
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    function changeUsersToAddArr(users) {
        setUsersToAdd(users);
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
                <AddUsers
                    constants={constants}
                    requestHelper={requestHelper}
                    changeUsersToAddArr={changeUsersToAddArr}
                    usersToAdd={usersToAdd}
                />
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
