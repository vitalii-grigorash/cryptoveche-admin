import React, { useEffect, useState } from "react";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import iconDelete from '../../img/AddNewOrgDeleteIcon.svg';
import { Validation } from '../../utils/Validation';

const UsersTable = (props) => {

    const {
        constants,
        onRemoveUserClick,
        handleChangeSuperUser,
        users
    } = props;

    const usersSearch = Validation();
    const [usersForRender, setUsersForRender] = useState([]);
    const [usersSearchInput, setUsersSearchInput] = useState('');
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(5);
    const [result, setResult] = useState(5);
    const [pageCount, setPageCount] = useState(1);
    const [selectedResultsShow, setSelectedResultsShow] = useState(5);

    function handleShowResultsFrom(value) {
        setShowResultsFrom(value);
    }

    function handleResultsShow(value) {
        setResultsShow(value);
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

    useEffect(() => {
        if (usersSearchInput === '') {
            setUsersForRender(users);
        } else {
            const dataForRender = [];
            users.forEach((user) => {
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
            users,
        ]
    );

    return (
        <div className="users-table">
            <div className="add-new-organization__top-pagination">
                <PaginationBlock
                    sortList={usersForRender}
                    search={usersSearch}
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
                <div className="add-new-organization__table-list-users">
                    {usersForRender.sort(function (a, b) {
                        var emailA = a.email.toLowerCase(), emailB = b.email.toLowerCase()
                        if (emailA < emailB)
                            return -1
                        if (emailA > emailB)
                            return 1
                        return 0
                    }).slice(showResultsFrom, resultsShow).map((user) => (
                        <div key={user.id} className="table-list-users">
                            <div className="table-list-users__name-user-icon-lock">
                                <p className="table-list-users__column-name">{user.last_name} {user.first_name} {user.second_name}</p>
                            </div>
                            <p className="table-list-users__column-e-mail">{user.email}</p>
                            <div className="table-list-users__column-checkbox-superuser">
                                <label className='table-list-users__checkbox_container'>
                                    <input
                                        checked={user.isAdmin}
                                        onChange={() => handleChangeSuperUser(user)}
                                        type="checkbox"
                                    />
                                    <span className='table-list-users__checkmark' />
                                </label>
                                <p className="column-checkbox-superuser__label">{constants.ADD_NEW_ORG.ADD_NEW_ORG_SUPERUSER}</p>
                            </div>
                            <div className="table-list-users__delete-icon-button" onClick={() => onRemoveUserClick(user)}>
                                <img alt={constants.GENERAL.ALT_ICON} src={iconDelete} className="delete-icon-button__icon-delete" />
                                <p className="delete-icon-button__delete-btn">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN}</p>
                                <p className="delete-icon-button__delete-btn-mobile">{constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN_MOBILE}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="table-list-users__no-users-container">
                    <p className="table-list-users__no-users">{constants.ADD_NEW_ORG.ADD_NEW_ORG_NO_USERS}<span className="name-org-input__red-star"> *</span></p>
                </div>
            )}
            <div className="add-new-organization__bottom-pagination">
                <PaginationBlock
                    sortList={usersForRender}
                    search={usersSearch}
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
    )
}

export default UsersTable;
