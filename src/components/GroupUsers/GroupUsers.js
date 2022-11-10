import React from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import SortingBlock from "../SortingBlock/SortingBlock";
import iconDeleteBtn from "../../img/AddNewOrgDeleteIcon.svg";
import iconEditBtn from "../../img/OrganizationsLisеIconEditButton.svg";
import iconLockRed from "../../img/AddNewOrgLockIcon.svg";
import iconLockBlack from "../../img/GroupUsersIconLock.svg";
import iconMembers from "../../img/GroupUsersIconMembers.svg";

const GroupUsers = (props) => {

    const {
        constants
    } = props;

    const testUsersObj = [
        {
            nameGroup: "Не слишком длинное название группы пользователей",
            nameOrg: "Не очень короткое название организации",
            members: 2333
        },
        {
            nameGroup: "Голосование на заседании УС ИКТИБ по аттестации в учёном звании доцента по научной специальности 05.13.18 – Математическое моделирование, численные методы и комплексы программ",
            nameOrg: "ДВФУ",
            members: 1222
        },
        {
            nameGroup: "Голосование на заседании УС ИКТИБ по аттестации в учёном звании доцента по научной специальности 05.13.18 – Математическое моделирование, численные методы и комплексы программ",
            nameOrg: "ДВФУ",
            members: 1222
        }
    ]

    return (
        <div className="container__group-users _container">
            <GeneralTitleAllPages
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_GROUP_USER}
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_GROUP_USERS}
            />
                <button className="group-user__add-user-btn-mobile">{constants.GROUP_USERS.GROUP_USERS_ADD_USER_BTN_MOBILE}</button>
            <div className="group-users__sorting-pagination">
                <SortingBlock
                    constants={constants}/>
                <div className="group-users__pagination">
                    <PaginationBlock
                        constants={constants}/>
                </div>
                    <p className="group-users__select-btn-mobile">{constants.GROUP_USERS.GROUP_USERS_SELECT_BTN_SELECT}</p>
            </div>
            <div className="group-users__table-group-users">
                <div className="table-group-users__header-table-group-users">
                        <label className='table-group-users__checkbox_container'>
                            <input defaultChecked={false} type="checkbox"/>
                            <span className='table-group-users__checkmark'/>
                        </label>
                    <p className="header-table-group-users__name-group">{constants.GROUP_USERS.GROUP_USERS_NAME_GROUP_USERS}</p>
                    <p className="header-table-group-users__members">{constants.GROUP_USERS.GROUP_USERS_MEMBERS}</p>
                    <p className="header-table-group-users__actions">{constants.GROUP_USERS.GROUP_USERS_ACTIONS}</p>
                </div>
                {
                    testUsersObj.map((el, i) => {
                        return (
                            <div key={i} className="table-group-users-row">
                                    <label className='table-group-users__checkbox_container _hidden-check'>
                                        <input defaultChecked={false} type="checkbox"/>
                                        <span className='table-group-users__checkmark'/>
                                    </label>
                                <div className="table-group-users-row__name-group-name-org">
                                    <p className="table-group-users-row__name-group">
                                        <label className='table-group-users__checkbox_container _show-check '>
                                            <input defaultChecked={false} type="checkbox"/>
                                            <span className='table-group-users__checkmark'/>
                                        </label>
                                        <img className="table-group-users-row__icon-red-lock" src={iconLockRed} alt={iconLockRed}/>{el.nameGroup}</p>
                                    <p className="table-group-users-row__name-org">{el.nameOrg}</p>
                                </div>
                                <div className="table-group-users-row__members">
                                    <p className="table-group-users-row__members-mobile">{constants.GROUP_USERS.GROUP_USERS_MEMBERS}</p>
                                    <div className="table-group-users-row__members-mobile-block">
                                        <img className="table-group-users-row__members-icon" src={iconMembers} alt={iconMembers} />
                                        <p className="table-group-users-row__members-numbers">{el.members}</p>
                                    </div>
                                </div>
                                <div className="table-group-users-row__buttons-block">
                                    <div className="table-group-users-row__edit-btn">
                                        <img className="table-group-users-row__icon-edit" src={iconEditBtn} alt={iconEditBtn}/>
                                        <p className="table-group-users-row__label-edit-btn">{constants.GROUP_USERS.GROUP_USERS_EDIT_BTN}</p>
                                    </div>
                                    <div className="table-group-users-row__block-unblock-btn">
                                        <img className="table-group-users-row__icon-black-lock" src={iconLockBlack} alt={iconLockBlack}/>
                                        <p className="table-group-users-row__label-block-unblock-btn">{constants.GROUP_USERS.GROUP_USERS_BLOCK_BTN}</p>
                                    </div>
                                    <div className="table-group-users-row__delete-btn">
                                        <img className="table-group-users-row__icon-delete" src={iconDeleteBtn} alt={iconDeleteBtn}/>
                                        <p className="table-group-users-row__label-icon-delete">{constants.GROUP_USERS.GROUP_USERS_DELETE_BTN}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default GroupUsers;