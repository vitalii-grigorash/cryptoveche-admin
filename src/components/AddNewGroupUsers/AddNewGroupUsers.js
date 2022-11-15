import React, {useRef, useState} from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";
import iconExcel from "../../img/AddNewOrgIconExcel.svg";
import iconExcelActive from "../../img/AddNewOrgExcelActiveIcon.svg";
import iconMailIcon from "../../img/AddNewOrgIconMail.svg";
import iconMailIconActive from "../../img/AddNewOrgIconMailActiveIcon.svg";
import iconSuccessLoad from "../../img/AddNewOrgSuccessIcon.svg";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import iconLock from "../../img/AddNewOrgLockIcon.svg";
import iconDeleteBnt from "../../img/AddNewOrgDeleteIcon.svg";

const AddNewGroupUsers = (props) => {

    const {
        constants
    } = props;

    const [activeSelectedOrgForm, setActiveSelectedOrgForm] = useState(false);
    const [hideSelectOrg, setHideSelectOrg] = useState(true);
    const [activeMailBtn, setActiveMailBtn] = useState(true);
    const [activeExcelBtn, setActiveExcelBth] = useState(false);

    const testUsersObj = [
        {
            name: "Ускова Анна Владимировна",
            email: "anyauskowa@yandex.ru"
        },
        {
            name: "Тимошина Мария Владимировна",
            email: "maria.timoshina98@yandex.ru"
        }
    ]

    function showSelectOrgForm() {
        setHideSelectOrg(false)
        setActiveSelectedOrgForm(true)
    }

    const onActiveExcelBtn = () => {
        if (activeMailBtn === true) {
            setActiveMailBtn(false)
            setActiveExcelBth(true)
        }
    }

    const onActiveMailBtn = () => {
        if (activeExcelBtn === true) {
            setActiveMailBtn(true)
            setActiveExcelBth(false)
        }
    }

    return (
        <div className="container__add-new-group-users _container">
            <GeneralTitleAllPages
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_GROUP_USERS}
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_ADD_GROUP_USERS }
            />
            <p className={activeSelectedOrgForm ? "add-new-group-users__current-name-org active" : "add-new-group-users__current-name-org"}>Название организации</p>
            {
                hideSelectOrg && (
                    <div className="add-new-group-users__select-organization-block">
                        <h3 className="select-organization-block__title-select-org">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_SELECT_ORG}</h3>
                        <div className="select-organization-block__select-role">
                            <label className="select-organization-block__label">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_ORG}
                                <span className="select-organization-block__red-star">*</span>
                            </label>
                            <div className="select-organization-block__time-zone-select-container">
                                <p className="select-organization-block__time-zone-select-value">Выбранная нами организация</p>
                                <img className="select-organization-block__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                <div className="select-organization-block__time-zone-options-container">
                                    <p className="select-organization-block__time-zone-option"></p>
                                </div>
                            </div>
                        </div>
                        <div className="select-organization-block__button-block">
                            <button onClick={showSelectOrgForm} className="select-organization-block__button-next">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_NEXT_BTN}</button>
                        </div>
                    </div>
                )}
            {
                activeSelectedOrgForm && (
                    <div className="add-new-group-users">
                        <div className="add-new-organization__name-org-input">
                            <label className="name-org-input__label-name-org">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_NAME_GROUP_USERS}
                                <span className="name-org-input__red-star">*</span></label>
                            <input className="name-org-input__field" placeholder={constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_PLACEHOLDER_NAME}/>
                        </div>
                        <div className="add-new-organization__import-excel-add-email-buttons">
                            <div onClick={onActiveExcelBtn}  className={activeExcelBtn ? "import-excel-add-email-buttons__import-excel-btn active" : "import-excel-add-email-buttons__import-excel-btn" }>
                                <img alt={iconExcel} src={activeExcelBtn ? iconExcelActive : iconExcel} className="import-excel-btn__excel-icon"/>
                                <p>{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_IMPORT_EXCEL_BTN}</p>
                            </div>
                            <div onClick={onActiveMailBtn} className={activeMailBtn ? "import-excel-add-email-buttons__add-email-btn active" : "import-excel-add-email-buttons__add-email-btn"}>
                                <img alt={iconMailIcon} src={activeMailBtn ? iconMailIconActive : iconMailIcon} className="add-email-btn__email-icon"/>
                                <p className="add-email-btn__button-desktop">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_ADD_GROUP_BTN}</p>
                                <p className="add-email-btn__button-mobile">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_ADD_GROUP_BTN}</p>
                            </div>
                        </div>
                        {activeMailBtn && (
                            <div className="add-new-organization__mail-addresses-users">
                                <label className="mail-addresses-users__label-mail">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_MAIL_ADDRESS_USERS}
                                    <p className="mail-addresses-users__label-rule">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_MAIL_ADDRESS_USERS_RULE}</p>
                                </label>
                                <textarea className="mail-addresses-users__input-field"></textarea>
                                <button className="mail-addresses-users__search-base-users">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_SEARCH_USERS_BASE_BTN}</button>
                            </div>
                        )}
                        {
                            activeExcelBtn && (
                                <div className="add-new-organization__download-file-load-button">
                                    <label className="download-file-load-button__label">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_DOWNLOAD_FILE_LABEL}</label>
                                    <div className="download-file-load-button__field-file-load-button">
                                        <input type="file"/>
                                        <button className="field-file-load-button__load-btn" type={'submit'}>{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_LOAD_BTN}</button>
                                        <div className="field-file-load-button__success-info">
                                            <img className="field-file-load-button__icon-success" src={iconSuccessLoad} alt={iconSuccessLoad} />
                                            <p className="field-file-load-button__label">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_SUCCESS_INFO}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        <div className="add-new-organization__top-pagination">
                            <PaginationBlock constants={constants}/>
                        </div>
                        <div className="add-new-organization__table-list-users">
                            {
                                testUsersObj.map((el, i) => {
                                    return (
                                        <div key={i} className="table-list-users">
                                                <p className="table-list-users__column-name">{el.name}</p>
                                            <p className="table-list-users__column-e-mail">{el.email}</p>
                                            <div className="table-list-users__delete-icon-button">
                                                <img alt={'иконка крестик'} src={iconDeleteBnt} className="delete-icon-button__icon-delete"/>
                                                <p className="delete-icon-button__delete-btn">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_DELETE_BTN}</p>
                                            </div>
                                        </div>
                                    )})}
                            <p className="table-list-users__show-more-mobile">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_SHOW_MORE_BTN}</p>
                        </div>
                        <div className="add-new-organization__bottom-pagination">
                            <PaginationBlock constants={constants}/>
                        </div>
                        <div className="add-new-organization__save-button">
                            <button className="save-button__add-new-org-save-btn">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_SAVE_BTN}</button>
                        </div>
                    </div>
                )}
        </div>
    )}
export default AddNewGroupUsers;