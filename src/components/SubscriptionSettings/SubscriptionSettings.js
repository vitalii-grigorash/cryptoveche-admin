import React, { useState } from "react";
import * as Organizations from '../../Api/Organizations';
import { Validation } from '../../utils/Validation';

const SubscriptionSettings = (props) => {

    const {
        constants,
        requestHelper,
        org,
        reloadOrgPage
    } = props;

    const votersLimit = Validation();
    const eventsLimit = Validation();
    const messageLimit = Validation();
    const [subscriptionFrom, setSubscriptionFrom] = useState('');
    const [subscriptionTo, setSubscriptionTo] = useState('');
    const [isMessageCheckboxActive, setMessageCheckboxActive] = useState(false);

    function subscriptionFromChange(evt) {
        setSubscriptionFrom(evt.target.value);
    }

    function subscriptionToChange(evt) {
        setSubscriptionTo(evt.target.value);
    }

    function handleMessageCheckboxActive() {
        if (isMessageCheckboxActive) {
            setMessageCheckboxActive(false);
        } else {
            setMessageCheckboxActive(true);
        }
    }

    // Раскомментировать метод, если нужно прибавлять к дате 1 день для отправки на API.

    // function datePlus (date) {
    //     const defaultDate = new Date(date);
    //     const datePlus = defaultDate.setDate(defaultDate.getDate() + 1);
    //     const newDate = new Date(datePlus);
    //     const dateForSend = `${newDate.getFullYear() + '.' + (newDate.getMonth() + 1) + '.' + newDate.getDate()}`;
    //     return dateForSend;
    // }

    function saveChanges() {
        const startTime = subscriptionFrom !== '' ? subscriptionFrom.split('-').join('.') : null;
        const endTime = subscriptionTo !== '' ? subscriptionTo.split('-').join('.') : null;

        console.log(messageLimit.value);

        // если нужно прибавить к дате 1 день, использовать startDate и endDate вместо startTime и endTime для отправки на API
        // так как API почему-то возвращает дату за минусом 1 день. Уточнить почему...

        // const startDate = datePlus(startTime);
        // const endDate = datePlus(endTime);
        // console.log(startDate);
        // console.log(endDate);

        const body = {
            permission: {
                eventsLimit: eventsLimit.value,
                votersLimit: votersLimit.value,
                startTime: startTime,
                endTime: endTime,
                // зачем нужно отправлять статус?
                status: "ACTIVE"
            },
            org_id: org.id
        };
        requestHelper(Organizations.addSubscription, body)
            .then((res) => {
                console.log(res);
                reloadOrgPage();
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }

    return (
        <div className="subscription-settings">
            <h2 className="subscription-settings__heading">{constants.ORG_SETTINGS.SUBSCRIPTION_SETTINGS}</h2>
            <div className="subscription-settings__date-main-continer">
                <div className="subscription-settings__date-continer">
                    <p className="subscription-settings__date-text">{constants.ORG_SETTINGS.DATE_START}</p>
                    <input
                        type="date"
                        className="subscription-settings__date-input"
                        onChange={subscriptionFromChange}
                        value={subscriptionFrom}
                    />
                </div>
                <div className="subscription-settings__date-continer">
                    <p className="subscription-settings__date-text">{constants.ORG_SETTINGS.DATE_END}</p>
                    <input
                        type='date'
                        className="subscription-settings__date-input"
                        onChange={subscriptionToChange}
                        value={subscriptionTo}
                    />
                </div>
            </div>
            <div className="subscription-settings__permissions-main-container">
                <div className="subscription-settings__permission-container">
                    <p className="subscription-settings__permission-heading">{constants.ORG_SETTINGS.VOTERS_LIMIT}</p>
                    <input
                        type="number"
                        className="subscription-settings__permission-input"
                        name="voters-limit"
                        value={votersLimit.value}
                        onChange={votersLimit.onChange}
                    />
                </div>
                <div className="subscription-settings__permission-container">
                    <p className="subscription-settings__permission-heading">{constants.ORG_SETTINGS.EVENTS_LIMIT}</p>
                    <input
                        type="number"
                        className="subscription-settings__permission-input"
                        name="events-limit"
                        value={eventsLimit.value}
                        onChange={eventsLimit.onChange}
                    />
                </div>
            </div>
            <div className="subscription-settings__message-container">
                <div className="subscription-settings__message-checkbox-container" onClick={handleMessageCheckboxActive}>
                    <div className={`subscription-settings__message-checkbox ${isMessageCheckboxActive && 'subscription-settings__message-checkbox_active'}`} />
                    <p className="subscription-settings__message-checkbox-text">{constants.ORG_SETTINGS.MESSAGE_CHECKBOX}</p>
                </div>
                {isMessageCheckboxActive && (
                    <div className="subscription-settings__message-input-container">
                        <p className="subscription-settings__message-input-heading">{constants.ORG_SETTINGS.MESSAGE_INPUT}</p>
                        <input
                            type="number"
                            className="subscription-settings__message-input"
                            name="message-limit"
                            value={messageLimit.value}
                            onChange={messageLimit.onChange}
                        />
                    </div>
                )}
            </div>
            <button className="subscription-settings__save-changes-button" onClick={saveChanges}>{constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE}</button>
        </div>
    )
}

export default SubscriptionSettings;
