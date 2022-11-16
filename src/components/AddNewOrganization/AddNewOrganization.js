import React, { useEffect, useState } from "react";
import * as excel from 'xlsx';
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
// import PaginationBlock from "../PaginationBlock/PaginationBlock";
import iconExcel from '../../img/AddNewOrgIconExcel.svg';
import iconEmail from '../../img/AddNewOrgIconMail.svg';
import iconExcelActive from '../../img/AddNewOrgExcelActiveIcon.svg';
import iconEmailActive from '../../img/AddNewOrgIconMailActiveIcon.svg';
import iconDelete from '../../img/AddNewOrgDeleteIcon.svg';
import iconSuccessLoad from '../../img/AddNewOrgSuccessIcon.svg';
import * as Users from '../../Api/Users';

const AddNewOrganization = (props) => {

    const {
        constants,
        requestHelper
    } = props;

    const [activeMailBtn, setActiveMailBtn] = useState(false);
    const [activeExcelBtn, setActiveExcelBth] = useState(false);
    const [usersToFind, setUsersToFind] = useState([]);
    const [usersToAdd, setUsersToAdd] = useState([]);

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
                    console.log(data);
                    const users = [];
                    data.forEach((user) => {
                        if (user.id === undefined) {
                            const newUser = {
                                id: user.email,
                                email: user.email,
                                first_name: "Без",
                                last_name: "Пользователь",
                                second_name: "Имени",
                                userFields: user.userFields
                            }
                            users.push(newUser);
                        } else {
                            users.push(user);
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
        var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        var files = e.target.files, f = files[0];
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
            setUsersToFind(validUsersEmails);
        };
        reader.readAsBinaryString(f);
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
                    <label className="name-org-input__label-name-org">{constants.ADD_NEW_ORG.ADD_NEW_ORG_NAME_ORG}<span className="name-org-input__red-star">*</span></label>
                    <input
                        className="name-org-input__field"
                        placeholder={constants.ADD_NEW_ORG.ADD_NEW_ORG_PLACEHOLDER_NAME}
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
                        <label className="mail-addresses-users__label-mail">{constants.ADD_NEW_ORG.ADD_NEW_ORG_MAIL_ADDRESS_USERS}
                            <p className="mail-addresses-users__label-rule">{constants.ADD_NEW_ORG.ADD_NEW_ORG_MAIL_ADDRESS_USERS_RULE}</p>
                        </label>
                        <textarea className="mail-addresses-users__input-field"></textarea>
                        <button className="mail-addresses-users__search-base-users">{constants.ADD_NEW_ORG.ADD_NEW_ORG_SEARCH_USERS_BASE_BTN}</button>
                    </div>
                )}
                {activeExcelBtn && (
                    // <div className="add-new-organization__download-file-load-button">
                        // <label className="download-file-load-button__label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DOWNLOAD_FILE_LABEL}</label>
                        <div className="add-new-organization__excel-add-container">
                            <input
                                className="add-new-organization__excel-add-input"
                                id="excel__file"
                                type="file"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange={(e) => onSelectFileHandler(e)}
                            />
                            <label htmlFor="excel__file" className="add-new-organization__excel-add-input-button">
                                <p className='add-new-organization__excel-add-input-button-text'>{constants.ADD_NEW_ORG.ADD_NEW_ORG_LOAD_BTN}</p>
                            </label>
                            {/* <div className="field-file-load-button__success-info">
                                <img className="field-file-load-button__icon-success" src={iconSuccessLoad} alt={iconSuccessLoad} />
                                <p className="field-file-load-button__label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_SUCCESS_INFO}</p>
                            </div> */}
                        </div>
                    // </div>
                )}
                <div className="add-new-organization__top-pagination">
                    {/* <PaginationBlock
                        constants={constants}
                    /> */}
                </div>
                <div className="add-new-organization__table-list-users">
                    {usersToAdd.map((user) => {
                        return (
                            <div key={user.id} className="table-list-users">
                                <div className="table-list-users__name-user-icon-lock">
                                    <p className="table-list-users__column-name">{user.last_name} {user.first_name} {user.second_name}</p>
                                </div>
                                <p className="table-list-users__column-e-mail">{user.email}</p>
                                <div className="table-list-users__column-checkbox-superuser">
                                    <label className='table-list-users__checkbox_container'>
                                        <input defaultChecked={false} type="checkbox" />
                                        <span className='table-list-users__checkmark' />
                                    </label>
                                    <p className="column-checkbox-superuser__label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_SUPERUSER}</p>
                                </div>
                                <div className="table-list-users__delete-icon-button">
                                    <img alt={constants.GENERAL.ALT_ICON} src={iconDelete} className="delete-icon-button__icon-delete" />
                                    <p className="delete-icon-button__delete-btn">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN}</p>
                                    <p className="delete-icon-button__delete-btn-mobile">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN_MOBILE}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="add-new-organization__bottom-pagination">
                    {/* <PaginationBlock
                        constants={constants}
                    /> */}
                </div>
                <div className="add-new-organization__e-mail-support">
                    <label className="e-mail-support__e-mail-label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_E_MAIL_SUPPORT}</label>
                    <input className="e-mail-support__field" placeholder={constants.ADD_NEW_ORG.ADD_NEW_ORG_E_MAIL_SUPPORT_PLACEHOLDER} />
                </div>
                <div className="add-new-organization__note-input">
                    <label className="note-input__note-label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_NOTE}</label>
                    <textarea className="note-input__field" placeholder={constants.ADD_NEW_ORG.ADD_NEW_ORG_INPUT_NOTE}></textarea>
                </div>
                <div className="add-new-organization__save-button">
                    <button className="save-button__add-new-org-save-btn">{constants.ADD_NEW_ORG.ADD_NEW_ORG_SAVE_BTN}</button>
                </div>
            </div>
        </div>
    )
}

export default AddNewOrganization;
