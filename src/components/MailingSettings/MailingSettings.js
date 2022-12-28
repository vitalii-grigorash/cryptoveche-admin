import React, { useEffect, useState } from "react";
import * as Organizations from '../../Api/Organizations';

const MailingSettings = (props) => {
    const {
        constants,
        requestHelper,
        org,
        reloadOrgPage,
        isOrgSuperAdmin
    } = props;

    const [isCreateVoteActive, setCreateVoteActive] = useState(false);
    const [isStartVoteActive, setStartVoteActive] = useState(false);
    const [isEndVoteActive, setEndVoteActive] = useState(false);
    const [isStartRegActive, setStartRegActive] = useState(false);
    const [isEndRegActive, setEndRegActive] = useState(false);
    const [notificationTime, setNotificationTime] = useState([]);

    function idGenerate(arr) {
        if (arr.length < 1) {
            return 1;
        } else {
            const allIdArray = arr.map((arr) => {
                return arr.id
            });
            return Math.max(...allIdArray) + 1;
        }
    }

    useEffect(() => {
        setCreateVoteActive(org.config.mail.on_creating);
        setStartVoteActive(org.config.mail.on_start_voting);
        setEndVoteActive(org.config.mail.on_end_voting);
        setStartRegActive(org.config.mail.on_start_registration);
        setEndRegActive(org.config.mail.on_end_registration);
        const notificationArr = [];
        org.config.mail.after_start_voting.forEach(((value) => {
            const after = {
                id: idGenerate(notificationArr),
                afterStart: true,
                value: value
            }
            notificationArr.push(after);
        }))
        org.config.mail.to_end_voting.forEach(((value) => {
            const before = {
                id: idGenerate(notificationArr),
                afterStart: false,
                value: value
            }
            notificationArr.push(before);
        }))
        setNotificationTime(notificationArr);
    },
        [
            org.config.mail.on_creating,
            org.config.mail.on_start_voting,
            org.config.mail.on_end_voting,
            org.config.mail.on_start_registration,
            org.config.mail.on_end_registration,
            org.config.mail.after_start_voting,
            org.config.mail.to_end_voting
        ]
    )

    function handleCreateVoteActive() {
        if (isCreateVoteActive) {
            setCreateVoteActive(false);
        } else {
            setCreateVoteActive(true);
        }
    }

    function handleStartVoteActive() {
        if (isStartVoteActive) {
            setStartVoteActive(false);
        } else {
            setStartVoteActive(true);
        }
    }

    function handleEndVoteActive() {
        if (isEndVoteActive) {
            setEndVoteActive(false);
        } else {
            setEndVoteActive(true);
        }
    }

    function handleStartRegActive() {
        if (isStartRegActive) {
            setStartRegActive(false);
        } else {
            setStartRegActive(true);
        }
    }

    function handleEndRegActive() {
        if (isEndRegActive) {
            setEndRegActive(false);
        } else {
            setEndRegActive(true);
        }
    }

    function notificationInputChange(e, id) {
        const foundedEl = notificationTime.find(el => el.id === id);
        const filteredArray = notificationTime.filter(el => el.id !== id);
        foundedEl.value = e.target.value
        filteredArray.push(foundedEl);
        setNotificationTime(filteredArray);
    }

    function handleOpenOptions(id) {
        const el = document.getElementById(id);
        if (el.classList.contains('mailing-settings__alert-options-container_active')) {
            el.classList.remove('mailing-settings__alert-options-container_active');
        } else {
            el.classList.add('mailing-settings__alert-options-container_active');
        }
    }

    function selectAfterStartNotification(id) {
        const foundedEl = notificationTime.find(el => el.id === id);
        const filteredArray = notificationTime.filter(el => el.id !== id);
        foundedEl.afterStart = true;
        filteredArray.push(foundedEl);
        setNotificationTime(filteredArray);
    }

    function selectBeforeEndNotification(id) {
        const foundedEl = notificationTime.find(el => el.id === id);
        const filteredArray = notificationTime.filter(el => el.id !== id);
        foundedEl.afterStart = false;
        filteredArray.push(foundedEl);
        setNotificationTime(filteredArray);
    }

    function addNotification() {
        const notification = {
            id: idGenerate(notificationTime),
            afterStart: true,
            value: ''
        }
        setNotificationTime([...notificationTime, notification]);
    }

    function removeNotification(id) {
        const filteredArray = notificationTime.filter(el => el.id !== id);
        setNotificationTime(filteredArray);
    }

    function saveChanges() {
        const afterStartNotifications = [];
        const beforeEndNotifications = [];
        notificationTime.forEach((notification) => {
            if (notification.afterStart) {
                if (notification.value !== '') {
                    afterStartNotifications.push(Number(notification.value));
                }
            } else {
                if (notification.value !== '') {
                    beforeEndNotifications.push(Number(notification.value));
                }
            }
        })
        const afterStart = afterStartNotifications.filter(function (item, pos) {
            return afterStartNotifications.indexOf(item) === pos;
        })
        const beforeEnd = beforeEndNotifications.filter(function (item, pos) {
            return beforeEndNotifications.indexOf(item) === pos;
        })
        const body = {
            mail: {
                enabled: true,
                on_creating: isCreateVoteActive,
                on_start_registration: isStartRegActive,
                on_end_registration: isEndRegActive,
                on_start_voting: isStartVoteActive,
                on_end_voting: isEndVoteActive,
                after_start_voting: afterStart,
                to_end_voting: beforeEnd
            },
            org_id: org.id
        }
        requestHelper(Organizations.updateMailingSettings, body)
            .then(() => {
                reloadOrgPage();
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }

    return (
        <>
            {isOrgSuperAdmin ? (
                <div className="mailing-settings">
                    <h2 className="mailing-settings__heading">{constants.ORG_SETTINGS.MAILING_SETTINGS}</h2>
                    <div className="mailing-settings__container">
                        <div className="mailing-settings__standard-alerts-container">
                            <p className="mailing-settings__alerts-heading">{constants.ORG_SETTINGS.STANDART_ALERTS}</p>
                            <div className="mailing-settings__checkbox-container" onClick={handleCreateVoteActive}>
                                <div className={`mailing-settings__checkbox ${isCreateVoteActive && 'mailing-settings__checkbox_active'}`} />
                                <p className="mailing-settings__checkbox-text">{constants.ORG_SETTINGS.CREATE_VOTE}</p>
                            </div>
                            <div className="mailing-settings__checkbox-container" onClick={handleStartVoteActive}>
                                <div className={`mailing-settings__checkbox ${isStartVoteActive && 'mailing-settings__checkbox_active'}`} />
                                <p className="mailing-settings__checkbox-text">{constants.ORG_SETTINGS.START_VOTE}</p>
                            </div>
                            <div className="mailing-settings__checkbox-container" onClick={handleEndVoteActive}>
                                <div className={`mailing-settings__checkbox ${isEndVoteActive && 'mailing-settings__checkbox_active'}`} />
                                <p className="mailing-settings__checkbox-text">{constants.ORG_SETTINGS.END_VOTE}</p>
                            </div>
                            <div className="mailing-settings__checkbox-container" onClick={handleStartRegActive}>
                                <div className={`mailing-settings__checkbox ${isStartRegActive && 'mailing-settings__checkbox_active'}`} />
                                <p className="mailing-settings__checkbox-text">{constants.ORG_SETTINGS.START_REG}</p>
                            </div>
                            <div className="mailing-settings__checkbox-container" onClick={handleEndRegActive}>
                                <div className={`mailing-settings__checkbox ${isEndRegActive && 'mailing-settings__checkbox_active'}`} />
                                <p className="mailing-settings__checkbox-text">{constants.ORG_SETTINGS.END_REG}</p>
                            </div>
                        </div>
                        <div className="mailing-settings__interim-alerts-container">
                            <p className="mailing-settings__alerts-heading">{constants.ORG_SETTINGS.INTERIM_ALERTS}</p>
                            <div className="mailing-settings__interim-alerts-options-container">
                                {notificationTime.sort(function (a, b) {
                                    const aId = a.id;
                                    const bId = b.id;
                                    if (aId < bId)
                                        return -1
                                    if (aId > bId)
                                        return 1
                                    return 0
                                }).map((notification) => (
                                    <div className="mailing-settings__alert-container" key={notification.id}>
                                        <div className="mailing-settings__alert-minutes-container">
                                            <input
                                                type='number'
                                                className={`mailing-settings__alert-value-input ${notification.value === '' && 'mailing-settings__alert-value-input_error'}`}
                                                placeholder="10"
                                                value={notification.value}
                                                onChange={(e) => notificationInputChange(e, notification.id)}
                                            />
                                            <p className="mailing-settings__alert-minutes">{constants.ORG_SETTINGS.MINUTE}</p>
                                        </div>
                                        <div className="mailing-settings__alert-options-main-container">
                                            <div className="mailing-settings__alert-selected-option-container" onClick={() => handleOpenOptions(notification.id)}>
                                                <p className="mailing-settings__alert-selected-option-value">{notification.afterStart ? constants.ORG_SETTINGS.AFTER_START : constants.ORG_SETTINGS.BEFORE_END}</p>
                                                <div className="mailing-settings__alert-selected-option-arrow" />
                                                <div className="mailing-settings__alert-options-container" id={notification.id}>
                                                    <div className="mailing-settings__alert-option-container" onClick={(e) => selectAfterStartNotification(notification.id)}>
                                                        <p className="mailing-settings__alert-option">{constants.ORG_SETTINGS.AFTER_START}</p>
                                                    </div>
                                                    <div className="mailing-settings__alert-option-container" onClick={(e) => selectBeforeEndNotification(notification.id)}>
                                                        <p className="mailing-settings__alert-option">{constants.ORG_SETTINGS.BEFORE_END}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mailing-settings__alert-remove-button" onClick={() => removeNotification(notification.id)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mailing-settings__add-notification-container" onClick={addNotification}>
                                <div className="mailing-settings__add-notification-icon" />
                                <p className="mailing-settings__add-notification-text">{constants.ORG_SETTINGS.ADD_NOTIFICATION}</p>
                            </div>
                        </div>
                    </div>
                    <button className="mailing-settings__save-changes-button" onClick={saveChanges}>{constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE}</button>
                </div>
            ) : (
                <div className="mailing-settings">
                    <h2 className="mailing-settings__heading">{constants.ORG_SETTINGS.MAILING_SETTINGS}</h2>
                    <div className="mailing-settings__container">
                        <div className="mailing-settings__standard-alerts-container">
                            <p className="mailing-settings__alerts-heading">{constants.ORG_SETTINGS.STANDART_ALERTS}</p>
                            <div className="mailing-settings__checkbox-container-default">
                                <div className={`mailing-settings__checkbox-default ${isCreateVoteActive && 'mailing-settings__checkbox_active-default'}`} />
                                <p className="mailing-settings__checkbox-text">{constants.ORG_SETTINGS.CREATE_VOTE}</p>
                            </div>
                            <div className="mailing-settings__checkbox-container-default">
                                <div className={`mailing-settings__checkbox-default ${isStartVoteActive && 'mailing-settings__checkbox_active-default'}`} />
                                <p className="mailing-settings__checkbox-text">{constants.ORG_SETTINGS.START_VOTE}</p>
                            </div>
                            <div className="mailing-settings__checkbox-container-default">
                                <div className={`mailing-settings__checkbox-default ${isEndVoteActive && 'mailing-settings__checkbox_active-default'}`} />
                                <p className="mailing-settings__checkbox-text">{constants.ORG_SETTINGS.END_VOTE}</p>
                            </div>
                            <div className="mailing-settings__checkbox-container-default">
                                <div className={`mailing-settings__checkbox-default ${isStartRegActive && 'mailing-settings__checkbox_active-default'}`} />
                                <p className="mailing-settings__checkbox-text">{constants.ORG_SETTINGS.START_REG}</p>
                            </div>
                            <div className="mailing-settings__checkbox-container-default">
                                <div className={`mailing-settings__checkbox-default ${isEndRegActive && 'mailing-settings__checkbox_active-default'}`} />
                                <p className="mailing-settings__checkbox-text">{constants.ORG_SETTINGS.END_REG}</p>
                            </div>
                        </div>
                        <div className="mailing-settings__interim-alerts-container">
                            <p className="mailing-settings__alerts-heading">{constants.ORG_SETTINGS.INTERIM_ALERTS}</p>
                            <div className="mailing-settings__interim-alerts-options-container">
                                {notificationTime.sort(function (a, b) {
                                    const aId = a.id;
                                    const bId = b.id;
                                    if (aId < bId)
                                        return -1
                                    if (aId > bId)
                                        return 1
                                    return 0
                                }).map((notification) => (
                                    <div className="mailing-settings__alert-container" key={notification.id}>
                                        <div className="mailing-settings__alert-minutes-container">
                                            <input
                                                type='number'
                                                className={`mailing-settings__alert-value-input ${notification.value === '' && 'mailing-settings__alert-value-input_error'}`}
                                                placeholder="10"
                                                value={notification.value}
                                                onChange={(e) => notificationInputChange(e, notification.id)}
                                                disabled={true}
                                            />
                                            <p className="mailing-settings__alert-minutes">{constants.ORG_SETTINGS.MINUTE}</p>
                                        </div>
                                        <div className="mailing-settings__alert-options-main-container">
                                            <div className="mailing-settings__alert-selected-option-container-default">
                                                <p className="mailing-settings__alert-selected-option-value">{notification.afterStart ? constants.ORG_SETTINGS.AFTER_START : constants.ORG_SETTINGS.BEFORE_END}</p>
                                                <div className="mailing-settings__alert-selected-option-arrow" />
                                                <div className="mailing-settings__alert-options-container" id={notification.id}>
                                                    <div className="mailing-settings__alert-option-container">
                                                        <p className="mailing-settings__alert-option">{constants.ORG_SETTINGS.AFTER_START}</p>
                                                    </div>
                                                    <div className="mailing-settings__alert-option-container">
                                                        <p className="mailing-settings__alert-option">{constants.ORG_SETTINGS.BEFORE_END}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mailing-settings__alert-remove-button-default"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mailing-settings__add-notification-container-default">
                                <div className="mailing-settings__add-notification-icon" />
                                <p className="mailing-settings__add-notification-text">{constants.ORG_SETTINGS.ADD_NOTIFICATION}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default MailingSettings;
