import React, { useEffect, useState } from "react";
import AddUsers from "../AddUsers/AddUsers";
import * as Organizations from '../../Api/Organizations';
import UsersTable from "../UsersTable/UsersTable";

const AdminsSettings = (props) => {

    const {
        constants,
        requestHelper,
        org,
        currentUser,
        authAs,
        reloadOrgPage
    } = props;

    const [isAddAdminOpen, setAddAdminOpen] = useState(false);
    const [usersToAdd, setUsersToAdd] = useState([]);
    const [orgAdmins, setOrgAdmins] = useState([]);
    const [newAdmins, setNewAdmins] = useState([]);
    const [adminsToDelete, setAdminsToDelete] = useState([]);
    const [isSaveButtonActive, setSaveButtonActive] = useState(false);
    const [newAdminsButtonText, setNewAdminsButtonText] = useState(constants.ORG_SETTINGS.BUTTON_SAVE_NEW_ADMINS);
    const [changeAdminsStatusButtonText, setChangeAdminsStatusButtonText] = useState(constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE);
    const [deleteUserButtonText, setDeleteUserButtonText] = useState(constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN);
    const [deleteUserButtonTextMobile, setDeleteUserButtonTextMobile] = useState(constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN_MOBILE);
    const [deleteUserId, setDeleteUserId] = useState('');
    const [adminId, setAdminId] = useState('');

    useEffect(() => {
        if (org.admins !== undefined) {
            if (authAs === 'admin') {
                const isOrgSuperUser = org.admins.find(admin => admin.id === currentUser.id);
                if (isOrgSuperUser === undefined) {
                    setAdminId('');
                } else {
                    setAdminId(isOrgSuperUser.id);
                }
            }
        } else if (authAs === 'superAdmin') {
            setAdminId('');
        }
    }, [org, authAs, currentUser.id])

    function handleShowAddAdmin() {
        if (isAddAdminOpen) {
            setAddAdminOpen(false);
        } else {
            setAddAdminOpen(true);
        }
    }

    function changeUsersToAddArr(users) {
        setUsersToAdd(users);
    }

    function onSaveNewAdminsButtonClick() {
        setNewAdminsButtonText(constants.ORG_SETTINGS.BUTTON_LOADING);
        const usersToSend = [];
        const adminsToSend = [];
        usersToAdd.forEach((user) => {
            if (user.isAdmin) {
                adminsToSend.push(user.email);
                usersToSend.push(user.email);
            } else {
                usersToSend.push(user.email);
            }
        })
        const newUsersData = {
            id: org.id,
            users: usersToSend,
            admins: adminsToSend
        }
        const body = {
            newUsersData: newUsersData
        }
        requestHelper(Organizations.addNewOrgAdmins, body)
            .then(() => {
                reloadOrgPage();
                setAddAdminOpen(false);
                setUsersToAdd([]);
                setNewAdmins([]);
                setAdminsToDelete([]);
            })
            .catch((err) => {
                throw new Error(err.message);
            })
            .finally(() => {
                setNewAdminsButtonText(constants.ORG_SETTINGS.BUTTON_SAVE_NEW_ADMINS);
            })
    }

    useEffect(() => {
        if (org.users !== undefined) {
            const users = [];
            org.users.forEach((user) => {
                if (user.last_name === undefined) {
                    const newUser = {
                        id: user.email,
                        email: user.email,
                        first_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_FIRST_NAME}`,
                        last_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_LAST_NAME}`,
                        second_name: `${constants.ADD_NEW_ORG.ADD_NEW_ORG_DEFAULT_SECOND_NAME}`,
                        isAdmin: false,
                        userFields: user.userFields
                    }
                    users.push(newUser);
                } else {
                    const newUser = {
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        second_name: user.second_name,
                        isAdmin: false,
                        userFields: user.userFields
                    }
                    users.push(newUser);
                }
            })
            users.forEach((user) => {
                org.admins.forEach((admin) => {
                    if (user.id === admin.id) {
                        user.isAdmin = true
                    }
                })
            })
            setOrgAdmins(users);
        }
        // eslint-disable-next-line
    }, [org])

    function onRemoveUserClick(userForRemove) {
        setDeleteUserId(userForRemove.id);
        setDeleteUserButtonText(constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN_PROCESS);
        setDeleteUserButtonTextMobile(constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN_MOBILE_PROCESS);
        const body = {
            id: org.id,
            users: {
                usersToDelete: [userForRemove.id]
            }
        }
        requestHelper(Organizations.deleteUserFromOrg, body)
            .then(() => {
                reloadOrgPage();
                setNewAdmins([]);
                setAdminsToDelete([]);
            })
            .catch((err) => {
                throw new Error(err.message);
            })
            .finally(() => {
                setDeleteUserButtonText(constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN);
                setDeleteUserButtonTextMobile(constants.ADD_NEW_ORG.ADD_NEW_ORG_DELETE_BTN_MOBILE);
            })
    }

    function handleChangeSuperUser(userForChange) {
        const foundUser = orgAdmins.find(user => user.id === userForChange.id)
        const filteredUsers = orgAdmins.filter(user => user.id !== userForChange.id);
        if (foundUser.isAdmin === false) {
            foundUser.isAdmin = true;
        } else {
            foundUser.isAdmin = false;
        }
        filteredUsers.push(foundUser);
        setOrgAdmins(filteredUsers);
        const adminsToAdd = [];
        const adminsToRemove = [];
        filteredUsers.forEach((user) => {
            if (user.isAdmin) {
                const isUserSuperAdmin = org.admins.find(admin => admin.id === user.id);
                if (isUserSuperAdmin === undefined) {
                    adminsToAdd.push(user.id);
                }
            } else {
                const isUserSuperAdmin = org.admins.find(admin => admin.id === user.id);
                if (isUserSuperAdmin !== undefined) {
                    adminsToRemove.push(user.id);
                }
            }
        })
        setNewAdmins(adminsToAdd);
        setAdminsToDelete(adminsToRemove);
    }

    useEffect(() => {
        if (newAdmins.length !== 0) {
            setSaveButtonActive(true);
        } else if (adminsToDelete.length !== 0) {
            setSaveButtonActive(true);
        } else {
            setSaveButtonActive(false);
        }
    }, [adminsToDelete.length, newAdmins.length])

    function onSaveAdminsChangeClick() {
        setChangeAdminsStatusButtonText(constants.ORG_SETTINGS.BUTTON_LOADING);
        const body = {
            id: org.id,
            users: {
                admins: newAdmins,
                adminsToDelete: adminsToDelete
            }
        }
        requestHelper(Organizations.changeOrgAdminsStatus, body)
            .then((data) => {
                console.log(data);
                reloadOrgPage();
                setNewAdmins([]);
                setAdminsToDelete([]);
            })
            .catch((err) => {
                throw new Error(err.message);
            })
            .finally(() => {
                setChangeAdminsStatusButtonText(constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE);
            })
    }

    return (
        <div className="admins-settings">
            <h2 className="admins-settings__heading">{constants.ORG_SETTINGS.ADMINS_LIST}</h2>
            <div className="admins-settings__add-admin-container" onClick={handleShowAddAdmin}>
                <div className="admins-settings__add-admin-icon" />
                <p className="admins-settings__add-admin-text">{constants.ORG_SETTINGS.ADD_ADMIN}</p>
            </div>
            {isAddAdminOpen && (
                <AddUsers
                    constants={constants}
                    requestHelper={requestHelper}
                    changeUsersToAddArr={changeUsersToAddArr}
                    usersToAdd={usersToAdd}
                />
            )}
            {isAddAdminOpen && (
                <>
                    {usersToAdd.length !== 0 && (
                        <button className="admins-setting__save-new-admins-button" onClick={onSaveNewAdminsButtonClick}>{newAdminsButtonText}</button>
                    )}
                </>
            )}
            <UsersTable
                constants={constants}
                onRemoveUserClick={onRemoveUserClick}
                handleChangeSuperUser={handleChangeSuperUser}
                users={orgAdmins}
                deleteUserButtonText={deleteUserButtonText}
                deleteUserButtonTextMobile={deleteUserButtonTextMobile}
                deleteUserId={deleteUserId}
                adminId={adminId}
            />
            {isSaveButtonActive && (
                <button className="admins-setting__save-new-admins-button admins-setting__save-new-admins-button_change" onClick={onSaveAdminsChangeClick}>{changeAdminsStatusButtonText}</button>
            )}
        </div>
    )
}

export default AdminsSettings;
