import React, {useState} from "react";
import iconPlus from "../../img/AddNewVoteIconPlus.svg";
import iconDelete from "../../img/AddNewVoteDeleteIconMobile.svg";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";
import AddNewVoteExpandList from "../AddNewVoteExpandList/AddNewVoteExpandList";

const AddNewVoteAddObserversCountingMembers = (props) => {

    const {
        constants,
        titleObserversCountingMembers
    } = props;

    const [activeAddObservers, setActiveAddObservers] = useState(false);
    const [activeAddUsersBtn, setActiveAddUsersBtn] = useState(false);
    const [activeAddGroupBtn, setActiveAddGroupBnt] = useState(true);
    const [activeSelectUsersGroup, setActiveSelectUserGroup] = useState(false);

    const onShowSelectAddUsers = () => {
        setActiveAddUsersBtn(true)
        setActiveAddGroupBnt(false)
    }

    const onShowSelectAddGroup = () => {
        setActiveAddUsersBtn(false)
        setActiveAddGroupBnt(true)
    }

    return (
        <>
            <div className="add-new-vote-add-observers">
                <div onClick={() => setActiveAddObservers(!activeAddObservers)} className="add-new-vote-add-observers__add-list-voters-active-btn">
                    <img className="add-new-vote-add-observers__materials-vote-icon-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON}/>
                    <p className="add-new-vote__add-list-voters-active-btn-label">{titleObserversCountingMembers}</p>
                </div>
                <div className={activeAddObservers ? "add-new-vote-add-observers__buttons-table-block active" : "add-new-vote-add-observers__buttons-table-block"}>
                    <div className="add-new-vote-add-observers__add-users-group-btn">
                        <div onClick={onShowSelectAddUsers} className={activeAddUsersBtn ? "add-new-vote__settings-button-add-users-group active" : "add-new-vote__settings-button-add-users-group"}>
                            <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_USERS_BTN}</p>
                        </div>
                        <div onClick={onShowSelectAddGroup} className={activeAddGroupBtn ? "add-new-vote__settings-button-add-users-group active" : "add-new-vote__settings-button-add-users-group"}>
                            <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_GROUP_BTN}</p>
                        </div>
                    </div>
                    <div className="add-new-vote__select-role">
                        <label className="add-new-vote__label">{activeAddGroupBtn ? `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_GROUP_USERS}` : `${constants.ADD_NEW_VOTE.ADD_NEW_VOTE_LIST_USERS}`}
                        </label>
                        <div onClick={() => setActiveSelectUserGroup(!activeSelectUsersGroup)} className="add-new-vote__time-zone-select-container">
                            <p className="add-new-vote__time-zone-select-value"></p>
                            <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt={constants.GENERAL.ALT_ICON}/>
                            <div className={activeSelectUsersGroup ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                                <p className="add-new-vote__time-zone-option"></p>
                            </div>
                        </div>
                    </div>
                    {activeAddGroupBtn && (
                   <AddNewVoteExpandList
                       constants={constants}
                   />
                    )}
                    <div className="add-new-vote-add-observers__top-pagination">
                        {/*<PaginationBlock/>   */}
                        Верхнняя пагинация
                    </div>
                    <div className="add-new-vote-add-observers__list-users-table">
                        <div className="add-new-vote-add-observers__list-users-table-header">
                            <p className="add-new-vote-add-observers__list-users-table-header-username">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_USERNAME_TABLE}</p>
                            <p className="add-new-vote-add-observers__list-users-table-header-action">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ACTION_TABLE}</p>
                        </div>
                        <div className="add-new-vote-add-observers__list-users-table-row">
                            <div className="add-new-vote-add-observers__table-row-username-email">
                                <p className="add-new-vote-add-observers__table-row-username">Тимошина Мария Владимировна</p>
                                <p className="add-new-vote-add-observers__table-row-email">anyauskowa@yandex.ru</p>
                            </div>
                            <div className="add-new-vote-add-observers__table-row-action">
                                <img className="add-new-vote-add-observers__table-row-action-icon" src={iconDelete} alt={constants.GENERAL.ALT_ICON}/>
                                <p className="add-new-vote-add-observers__table-row-action-delete">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_DELETE_BTN_TABLE}</p>
                            </div>
                        </div>
                    </div>
                    <div className="add-new-vote-add-observers__bottom-pagination">
                        {/*<PaginationBlock/>   */}
                        Нижняя пагинация
                    </div>
                </div>
            </div>
        </>
    )}
export default AddNewVoteAddObserversCountingMembers;