import React, {useState} from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import iconDeleteBnt from "../../img/AddNewOrgDeleteIcon.svg";
import iconSelectName from "../../img/GroupUsersNameGroupSelectIcon.svg";

const GroupUsersSelectNameGroup = (props) => {

    const {
        constants,
        authAs
    } = props;

    const [activeAddUsersForm, setActiveAddUsersForm] = useState(false);
    const [activeSelectIcon, setActiveSelectIcon] = useState(false);

    const testUsersObj = [
        {
            name: "Ускова Анна Владимировна",
            email: "anyauskowa@yandex.ru"
        },
        {
            name: "Тимошина Мария Владимировна",
            email: "maria.timoshina98@yandex.ru"
        },
        {
            name: "Тимошина Мария Владимировна",
            email: "maria.timoshina98@yandex.ru"
        }
    ]

    return (
        <div className="container__group-users-select-name-group _container">
            <GeneralTitleAllPages
                titleName={'Название группы пользователей'}
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_GROUP_USERS}
            />
            <p className="group-users-select-name-group__name-org">Название организации</p>
            {authAs === 'admin' ? <div className={activeAddUsersForm ? "group-users-select-name-group__add-btn-block hidden" : "group-users-select-name-group__add-btn-block"}>
                <button onClick={() => setActiveAddUsersForm(true)} className="group-users-select-name-group__button">Добавить пользователей</button>
            </div> : null}
            {activeAddUsersForm && (
                    <div className="group-users-select-name-group__add-users-form">
                        <textarea className="group-users-select-name-group__input-field" placeholder={'Список почтовых адресов пользователей (XX@YY.ZZ) по одному на каждую строчку для каждого пользователя'}></textarea>
                        <div className="group-users-select-name-group__add-users-form-buttons">
                            <button className="add-users-form-buttons__search-base-users-btn">Найти в базе пользователей</button>
                            <button onClick={() => setActiveAddUsersForm(false)} className="add-users-form-buttons__save-btn">Сохранить</button>
                        </div>
                    </div>
                )}
            <div className="group-users-select-name-group__pagination">
                {/*<PaginationBlock constants={constants}/>*/}
            </div>
            <div className="group-users-select-name-group__table-users-select-name-group">
                <div className="table-users-select-name-group">
                    {
                        testUsersObj.map((el, i) => {
                            return (
                                <div key={i} className="table-users-select-name-group__table-list-users">
                                    <p className="table-users-select-name-group__column-name">{el.name}</p>
                                    <p className="table-users-select-name-group__column-e-mail">{el.email}</p>
                                    {authAs === 'admin' ? <div className="table-users-select-name-group__delete-icon-button">
                                        <img onClick={() => setActiveSelectIcon(!activeSelectIcon)} alt={'иконка крестик'} src={activeSelectIcon ? iconSelectName : iconDeleteBnt} className="table-users-select-name-group__icon-delete"/>
                                        <p className="table-users-select-name-group__delete-btn">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN}</p>
                                        <button className="table-users-select-name-group__delete-btn-mobile">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN_MOBILE}</button>
                                    </div> : null}
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}
export default GroupUsersSelectNameGroup;