import React, {useState} from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";
import iconPlus from "../../img/AddNewVoteIconPlus.svg";
import iconClip from "../../img/AddNewVoteIconClip.svg";

const AddNewVote = (props) => {

    const {
        constants
    } = props;

    const [activeGeneralSettings, setActiveGeneralSettings] = useState(false);
    const [hideSelectOrg, setHideSelectOrg] = useState(true);
    const [hideSelectOrgBtn, setHideSelectOrgBnt] = useState(true);

    function showSelectOrgForm() {
        setHideSelectOrg(false)
        setActiveGeneralSettings(true)
        setHideSelectOrgBnt(false)
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
                                        <div className="add-new-vote__time-zone-select-container">
                                            <p className="add-new-vote__time-zone-select-value">Выбранная нами организация</p>
                                            <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                            <div className="add-new-vote__time-zone-options-container">
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
                                    <label className="add-new-vote__name-new-vote-label">Название голосования<span className="add-new-vote__red-start">*</span></label>
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
                                    <div className="add-new-vote__time-zone-select-container">
                                        <p className="add-new-vote__time-zone-select-value">Тайное голосование</p>
                                        <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                        <div className="add-new-vote__time-zone-options-container">
                                            <p className="add-new-vote__time-zone-option"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="add-new-vote__select-datetime-events-vote">
                                    <div className="add-new-vote__select-datatime">
                                        <label className="add-new-vote__select-datatime-label">Начало регистрации<span className="add-new-vote__red-star">*</span></label>
                                        <input className="add-new-vote__select-datatime-field" type={"datetime-local"}/>
                                    </div>
                                    <div className="add-new-vote__select-datatime">
                                        <label className="add-new-vote__select-datatime-label">Окончание регистрации<span className="add-new-vote__red-star">*</span></label>
                                        <input className="add-new-vote__select-datatime-field" type={"datetime-local"}/>
                                    </div>
                                    <div className="add-new-vote__select-datatime">
                                        <label className="add-new-vote__select-datatime-label">Начало голосования<span className="add-new-vote__red-star">*</span></label>
                                        <input className="add-new-vote__select-datatime-field" type={"datetime-local"}/>
                                    </div>
                                    <div className="add-new-vote__select-datatime">
                                        <label className="add-new-vote__select-datatime-label">Окончание голосования<span className="add-new-vote__red-star">*</span></label>
                                        <input className="add-new-vote__select-datatime-field" type={"datetime-local"}/>
                                    </div>
                                </div>
                                <div className="add-new-vote__checkboxes-block">
                                    <div className="add-new-vote__column-checkbox-superuser">
                                        <label className='add-new-vote__checkbox_container'>
                                            <input type="checkbox"/>
                                            <span className='add-new-vote__checkmark' />
                                        </label>
                                        <p className="add-new-vote__label-checkbox">Возможность отмены электронной регистрации</p>
                                    </div>
                                    <div className="add-new-vote__column-checkbox-superuser">
                                        <label className='add-new-vote__checkbox_container'>
                                            <input type="checkbox"/>
                                            <span className='add-new-vote__checkmark' />
                                        </label>
                                        <p className="add-new-vote__label-checkbox">Возможность изменения голоса</p>
                                    </div>
                                </div>
                                <div className="add-new-vote__attach-material-vote">
                                    <img className="add-new-vote__material-vote-icon" src={iconClip} alt={constants.GENERAL.ALT_ICON}/>
                                    <p className="add-new-vote__material-vote-label">ПРИКРЕПИТЬ МАТЕРИАЛЫ ГОЛОСОВАНИЯ</p>
                                </div>
                                <h3 className="add-new-vote__title-select-org">Настройки пользователей</h3>
                                <div className="add-new-vote__user-settings-button-block">
                                    <div className="add-new-vote__settings-button-close-open-list">
                                        <p>Закрытые списки</p>
                                    </div>
                                    <div className="add-new-vote__settings-button-close-open-list">
                                        <p>Открытые списки </p>
                                    </div>
                                    <div className="add-new-vote__settings-button-add-users-group">
                                        <p>Добавить пользователей</p>
                                    </div>
                                    <div className="add-new-vote__settings-button-add-users-group">
                                        <p>Добавить группу </p>
                                    </div>
                                </div>
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
                                <div className="add-new-vote__select-type-vote-ynq">
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
    </div>
    )
}
export default AddNewVote;