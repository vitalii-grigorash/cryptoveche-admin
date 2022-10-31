import React from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import SortingBlock from "../SortingBlock/SortingBlock";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import editBtnIcon from '../../img/OrganizationsLisеIconEditButton.svg';
import orgSearchIconMobile from '../../img/PaginationSearchIcon.svg';

const OrganizationsList = (props) => {

    const {
        constants
    } = props;

    const testObject = [
        {
            nameOrg: "Невероятно безумно и очень длинное и длиннющее название организации",
            numberSecretaries: 5,
            groupsUsers: 35,
            votes: 5,
            activeVotes: 5,
            templates: 20
        },
        {
            nameOrg: "ДВФУ",
            numberSecretaries: 5,
            groupsUsers: 35,
            votes: 5,
            activeVotes: 5,
            templates: 20
        },
        {
            nameOrg: "Очень длинное название организации",
            numberSecretaries: 5,
            groupsUsers: 35,
            votes: 5,
            activeVotes: 5,
            templates: 20
        }
    ]

    return (
        <div className="container__organisation-list _container">
            <GeneralTitleAllPages
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_ORG}
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_ORG}
            />
            <div className="organisation-list__sort-pagination">
                <SortingBlock
                    constants={constants}
                />
                <PaginationBlock
                    constants={constants}
                />
            </div>
            <div className="organisation-list__table-organisations">
                <div className="table-organisations-mobile-search-input">
                    <input className="mobile-search-input" placeholder="Поиск по списку"/>
                    <img className="table-organisations-mobile-search-icon" alt={orgSearchIconMobile} src={orgSearchIconMobile}/>
                </div>
                <div className="table-organisations-header">
                    <p className="table-organisations-header__name-org">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_NAME_ORG}</p>
                    <p className="table-organisations-header__secret">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_SECRETARY}</p>
                    <p className="table-organisations-header__group-users">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_GROUP_USERS}</p>
                    <p className="table-organisations-header__votes">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_VOTES}</p>
                    <p className="table-organisations-header__active-votes">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_ACTIVE_VOTES}</p>
                    <p className="table-organisations-header__templates">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_TEMPLATES}</p>
                    <p className="table-organisations-header__actions">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_ACTIONS}</p>
                </div>
                {testObject.map((el, i) => {
                    return (
                        <div key={i} className="table-organisations-row">
                            <p className="table-organisations-row__name-org">{el.nameOrg}</p>
                            <p className="table-organisations-row__num-secret">
                                <span className="num-secret-mobile">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_SECRETARY}</span>{el.numberSecretaries}</p>
                            <p className="table-organisations-row__group-users">
                                <span className="group-users-mobile">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_GROUP_USERS}</span>{el.groupsUsers}</p>
                            <p className="table-organisations-row__votes">
                                <span className="votes-mobile">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_VOTES}</span>{el.votes}</p>
                            <p className="table-organisations-row__active-votes">
                                <span className="active-votes-mobile">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_ACTIVE_VOTES}</span>{el.activeVotes}</p>
                            <p className="table-organisations-row__templates">
                                <span className="templates-mobile">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_TEMPLATES}</span>{el.templates}</p>
                            <div className="table-organisations-row__action">
                                <img alt={editBtnIcon} src={editBtnIcon} className="table-organisations-row__icon-edit"/>
                                <span className="table-organisations-row__edit-btn">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_EDIT_BTN}</span>
                                <span className="table-organisations-row__edit-btn-mobile">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_EDIT_BTN_MOBILE}</span>
                            </div>
                        </div>
                    )
                })}
                <p className="organisation-list__show-more">ПОКАЗАТЬ ЕЩЁ</p>
            </div>
            <div className="organisation-list__second-pagination">
                <PaginationBlock
                    constants={constants}
                />
            </div>
        </div>
    )
}
export default OrganizationsList;