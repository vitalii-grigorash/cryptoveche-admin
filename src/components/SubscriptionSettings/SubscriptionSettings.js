import React, { useState } from "react";
import * as Organizations from '../../Api/Organizations';

const SubscriptionSettings = (props) => {

    const {
        constants,
        requestHelper,
        org,
        reloadOrgPage
    } = props;

    const [subscriptionFrom, setSubscriptionFrom] = useState('');
    const [subscriptionTo, setSubscriptionTo] = useState('');

    function subscriptionFromChange(evt) {
        setSubscriptionFrom(evt.target.value);
    }

    function subscriptionToChange(evt) {
        setSubscriptionTo(evt.target.value);
    }

    function saveChanges() {
        const startTime = subscriptionFrom !== '' ? subscriptionFrom.split('-').join('.') : null;
        const endTime = subscriptionTo !== '' ? subscriptionTo.split('-').join('.') : null;
        const body = {
            permission: {
                eventsLimit: 100,
                votersLimit: 500,
                startTime: startTime,
                endTime: endTime,
                // зачем нужен статус и в каком формате его отправлять?
                status: "ACTIVE"
            },
            org_id: org.id
        };
        console.log(body);
        requestHelper(Organizations.addSubscription, body)
            .then(() => {
                reloadOrgPage();
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }

    return (
        <div className="subscription-settings">
            <h2 className="subscription-settings__heading">{constants.ORG_SETTINGS.SUBSCRIPTION_SETTINGS}</h2>
            <p className="subscription-settings__date-heading">{constants.ORG_SETTINGS.DATE_HEADING}</p>
            <div className="subscription-settings__date-main-continer">
                <div className="subscription-settings__date-continer">
                    <p className="subscription-settings__date-text">{constants.ORG_SETTINGS.DATE_FROM}</p>
                    <input
                        type="date"
                        className="subscription-settings__date-input"
                        onChange={subscriptionFromChange}
                        value={subscriptionFrom}
                    />
                </div>
                <div className="subscription-settings__date-continer">
                    <p className="subscription-settings__date-text">{constants.ORG_SETTINGS.DATE_TO}</p>
                    <input
                        type='date'
                        className="subscription-settings__date-input"
                        onChange={subscriptionToChange}
                        value={subscriptionTo}
                    />
                </div>
            </div>
            <button className="subscription-settings__save-changes-button" onClick={saveChanges}>{constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE}</button>
        </div>
    )
}

export default SubscriptionSettings;
