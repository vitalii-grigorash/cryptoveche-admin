import React from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import VotesPageFilterSortButtons from "../VotesPageFilterSortButtons/VotesPageFilterSortButtons";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import iconDate from "../../img/MyVotes_data_icon.svg";
import iconTime from "../../img/MyVotes_icon_time.svg";
import iconEditBtn from "../../img/OrganizationsLisеIconEditButton.svg";
import iconDeleteBtn from "../../img/AddNewGroupIconBasket.svg";

const ListTemplates = (props) => {

    const {
        constants
    } = props;

    const testTemplatesObj = [
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
        <div className="list-templates__container _container">
            <GeneralTitleAllPages
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_TEMPLATES_VOTE}
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_TEMPLATES_VOTE}
            />
            <button className="list-templates__add-template-btn-mobile">{constants.ADD_TEMPLATES.ADD_TEMPLATES_ADD_TEMPLATE_BTN}</button>
            <div className="list-templates__filter-sort-pagination">
                <VotesPageFilterSortButtons constants={constants}/>
                {/*<PaginationBlock/>*/}
            </div>
            <div className="list-templates__main-block">
                <div className="list-templates__header-table-templates">
                    <p className="list-templates__header-name">{constants.ADD_TEMPLATES.ADD_TEMPLATES_NAME_TEMPLATE}</p>
                    <p className="list-templates__header-created-datetime">{constants.ADD_TEMPLATES.ADD_TEMPLATES_DATE_CREATE} (UTC+3)</p>
                    <p className="list-templates__header-actions">{constants.ADD_TEMPLATES.ADD_TEMPLATES_ACTION}</p>
                </div>
                <div className="list-templates-row">
                    <div className="list-templates-row__name-templates-name-org">
                        <p className="list-templates-row__name-templates">
                            {/*<img className="table-group-users-row__icon-red-lock" src={iconLockRed} alt={iconLockRed}/>*/}
                            Шаблон о засеости 05.13.18 – Математическое моделирование, численные методы и комплексы программ</p>
                        <p className="list-templates-row__name-org">Название организации</p>
                    </div>
                    <div className="list-templates-row__created-datetime">
                        <p className="list-templates-row__created-datetime-label-mobile">{constants.ADD_TEMPLATES.ADD_TEMPLATES_DATE_CREATE_MOBILE}</p>
                        <div className="list-templates-row__date-icon-block">
                            <img className="list-templates-row__icon-datetime" src={iconDate} alt={constants.GENERAL.ALT_ICON}/>
                            <p>05.12.2020</p>
                        </div>
                        <div className="list-templates-row__time-icon-block">
                            <img className="list-templates-row__icon-time" src={iconTime} alt={constants.GENERAL.ALT_ICON}/>
                            <p>12:00</p>
                        </div>
                    </div>
                    <div className="list-templates-row__buttons-block">
                        <div className="list-templates-row__edit-btn">
                            <img className="list-templates-row__icon-edit" src={iconEditBtn} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="list-templates-row__label-edit-btn">{constants.GROUP_USERS.GROUP_USERS_EDIT_BTN}</p>
                            <p className="list-templates-row__label-edit-btn-mobile">{constants.ADD_TEMPLATES.ADD_TEMPLATES_EDIT_MOBILE_BTN}</p>
                        </div>
                        <div className="list-templates-row__delete-btn">
                            <img className="list-templates-row__icon-delete" src={iconDeleteBtn} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="list-templates-row__label-icon-delete">{constants.GROUP_USERS.GROUP_USERS_DELETE_BTN}</p>
                            <p className="list-templates-row__label-icon-delete-mobile">{constants.ADD_TEMPLATES.ADD_TEMPLATES_DELETE_MOBILE_BTN}</p>
                        </div>
                    </div>
                </div>
                <div className="list-templates__show-more-btn-mobile">{constants.ADD_TEMPLATES.ADD_TEMPLATES_SHOW_MORE_BTN}</div>
            </div>
        </div>
    )
}
export default ListTemplates;