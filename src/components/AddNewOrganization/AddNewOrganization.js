import React, {useState} from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import iconExcel from '../../img/AddNewOrgIconExcel.svg';
import iconMailIcon from '../../img/AddNewOrgIconMail.svg';
import iconDeleteBnt from '../../img/AddNewOrgDeleteIcon.svg';
import iconLock from '../../img/AddNewOrgLockIcon.svg';
import iconSuccessLoad from '../../img/AddNewOrgSuccessIcon.svg';
import iconExcelActive from '../../img/AddNewOrgExcelActiveIcon.svg';
import iconMailIconActive from '../../img/AddNewOrgIconMailActiveIcon.svg';

const AddNewOrganization = (props) => {

    const {
        constants
    } = props;

    const [activeBlock, setActiveBlock] = useState(true);
    const [activeMailBtn, setActiveMailBtn] = useState(true);
    const [activeExcelBtn, setActiveExcelBth] = useState(false);

    const onActiveBlock = () => {
        if (activeBlock === true) {
           setActiveBlock(false)
        } else {
            setActiveBlock(true)
        }
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

    return (
        <div className="container__add-new-organization _container">
            <GeneralTitleAllPages
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_ADD_ORG}
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_GROUP_USERS}
            />
            <div className="add-new-organization">
                <div className="add-new-organization__name-org-input">
                    <label className="name-org-input__label-name-org">{constants.ADD_NEW_ORG.ADD_NEW_ORG_NAME_ORG}<span className="name-org-input__red-star">*</span></label>
                    <input className="name-org-input__field" placeholder={constants.ADD_NEW_ORG.ADD_NEW_ORG_PLACEHOLDER_NAME}/>
                </div>
                <div className="add-new-organization__import-excel-add-email-buttons">
                    <div onClick={onActiveExcelBtn}  className={activeExcelBtn ? "import-excel-add-email-buttons__import-excel-btn active" : "import-excel-add-email-buttons__import-excel-btn" }>
                        <img alt={iconExcel} src={activeExcelBtn ? iconExcelActive : iconExcel} className="import-excel-btn__excel-icon"/>
                        <p>{constants.ADD_NEW_ORG.ADD_NEW_ORG_IMPORT_EXCEL_BTN}</p>
                    </div>
                    <div onClick={onActiveMailBtn} className={activeMailBtn ? "import-excel-add-email-buttons__add-email-btn active" : "import-excel-add-email-buttons__add-email-btn"}>
                        <img alt={iconMailIcon} src={activeMailBtn ? iconMailIconActive : iconMailIcon} className="add-email-btn__email-icon"/>
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
                    )
                }
                {
                    activeExcelBtn && (
                        <div className="add-new-organization__download-file-load-button">
                            <label className="download-file-load-button__label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DOWNLOAD_FILE_LABEL}</label>
                            <div className="download-file-load-button__field-file-load-button">
                                <input type="file"/>
                                <button className="field-file-load-button__load-btn" type={'submit'}>{constants.ADD_NEW_ORG.ADD_NEW_ORG_LOAD_BTN}</button>
                                <div className="field-file-load-button__success-info">
                                    <img className="field-file-load-button__icon-success" src={iconSuccessLoad} alt={iconSuccessLoad} />
                                    <p className="field-file-load-button__label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_SUCCESS_INFO}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="add-new-organization__top-pagination">
                    <PaginationBlock constants={constants}/>
                </div>
                <div className="add-new-organization__table-list-users">
                    {
                        testUsersObj.map((el, i) => {
                            return (
                                <div key={i} className="table-list-users">
                                    <div className="table-list-users__name-user-icon-lock">
                                        <img className={activeBlock ? "table-list-users__icon-lock" : "table-list-users__icon-lock active"} alt={'иконка замочек'} src={iconLock}/>
                                        <p className="table-list-users__column-name">{el.name}</p>
                                    </div>
                                    <p className="table-list-users__column-e-mail">{el.email}</p>
                                    <div className="table-list-users__column-checkbox-superuser">
                                        <label className='table-list-users__checkbox_container'>
                                            <input defaultChecked={false} type="checkbox"/>
                                            <span className='table-list-users__checkmark'/>
                                        </label>
                                        <p className="column-checkbox-superuser__label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_SUPERUSER}</p>
                                    </div>
                                    <div className="table-list-users__delete-icon-button">
                                        <p onClick={() => onActiveBlock(i)} className="delete-icon-button__block-unblock-btn">
                                            {activeBlock ? `${constants.ADD_NEW_ORG.ADD_NEW_ORG_BLOCK_BTN}` : `${constants.ADD_NEW_ORG.ADD_NEW_ORG_UNBLOCK_BTN}`}</p>
                                        <img alt={'иконка крестик'} src={iconDeleteBnt} className="delete-icon-button__icon-delete"/>
                                        <p className="delete-icon-button__delete-btn">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN}</p>
                                        <p className="delete-icon-button__delete-btn-mobile">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN_MOBILE}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <p className="table-list-users__show-more-mobile">{constants.ADD_NEW_ORG.ADD_NEW_ORG_SHOW_MORE_BTN}</p>
                </div>
                <div className="add-new-organization__bottom-pagination">
                    <PaginationBlock constants={constants}/>
                </div>
                <div className="add-new-organization__e-mail-support">
                    <label className="e-mail-support__e-mail-label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_E_MAIL_SUPPORT}
                        <span className="e-mail-support__red-star">*</span></label>
                    <input className="e-mail-support__field" placeholder={constants.ADD_NEW_ORG.ADD_NEW_ORG_E_MAIL_SUPPORT_PLACEHOLDER}/>
                </div>
                <div className="add-new-organization__note-input">
                    <label className="note-input__note-label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_NOTE}
                        <span className="note-input__red-star">*</span></label>
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