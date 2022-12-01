import React, {useState} from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import AddNewVoteQuestionType from "../AddNewVoteQuestionType/AddNewVoteQuestionType";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";
import iconPlusTable from "../../img/AddNewVoteIconPlusTable.svg";
import iconMinusTable from "../../img/AddNewVoteIconMinusTable.svg";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import AddNewVoteAddObserversCountingMembers from "../AddNewVoteAddObserversCountingMembers/AddNewVoteAddObserversCountingMembers";
import AddNewVoteExpandList from "../AddNewVoteExpandList/AddNewVoteExpandList";
import orgSearchIconMobile from "../../img/PaginationSearchIcon.svg";
import AddNewVoteAddMaterialsVote from "../AddNewVoteAddMaterialsVote/AddNewVoteAddMaterialsVote";

const AddNewVote = (props) => {

    const {
        constants
    } = props;

    const [activeGeneralSettings, setActiveGeneralSettings] = useState(false);
    const [hideSelectOrg, setHideSelectOrg] = useState(true);
    const [hideSelectOrgBtn, setHideSelectOrgBnt] = useState(true);
    const [activeSelectOrg, setActiveSelectOrg] = useState(false);
    const [activeCloseList, setActiveCloseList] = useState(true);
    const [activeOpenList, setActiveOpenList] = useState(false);
    const [activeAddUsersBtn, setActiveAddUsersBtn] = useState(false);
    const [activeAddGroupBtn, setActiveAddGroupBnt] = useState(true);
    const [activeSelectUsersGroup, setActiveSelectUserGroup] = useState(false);
    const [activeSelectQuorum, setActiveSelectQuorum] = useState(false);
    const [activeModalTypeQuestion, setActiveModalTypeQuestion] = useState(false);

    function showSelectOrgForm() {
        setHideSelectOrg(false)
        setActiveGeneralSettings(true)
        setHideSelectOrgBnt(false)
    }

    const onShowOpenList = () => {
        setActiveOpenList(true)
        setActiveCloseList(false)
    }

    const onShowCloseList = () => {
        setActiveOpenList(false)
        setActiveCloseList(true)
    }

    const onShowSelectAddUsers = () => {
        setActiveAddUsersBtn(true)
        setActiveAddGroupBnt(false)
    }

    const onShowSelectAddGroup = () => {
        setActiveAddUsersBtn(false)
        setActiveAddGroupBnt(true)
    }

    return (
        <div className="add-new-vote__container _container">
           <GeneralTitleAllPages
               titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_ADD_VOTE}
               firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
               secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_ADD_VOTE}
           />
            <p className={activeGeneralSettings ? "add-new-vote__current-name-org active" : "add-new-vote__current-name-org"}>
                Название организации</p>
                <div className="add-new-vote__general-settings-questions-block">
                    <div className="add-new-vote__general-settings">
                        <h3 className="add-new-vote__title-select-org">{activeGeneralSettings ? 'Общие настройки' : `${constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_SELECT_ORG}`}</h3>
                        {hideSelectOrg && (
                                <>
                                    <div className="add-new-vote__select-role">
                                        <label className="add-new-vote__label">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_USERS_ORG}
                                            <span className="add-new-vote__red-star">*</span>
                                        </label>
                                        <div onClick={() => setActiveSelectOrg(!activeSelectOrg)} className="add-new-vote__time-zone-select-container">
                                            <p className="add-new-vote__time-zone-select-value">Выбранная нами организация</p>
                                            <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                            <div className={activeSelectOrg ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                                <p className="add-new-vote__time-zone-option"></p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        {hideSelectOrgBtn && (
                                <>
                                    <div className="add-new-vote__button-block">
                                        <button onClick={showSelectOrgForm} className="add-new-vote__button-next">{constants.ADD_NEW_GROUP_USERS.ADD_NEW_GROUP_NEXT_BTN}</button>
                                    </div>
                                </>
                            )}
                        {activeGeneralSettings && (
                            <>
                                <div className="add-new-vote__name-new-vote">
                                    <label className="add-new-vote__name-new-vote-label">Название голосования<span className="add-new-vote__red-star">*</span></label>
                                    <input className="add-new-vote__name-new-vote-field" placeholder={'Введите название голосования'}/>
                                </div>
                                <div className="add-new-vote__select-open-close-vote-buttons">
                                    <div className="add-new-vote__close-vote-btn">
                                        <p>Тайное голосование</p>
                                    </div>
                                    <div className="add-new-vote__open-vote-btn">
                                        <p>Открытое голосование</p>
                                    </div>
                                </div>
                                <div className="add-new-vote__select-role">
                                    <label className="add-new-vote__label">Условие кворума
                                        <span className="add-new-vote__red-star">*</span>
                                    </label>
                                    <div onClick={() => setActiveSelectQuorum(!activeSelectQuorum)} className="add-new-vote__time-zone-select-container">
                                        <p className="add-new-vote__time-zone-select-value">Любое количество</p>
                                        <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                        <div className={activeSelectQuorum ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                            <p className="add-new-vote__time-zone-option">50% + 1</p>
                                            <p className="add-new-vote__time-zone-option">50%</p>
                                            <p className="add-new-vote__time-zone-option">2/3</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="add-new-vote__select-datetime-events-vote">
                                    <div className="add-new-vote__select-datetime">
                                        <label className="add-new-vote__select-datetime-label">Начало регистрации<span className="add-new-vote__red-star">*</span></label>
                                        <input className="add-new-vote__select-datetime-field" type={"datetime-local"}/>
                                    </div>
                                    <div className="add-new-vote__select-datetime">
                                        <label className="add-new-vote__select-datetime-label">Окончание регистрации<span className="add-new-vote__red-star">*</span></label>
                                        <input className="add-new-vote__select-datetime-field" type={"datetime-local"}/>
                                    </div>
                                    <div className="add-new-vote__select-datetime">
                                        <label className="add-new-vote__select-datetime-label">Начало голосования<span className="add-new-vote__red-star">*</span></label>
                                        <input className="add-new-vote__select-datetime-field" type={"datetime-local"}/>
                                    </div>
                                    <div className="add-new-vote__select-datetime">
                                        <label className="add-new-vote__select-datetime-label">Окончание голосования<span className="add-new-vote__red-star">*</span></label>
                                        <input className="add-new-vote__select-datetime-field" type={"datetime-local"}/>
                                    </div>
                                </div>
                                <div className="add-new-vote__checkboxes-block">
                                    <div className="add-new-vote__checkbox">
                                        <label className='add-new-vote__checkbox_container'>
                                            <input type="checkbox"/>
                                            <span className='add-new-vote__checkmark' />
                                        </label>
                                        <p className="add-new-vote__label-checkbox">Возможность отмены электронной регистрации</p>
                                    </div>
                                    <div className="add-new-vote__checkbox">
                                        <label className='add-new-vote__checkbox_container'>
                                            <input type="checkbox"/>
                                            <span className='add-new-vote__checkmark'/>
                                        </label>
                                        <p className="add-new-vote__label-checkbox">Возможность изменения голоса</p>
                                    </div>
                                </div>
                                <div className="add-new-vote__materials-vote-block">
                                    <AddNewVoteAddMaterialsVote
                                        constants={constants}
                                        nameMaterialsVote={'ПРИКРЕПИТЬ МАТЕРИАЛЫ ГОЛОСОВАНИЯ'}
                                    />
                                </div>
                                <h3 className="add-new-vote__title-select-org">Настройки пользователей</h3>
                                <div className="add-new-vote__user-settings-open-close-btn">
                                    <div onClick={onShowCloseList} className={activeCloseList ? "add-new-vote__settings-button-close-open-list active" : "add-new-vote__settings-button-close-open-list"}>
                                        <p>Закрытые списки</p>
                                    </div>
                                    <div onClick={onShowOpenList} className={activeOpenList ? "add-new-vote__settings-button-close-open-list active" : "add-new-vote__settings-button-close-open-list"}>
                                        <p>Открытые списки</p>
                                    </div>
                                </div>
                                {activeCloseList && (
                                    <div className="add-new-vote__user-settings-add-users-group-block">
                                        <div className="add-new-vote__user-settings-add-users-group-btn">
                                            <div onClick={onShowSelectAddUsers} className={activeAddUsersBtn ? "add-new-vote__settings-button-add-users-group active" : "add-new-vote__settings-button-add-users-group"}>
                                                <p>Добавить пользователей</p>
                                            </div>
                                            <div onClick={onShowSelectAddGroup} className={activeAddGroupBtn ? "add-new-vote__settings-button-add-users-group active" : "add-new-vote__settings-button-add-users-group"}>
                                                <p>Добавить группу</p>
                                            </div>
                                        </div>
                                        <div className="add-new-vote__select-role">
                                            <label className="add-new-vote__label">{activeAddGroupBtn ? 'Группа пользователей' : 'Список пользователей'}
                                            </label>
                                            <div onClick={() => setActiveSelectUserGroup(!activeSelectUsersGroup)} className="add-new-vote__time-zone-select-container">
                                                <p className="add-new-vote__time-zone-select-value"></p>
                                                <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                                <div className={activeSelectUsersGroup ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                                    <p className="add-new-vote__time-zone-option"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="add-new-vote__weight-voting-checkbox">
                                            <div className="add-new-vote__checkbox">
                                                <label className='add-new-vote__checkbox_container'>
                                                    <input type="checkbox"/>
                                                    <span className='add-new-vote__checkmark' />
                                                </label>
                                                <p className="add-new-vote__label-checkbox">Разрешить другим пользователям присоединяться к голосованию по ссылке</p>
                                            </div>
                                            <div className="add-new-vote__checkbox">
                                                <label className='add-new-vote__checkbox_container'>
                                                    <input type="checkbox"/>
                                                    <span className='add-new-vote__checkmark' />
                                                </label>
                                                <p className="add-new-vote__label-checkbox">Весовое голосование</p>
                                            </div>
                                        </div>
                                        {activeAddGroupBtn && (
                                       <AddNewVoteExpandList
                                           constants={constants}
                                       />
                                        )}
                                       <div className="add-new-vote__top-pagination">
                                            {/*<PaginationBlock/>   */}
                                           Верхнняя пагинация
                                       </div>
                                        <div className="add-new-vote__list-users-table">
                                            <div className="add-new-vote__list-users-table-header">
                                                <p className="add-new-vote__list-users-table-header-username">ФИО</p>
                                                <p className="add-new-vote__list-users-table-header-weight-vote">Вес голоса</p>
                                                <p className="add-new-vote__list-users-table-header-action">Действие</p>
                                            </div>
                                            <div className="add-new-vote__list-users-table-row">
                                                <div className="add-new-vote__table-row-username-email">
                                                    <p className="add-new-vote__table-row-username">Тимошина Мария Владимировна</p>
                                                    <p className="add-new-vote__table-row-email">anyauskowa@yandex.ru</p>
                                                </div>
                                                <div className="add-new-vote__table-row-count">
                                                    <img className="add-new-vote__table-row-count-minus" src={iconMinusTable} alt={constants.GENERAL.ALT_ICON}/>
                                                    <p className="add-new-vote__table-row-count-number">3</p>
                                                    <img className="add-new-vote__table-row-count-plus" src={iconPlusTable} alt={constants.GENERAL.ALT_ICON}/>
                                                </div>
                                                <div className="add-new-vote__table-row-action">
                                                    <p className="add-new-vote__table-row-action-delete">УДАЛИТЬ</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="add-new-vote__bottom-pagination">
                                            {/*<PaginationBlock/>   */}
                                            Нижняя пагинация
                                        </div>
                                    </div>
                                )}
                                {activeOpenList && (
                                    <div className="add-new-vote__open-list-block">
                                        <label className="add-new-vote__open-list-label-input">Максимальное количество участников</label>
                                        <input className="add-new-vote__open-list-input" placeholder={'1'} type={"number"} min={1} max={9999} step={1}/>
                                        <label className="add-new-vote__open-list-info">После создания голосования вам будет доступна пригласительная ссылка</label>
                                    </div>
                                )}
                                <AddNewVoteAddObserversCountingMembers constants={constants} titleObserversCountingMembers={'ДОБАВИТЬ НАБЛЮДАТЕЛЕЙ'}/>
                                <AddNewVoteAddObserversCountingMembers constants={constants} titleObserversCountingMembers={'ДОБАВИТЬ ЧЛЕНОВ СЧЕТНОЙ КОММИСИИ'}/>
                            </>
                            )}
                    </div>
                    {activeGeneralSettings && (
                        <div className="add-new-vote__questions">
                            <h3 className="add-new-vote__title-questions">Вопросы</h3>
                            {/*<div className="add-new-vote__add-question-button">*/}
                            {/*    <div className="add-new-vote__icon-bnt-block">*/}
                            {/*        <img src={iconPlus} className="" alt={iconPlus}/>*/}
                            {/*        <p className="add-new-vote__add-question-label">Добавить вопрос</p>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="add-new-vote__select-type-questions">
                                <div onClick={() => setActiveModalTypeQuestion(true)}  className="add-new-vote__select-type-vote-ynq">
                                    <p>Голосование</p>
                                    <p>по вопросу</p>
                                </div>
                                <div className="add-new-vote__select-type-vote-none">
                                    <p>Произвольный</p>
                                    <p>вопрос</p>
                                </div>
                                <div className="add-new-vote__select-type-vote-position_single">
                                    <p>На позицию</p>
                                    <p>(одна кандидатура)</p>
                                </div>
                                <div className="add-new-vote__select-type-vote-grid">Сетка</div>
                                <div className="add-new-vote__select-type-vote-radio_grid">Радиосетка</div>
                                <div className="add-new-vote__select-type-vote-position_multiple">
                                    <p>На позицию</p>
                                    <p>(несколько кандидатур)</p>
                                </div>
                                <div className="add-new-vote__select-type-vote-same_positions">
                                    <p>На несколько позиций</p>
                                    <p>(несколько кандидатур)</p>
                                </div>
                            </div>
                        </div>
                )}
        </div>
            <AddNewVoteQuestionType
                activeModalTypeQuestion={activeModalTypeQuestion}
                setActiveModalTypeQuestion={setActiveModalTypeQuestion}
                constants={constants}
            />
    </div>
    )
}
export default AddNewVote;