import React, { useState, useEffect } from "react";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";
import iconDeleteTable from "../../img/AddNewVoteDeleteIconMobile.svg";
import AddNewVoteExpandList from "../AddNewVoteExpandList/AddNewVoteExpandList";
import PaginationBlock from "../PaginationBlock/PaginationBlock";

const AddNewVoteAddObserversCountingMembers = (props) => {

    const {
        constants,
        usersListForSelect,
        groupsListForSelect,
        usersList,
        addFromList,
        addFromGroup,
        addFromExpandList,
        deleteFromTable,
        requestHelper,
        listSearch
    } = props;

    const [activeAddUsersBtn, setActiveAddUsersBtn] = useState(true);
    const [activeAddGroupBtn, setActiveAddGroupBnt] = useState(false);
    const [isUsersDropDownActive, setUsersDropDownActive] = useState(false);
    const [isGroupsDropDownActive, setGroupsDropDownActive] = useState(false);
    const [isExpandListActive, setExpandListActive] = useState(false);
    const [usersSelectedValue, setUsersSelectedValue] = useState(constants.ADD_NEW_VOTE.SELECT_LIST_USERS);
    const [groupSelectedValue, setGroupSelectedValue] = useState(constants.ADD_NEW_VOTE.SELECT_LIST_GROUP);
    const [usersForRender, setUsersForRender] = useState([]);
    const [usersSearchInput, setUsersSearchInput] = useState('');
    const [resultsShow, setResultsShow] = useState(5);
    const [result, setResult] = useState(5);
    const [pageCount, setPageCount] = useState(1);
    const [selectedResultsShow, setSelectedResultsShow] = useState(5);
    const [showResultsFrom, setShowResultsFrom] = useState(0);

    function handleShowResultsFrom(value) {
        setShowResultsFrom(value);
    }

    function handleResultsShow(value) {
        setResultsShow(value);
    }

    function onChoiceClick(value) {
        setResultsShow(value);
        handleResultsShow(value);
        setResult(value);
        setSelectedResultsShow(value);
        setShowResultsFrom(0);
        handleShowResultsFrom(0);
        setPageCount(1);
    }

    function searchInput(value) {
        setUsersSearchInput(value);
    }

    function showPrevResults() {
        if (resultsShow <= result) {
            return
        } else {
            setShowResultsFrom(showResultsFrom - result);
            handleShowResultsFrom(showResultsFrom - result);
            setResultsShow(resultsShow - result);
            handleResultsShow(resultsShow - result);
            setPageCount(pageCount - 1);
        }
    }

    function showNextResults() {
        if (resultsShow >= usersForRender.length) {
            return
        } else {
            setShowResultsFrom(0 + resultsShow);
            handleShowResultsFrom(0 + resultsShow);
            setResultsShow(result + resultsShow);
            handleResultsShow(result + resultsShow);
            setPageCount(pageCount + 1);
        }
    }

    useEffect(() => {
        if (usersSearchInput === '') {
            setUsersForRender(usersList);
        } else {
            const dataForRender = [];
            usersList.forEach((user) => {
                if (user.email.toLowerCase().includes(usersSearchInput.toLowerCase())) {
                    dataForRender.push(user);
                } else if (user.last_name.toLowerCase().includes(usersSearchInput.toLowerCase())) {
                    dataForRender.push(user);
                } else if (user.first_name.toLowerCase().includes(usersSearchInput.toLowerCase())) {
                    dataForRender.push(user);
                } else if (user.second_name.toLowerCase().includes(usersSearchInput.toLowerCase())) {
                    dataForRender.push(user);
                }
            })
            setUsersForRender(dataForRender);
        }
    },
        [
            usersSearchInput,
            usersList
        ]
    );

    const onShowSelectAddUsers = () => {
        setActiveAddUsersBtn(true);
        setActiveAddGroupBnt(false);
        setUsersDropDownActive(false);
        setGroupsDropDownActive(false);
    }

    const onShowSelectAddGroup = () => {
        setActiveAddUsersBtn(false);
        setActiveAddGroupBnt(true);
        setUsersDropDownActive(false);
        setGroupsDropDownActive(false);
    }

    function handleOpenExpandList() {
        if (isExpandListActive) {
            setExpandListActive(false);
        } else {
            setExpandListActive(true);
        }
    }

    function handleUsersDropDownActive() {
        if (isUsersDropDownActive) {
            setUsersDropDownActive(false);
        } else {
            setUsersDropDownActive(true);
        }
    }

    function handleGroupsDropDownActive() {
        if (isGroupsDropDownActive) {
            setGroupsDropDownActive(false);
        } else {
            setGroupsDropDownActive(true);
        }
    }

    useEffect(() => {
        if (usersList.length === 0) {
            setUsersSelectedValue(constants.ADD_NEW_VOTE.SELECT_LIST_USERS);
            setGroupSelectedValue(constants.ADD_NEW_VOTE.SELECT_LIST_GROUP);
        }
        // eslint-disable-next-line
    }, [usersList.length])

    function addUsersFromGroup(group) {
        setGroupSelectedValue(group.group_title);
        const users = usersList;
        group.users.forEach((user) => {
            if ((usersList.find(userFromList => userFromList.id === user.id)) === undefined) {
                if (user.last_name === undefined) {
                    const userToAdd = {
                        email: user.email,
                        first_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_FIRST_NAME}`,
                        id: user.id,
                        last_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_LAST_NAME}`,
                        second_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_SECOND_NAME}`,
                        weight: 1,
                        userFields: user.userFields
                    }
                    users.push(userToAdd);
                } else {
                    const userToAdd = {
                        email: user.email,
                        first_name: user.first_name,
                        id: user.id,
                        last_name: user.last_name,
                        second_name: user.second_name,
                        weight: 1,
                        userFields: user.userFields
                    }
                    users.push(userToAdd);
                }
            }
        })
        addFromGroup(users);
    }

    function addUsersFromList(user) {
        setUsersSelectedValue(`${user.email} - ${user.last_name} ${user.first_name} ${user.second_name}`);
        const users = usersList;
        if ((usersList.find(userFromList => userFromList.id === user.id)) === undefined) {
            const userToAdd = {
                email: user.email,
                first_name: user.first_name,
                id: user.id,
                last_name: user.last_name,
                second_name: user.second_name,
                weight: 1,
                userFields: user.userFields
            }
            users.push(userToAdd);
        }
        addFromList(users);
    }

    return (
        <div className="add-new-vote__user-settings-add-users-group-block">
            <div className="add-new-vote__user-settings-add-users-group-btn">
                <div onClick={onShowSelectAddUsers} className={activeAddUsersBtn ? "add-new-vote__settings-button-add-users-group active" : "add-new-vote__settings-button-add-users-group"}>
                    <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_USERS_BTN}</p>
                </div>
                <div onClick={onShowSelectAddGroup} className={activeAddGroupBtn ? "add-new-vote__settings-button-add-users-group active" : "add-new-vote__settings-button-add-users-group"}>
                    <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ADD_GROUP_BTN}</p>
                </div>
            </div>
            {activeAddUsersBtn && (
                <div className="add-new-vote__select-role">
                    <label className="add-new-vote__label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_LIST_USERS}</label>
                    <div onClick={handleUsersDropDownActive} className="add-new-vote__time-zone-select-container">
                        <p className="add-new-vote__time-zone-select-value">{usersSelectedValue}</p>
                        <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt={constants.GENERAL.ALT_ICON} />
                        <div className={isUsersDropDownActive ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                            {usersListForSelect.map((user) => (
                                <div key={user.id} className="add-new-vote__time-zone-option-container" onClick={() => addUsersFromList(user)}>
                                    <p className="add-new-vote__time-zone-option">{user.email} - {user.last_name} {user.first_name} {user.second_name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {activeAddGroupBtn && (
                <div className="add-new-vote__select-role">
                    <label className="add-new-vote__label">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_GROUP_USERS}</label>
                    <div onClick={handleGroupsDropDownActive} className="add-new-vote__time-zone-select-container">
                        <p className="add-new-vote__time-zone-select-value">{groupSelectedValue}</p>
                        <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt={constants.GENERAL.ALT_ICON} />
                        <div className={isGroupsDropDownActive ? "add-new-vote__time-zone-options-container" : "add-new-vote__time-zone-options-container hidden"}>
                            {groupsListForSelect.length === 0 ? (
                                <div className="add-new-vote__time-zone-option-container">
                                    <p className="add-new-vote__time-zone-option">{constants.ADD_NEW_VOTE.NO_GROUPS}</p>
                                </div>
                            ) : (
                                <>
                                    {groupsListForSelect.map((group) => (
                                        <div key={group.id} className="add-new-vote__time-zone-option-container" onClick={() => addUsersFromGroup(group)}>
                                            <p className="add-new-vote__time-zone-option">{group.group_title} ({constants.ADD_NEW_VOTE.USERS_IN_GROUP}: {group.member_count})</p>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div onClick={handleOpenExpandList} className="add-new-vote__expand-list-container">
                <div className="add-new-vote__expand-list-icon" />
                <p className="add-new-vote__expand-list-text">{constants.ADD_NEW_VOTE.EXPAND_LIST_TITLE}</p>
            </div>
            {isExpandListActive && (
                <AddNewVoteExpandList
                    constants={constants}
                    requestHelper={requestHelper}
                    addUsersFromExpandList={addFromExpandList}
                />
            )}
            {usersList.length !== 0 && (
                <>
                    <div className="add-new-vote__top-pagination">
                        <PaginationBlock
                            sortList={usersForRender}
                            search={listSearch}
                            searchInput={searchInput}
                            onChoiceClick={onChoiceClick}
                            selectedResultsShow={selectedResultsShow}
                            pageCount={pageCount}
                            showPrevResults={showPrevResults}
                            showNextResults={showNextResults}
                            constants={constants}
                        />
                    </div>
                    {usersForRender.length !== 0 ? (
                        <div className="add-new-vote__list-users-table">
                            <div className="add-new-vote__list-users-table-header">
                                <p className="add-new-vote__list-users-table-header-username">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_USERNAME_TABLE}</p>
                                <p className="add-new-vote__list-users-table-header-action">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_ACTION_TABLE}</p>
                            </div>
                            {usersForRender.sort(function (a, b) {
                                const emailA = a.email.toLowerCase();
                                const emailB = b.email.toLowerCase();
                                if (emailA < emailB)
                                    return -1
                                if (emailA > emailB)
                                    return 1
                                return 0
                            }).slice(showResultsFrom, resultsShow).map((user) => (
                                <div key={user.id} className="add-new-vote__list-users-table-row">
                                    <div className="add-new-vote__table-row-username-email">
                                        <p className="add-new-vote__table-row-username">{user.last_name} {user.first_name} {user.second_name}</p>
                                        <p className="add-new-vote__table-row-email">{user.email}</p>
                                    </div>
                                    <div className="add-new-vote__table-row-action">
                                        <img className="add-new-vote__table-row-action-icon-delete" onClick={() => deleteFromTable(user)} src={iconDeleteTable} alt={constants.GENERAL.ALT_ICON} />
                                        <p className="add-new-vote__table-row-action-delete" onClick={() => deleteFromTable(user)}>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_DELETE_BTN_TABLE}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="add-new-vote__no-users-container">
                            <p className="add-new-vote__no-users">{constants.ADD_NEW_ORG.ADD_NEW_ORG_NO_USERS}<span className="name-org-input__red-star"> *</span></p>
                        </div>
                    )}
                    <div className="add-new-vote__bottom-pagination">
                        <div className="add-new-organization__bottom-pagination">
                            <PaginationBlock
                                sortList={usersForRender}
                                search={listSearch}
                                searchInput={searchInput}
                                onChoiceClick={onChoiceClick}
                                selectedResultsShow={selectedResultsShow}
                                pageCount={pageCount}
                                showPrevResults={showPrevResults}
                                showNextResults={showNextResults}
                                constants={constants}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default AddNewVoteAddObserversCountingMembers;
