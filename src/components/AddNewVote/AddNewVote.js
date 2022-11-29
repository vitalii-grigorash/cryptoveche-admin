import React, {useState} from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import AddNewVoteQuestionType from "../AddNewVoteQuestionType/AddNewVoteQuestionType";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";
import iconPlus from "../../img/AddNewVoteIconPlus.svg";
import iconClip from "../../img/AddNewVoteIconClip.svg";
import iconDelete from "../../img/AddNewOrgDeleteIcon.svg";
import * as excel from "xlsx";

const AddNewVote = (props) => {

    const {
        constants
    } = props;

    const [activeGeneralSettings, setActiveGeneralSettings] = useState(false);
    const [hideSelectOrg, setHideSelectOrg] = useState(true);
    const [hideSelectOrgBtn, setHideSelectOrgBnt] = useState(true);
    const [showAddMaterialsVotes, setShowAddMaterialsVotes] = useState(false);
    const [activeSelectLinkDocument, setActiveLinkDocument] = useState(false);
    const [activeSelectOrg, setActiveSelectOrg] = useState(false);
    const [activeCloseList, setActiveCloseList] = useState(true);
    const [activeOpenList, setActiveOpenList] = useState(false);
    const [activeAddUsersBtn, setActiveAddUsersBtn] = useState(false);
    const [activeAddGroupBtn, setActiveAddGroupBnt] = useState(true);
    const [activeSelectQuorum, setActiveSelectQuorum] = useState(false);
    const [activeModalTypeQuestion, setActiveModalTypeQuestion] = useState(false);
    const [isExcelFileSelected, setExcelFileSelected] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState(constants.ADD_NEW_ORG.ADD_NEW_ORG_SELECT_FILE);
    const [usersToFind, setUsersToFind] = useState([]);
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    function onSelectFileHandler(e) {
        var files = e.target.files, f = files[0];
        setSelectedFileName(files[0].name);
        setExcelFileSelected(true);
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
            const uniqАrr = [...new Set(validUsersEmails)];
            setUsersToFind(uniqАrr);
        };
        reader.readAsBinaryString(f);
    }

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
                                    <div className="add-new-vote__materials-vote-btn">
                                        <img className="add-new-vote__materials-vote-icon-clip" src={iconClip} alt={constants.GENERAL.ALT_ICON}/>
                                        <p onClick={() => setShowAddMaterialsVotes(!showAddMaterialsVotes)} className="add-new-vote__materials-vote-label">ПРИКРЕПИТЬ МАТЕРИАЛЫ ГОЛОСОВАНИЯ</p>
                                        <img className={showAddMaterialsVotes ? "add-new-vote__materials-vote-icon-plus" : "add-new-vote__materials-vote-icon-plus hidden"} alt={constants.GENERAL.ALT_ICON} src={iconPlus}/>
                                    </div>
                                    {showAddMaterialsVotes && (
                                        <div className="add-new-vote__materials-vote-add-link-document">
                                            <div className="add-new-vote__name-materials-vote">
                                                <div>
                                                    <input className="add-new-vote__name-materials-vote-input" placeholder={'Заголовок вспомогательного материала'} type={'text'}/>
                                                    <span className="add-new-vote__red-star">*</span>
                                                </div>
                                                <div className="add-new-vote__delete-materials-btn">
                                                    <img className="add-new-vote__delete-materials-icon" src={iconDelete} alt={constants.GENERAL.ALT_ICON}/>
                                                    <p>УДАЛИТЬ</p>
                                                </div>
                                            </div>
                                            <div className="add-new-vote__link-document-block">
                                                <div onClick={() => setActiveLinkDocument(!activeSelectLinkDocument)} className="add-new-vote__time-zone-select-container _add-materials-vote">
                                                    <p className="add-new-vote__time-zone-select-value">Документ</p>
                                                    <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                                    <div className={activeSelectLinkDocument ? "add-new-vote__time-zone-options-container _add-document-link" : "add-new-vote__time-zone-options-container hidden"}>
                                                        <p className="add-new-vote__time-zone-option">Cсылка</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    {/*<input className="add-new-vote__add-link" type={'text'}/>*/}
                                                    <div className="add-new-vote__excel-add-container">
                                                        <input
                                                            className="add-new-vote__excel-add-input"
                                                            id="excel__file"
                                                            type="file"
                                                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                            onChange={(e) => onSelectFileHandler(e)}
                                                        />
                                                        <label htmlFor="excel__file" className="add-new-vote__excel-add-input-container">
                                                            <div className="add-new-vote__excel-add-input-file-name-container">
                                                                <p className={`add-new-vote__excel-add-input-file-name-text ${isExcelFileSelected && 'add-new-vote__excel-add-input-file-name-text_selected'}`}>{selectedFileName}</p>
                                                            </div>
                                                            <div className="add-new-vote__excel-add-input-button">
                                                                <p className='add-new-vote__excel-add-input-button-text'>{constants.ADD_NEW_ORG.ADD_NEW_ORG_LOAD_BTN}</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
                                            <div onClick={() => setActiveSelectQuorum(!activeSelectQuorum)} className="add-new-vote__time-zone-select-container">
                                                <p className="add-new-vote__time-zone-select-value"></p>
                                                <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                                <div className={activeSelectQuorum ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                                    <p className="add-new-vote__time-zone-option"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="add-new-vote__checkbox">
                                            <label className='add-new-vote__checkbox_container'>
                                                <input type="checkbox"/>
                                                <span className='add-new-vote__checkmark' />
                                            </label>
                                            <p className="add-new-vote__label-checkbox">Весовое голосование</p>
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