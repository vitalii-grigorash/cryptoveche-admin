import React, { useEffect, useState } from "react";
import AddUsers from "../AddUsers/AddUsers";
import * as Organizations from '../../Api/Organizations';
import UsersTable from "../UsersTable/UsersTable";

const AdminsSettings = (props) => {

    const {
        constants,
        requestHelper,
        org,
        reloadOrgPage
    } = props;

    const [isAddAdminOpen, setAddAdminOpen] = useState(false);
    const [usersToAdd, setUsersToAdd] = useState([]);
    const [orgAdmins, setOrgAdmins] = useState([]);

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
            .then((data) => {
                console.log(data);
                reloadOrgPage();
                setAddAdminOpen(false);
                setUsersToAdd([]);
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }

    useEffect(() => {
        if (org.users !== undefined) {
            const users = [];
            org.users.forEach((user) => {
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
    }, [org])

    function onRemoveUserClick(userForRemove) {
        console.log(userForRemove);
        // const filteredUsers = usersToAdd.filter(user => user.id !== userForRemove.id);
        // changeUsersToAddArr(filteredUsers);
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
    }

    function onSaveAdminsChangeClick() {

        const newAdmins = [];
        const adminsToDelete = [];

        const body = {
            id: org.id,
            users: {
                admins: newAdmins,
                adminsToDelete: adminsToDelete
            }
        }

        orgAdmins.forEach((user) => {
            if (user.isAdmin) {
                const isUserSuperAdmin = org.admins.find(admin => admin.id === user.id);
                if (isUserSuperAdmin === undefined) {
                    newAdmins.push(user.id);
                }
            } else {
                const isUserSuperAdmin = org.admins.find(admin => admin.id === user.id);
                if (isUserSuperAdmin !== undefined) {
                    adminsToDelete.push(user.id);
                }
            }
        })

        console.log(newAdmins);
        console.log(adminsToDelete);

        // Всё готово, осталось отправить запрос на API и проверить

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
                        <button className="admins-setting__save-new-admins-button" onClick={onSaveNewAdminsButtonClick}>{constants.ORG_SETTINGS.BUTTON_SAVE_NEW_ADMINS}</button>
                    )}
                </>
            )}
            <UsersTable
                constants={constants}
                onRemoveUserClick={onRemoveUserClick}
                handleChangeSuperUser={handleChangeSuperUser}
                users={orgAdmins}
            />
            <button className="admins-setting__save-new-admins-button admins-setting__save-new-admins-button_change" onClick={onSaveAdminsChangeClick}>{constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE}</button>
        </div>
    )
}

export default AdminsSettings;
