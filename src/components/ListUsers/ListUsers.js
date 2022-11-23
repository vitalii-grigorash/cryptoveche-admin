import React from "react";
import iconEye from "../../img/ListUsersIconEye.svg";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import orgSearchIconMobile from "../../img/PaginationSearchIcon.svg";

const ListUsers = (props) => {

    const {
        constants
    } = props;

    const testUsersObj = [
        {
            email: "anastasia.timoshina98@yandex.ru",
            name: "Тимошина Анастасия Владимировна"
        },
        {
            email: "a.kuznetsov@spbu.ru",
            name: "Кузнецов Алексей Николаевич"
        },
        {
            email: "makarovmma@gmail.com",
            name: "Макаров Михаил Алексеевич"
        }
    ]

    return (
        <div className="container__list-users _container">
            <GeneralTitleAllPages
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_LIST_USERS}
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_LIST_USERS}
            />
            <div className="list-users__sorting-pagination">
                <div className="list-users__pagination">
                    <PaginationBlock
                        constants={constants} />
                </div>
            </div>
            <div className="list-users__table-list-users">
                <div className="list-users__mobile-search-input">
                    <input className="list-users__mobile-input" placeholder="Поиск по списку" />
                    <img className="list-users__mobile-icon" alt={orgSearchIconMobile} src={orgSearchIconMobile} />
                </div>
                <div className="table-list-users-header">
                    <p className="table-list-users-header__e-mail">{constants.LIST_USERS.LIST_USERS_TABLE_EMAIL}</p>
                    <p className="table-list-users-header__username">{constants.LIST_USERS.LIST_USERS_USERNAME}</p>
                    <p className="table-list-users-header__actions">{constants.LIST_USERS.LIST_USERS_ACTIONS}</p>
                </div>
                {
                    testUsersObj.map((el, i) => {
                        return (
                            <div key={i} className="list-users-row">
                                <p className="list-users-row__e-mail">{el.email}</p>
                                <p className="list-users-row__username">{el.name}</p>
                                <div className="list-users-row-show-profile">
                                    <img className="list-users-row-show-profile__icon" src={iconEye} alt={iconEye} />
                                    <p className="list-users-row-show-profile__show">{constants.LIST_USERS.LIST_USERS_WATCH_PROFILE}</p>
                                </div>
                            </div>
                        )
                    })
                }
                <p className="list-users-row-show-more">{constants.LIST_USERS.LIST_USERS_SHOW_MORE}</p>
            </div>
        </div>
    )
}
export default ListUsers;