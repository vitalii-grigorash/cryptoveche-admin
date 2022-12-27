import React, { useEffect, useState } from "react";
import * as excel from 'xlsx';
import UsersTable from "../UsersTable/UsersTable";
import iconExcel from '../../img/AddNewOrgIconExcel.svg';
import iconEmail from '../../img/AddNewOrgIconMail.svg';
import iconExcelActive from '../../img/AddNewOrgExcelActiveIcon.svg';
import iconEmailActive from '../../img/AddNewOrgIconMailActiveIcon.svg';
import iconSuccessLoad from '../../img/AddNewOrgSuccessIcon.svg';
import * as Users from '../../Api/Users';
import { Validation } from '../../utils/Validation';

const AddUsers = (props) => {

    const {
        constants,
        requestHelper,
        changeUsersToAddArr,
        usersToAdd
    } = props;

    const usersTextarea = Validation();
    const [activeMailBtn, setActiveMailBtn] = useState(false);
    const [activeExcelBtn, setActiveExcelBth] = useState(false);
    const [usersToFind, setUsersToFind] = useState([]);
    const [selectedFileName, setSelectedFileName] = useState(constants.ADD_NEW_ORG.ADD_NEW_ORG_SELECT_FILE);
    const [isExcelFileSelected, setExcelFileSelected] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const deleteUserButtonText = constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN;
    const deleteUserButtonTextMobile = constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN_MOBILE;
    const deleteUserId = '';
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
                        if (user.last_name === undefined) {
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
                    changeUsersToAddArr(users);
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
        changeUsersToAddArr(filteredUsers);
    }

    function handleChangeSuperUser(userForChange) {
        const foundUser = usersToAdd.find(user => user.id === userForChange.id)
        const filteredUsers = usersToAdd.filter(user => user.id !== userForChange.id);
        if (foundUser.isAdmin === false) {
            foundUser.isAdmin = true;
        } else {
            foundUser.isAdmin = false;
        }
        filteredUsers.push(foundUser);
        changeUsersToAddArr(filteredUsers);
    }

    return (
        <div className="add-users">
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
            <UsersTable
                constants={constants}
                onRemoveUserClick={onRemoveUserClick}
                handleChangeSuperUser={handleChangeSuperUser}
                users={usersToAdd}
                deleteUserButtonText={deleteUserButtonText}
                deleteUserButtonTextMobile={deleteUserButtonTextMobile}
                deleteUserId={deleteUserId}
                adminId={''}
            />
        </div>
    )
}

export default AddUsers;
