import React, { useState, useEffect } from "react";
import timeZoneRu from '../../utils/TimeZoneData/TimeZoneRu.json';
import timeZoneEn from '../../utils/TimeZoneData/TimeZoneEn.json';
import { Validation } from '../../utils/Validation';

const GeneralSettings = (props) => {

    const {
        constants,
        requestHelper,
        org,
        reloadOrgPage
    } = props;

    console.log(org);

    const email = Validation();
    const description = Validation();
    const [observers, setObservers] = useState(false);
    const [counters, setCounters] = useState(false);
    const [templates, setTemplates] = useState(false);
    const [invalidBallots, setInvalidBallots] = useState(false);
    const [prolong, setProlong] = useState(false);
    const [minutesOption, setMinutesOption] = useState({});
    const [timeZone, setTimeZone] = useState([]);
    const [utcOffset, setUtcOffset] = useState({});
    const [isMinutesOptionsOpen, setMinutesOptionsOpen] = useState(false);
    const [isTimeZoneOptionsOpen, setTimeZoneOptionsOpen] = useState(false);
    const [saveChangesErrorMessage, setSaveChangesErrorMessage] = useState('');
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const minutesOptions = [
        { value: '5', text: `${'5 ' + constants.ORG_SETTINGS.MINUTES}` },
        { value: '10', text: `${'10 ' + constants.ORG_SETTINGS.MINUTES}` },
        { value: '15', text: `${'15 ' + constants.ORG_SETTINGS.MINUTES}` },
        { value: '30', text: `${'30 ' + constants.ORG_SETTINGS.MINUTES}` },
        { value: '60', text: `${'60 ' + constants.ORG_SETTINGS.MINUTES}` }
    ]

    function handleMinutesOptionSelect(option) {
        const minutes = minutesOptions.find(value => value.value === option.toString());
        setMinutesOption(minutes);
    }

    function setOffset(offset) {
        const localOffset = timeZone.find(value => value.VALUE === offset.toString());
        setUtcOffset(localOffset);
    }

    useEffect(() => {
        if (localStorage.getItem('lang')) {
            const storageLang = localStorage.getItem('lang');
            const lang = JSON.parse(storageLang);
            if (lang.lang === 'en') {
                setTimeZone(timeZoneEn);
            } else {
                setTimeZone(timeZoneRu);
            }
        } else {
            setTimeZone(timeZoneRu);
        }
    }, []);

    useEffect(() => {
        console.log('use effect');
        handleMinutesOptionSelect(org.config.general.statistics_step);
        email.setValue(org.settings.email);
        description.setValue(org.settings.description);
    },
        // eslint-disable-next-line
        [
            org.config.general.statistics_step,
            org.settings.description,
            org.settings.email
        ]
    )

    useEffect(() => {
        if (timeZone.length !== 0) {
            setOffset(org.config.general.utc_offset);
        }
        // eslint-disable-next-line
    }, [timeZone.length, org.config.general.utc_offset])

    function handleChangeObservers() {
        if (observers) {
            setObservers(false);
        } else {
            setObservers(true);
        }
    }

    function handleChangeCounters() {
        if (counters) {
            setCounters(false);
        } else {
            setCounters(true);
        }
    }

    function handleChangeTemplates() {
        if (templates) {
            setTemplates(false);
        } else {
            setTemplates(true);
        }
    }

    function handleChangeInvalidBallots() {
        if (invalidBallots) {
            setInvalidBallots(false);
        } else {
            setInvalidBallots(true);
        }
    }

    function handleChangeProlong() {
        if (prolong) {
            setProlong(false);
        } else {
            setProlong(true);
        }
    }

    function handleOpenMinutesOptions() {
        if (isMinutesOptionsOpen) {
            setMinutesOptionsOpen(false);
        } else {
            setMinutesOptionsOpen(true);
            setTimeZoneOptionsOpen(false);
        }
    }

    function handleOpenTimeZoneOptions() {
        if (isTimeZoneOptionsOpen) {
            setTimeZoneOptionsOpen(false);
        } else {
            setTimeZoneOptionsOpen(true);
            setMinutesOptionsOpen(false);
        }
    }

    function onSaveChangesClick() {
        // Сформировать правильный объект и сделать запрос к API на изменение конфига организации
        if (email.value !== '') {
            if (regex.test(String(email.value).toLowerCase())) {
                console.log(observers);
                console.log(counters);
                console.log(templates);
                console.log(invalidBallots);
                console.log(prolong);
                console.log(minutesOption.value);
                console.log(utcOffset.VALUE);
                console.log(email.value);
                console.log(description.value);
                setSaveChangesErrorMessage('');
            } else {
                setSaveChangesErrorMessage(constants.ADD_NEW_ORG.ADD_NEW_ORG_SUPPORT_EMAIL_ERROR);
            }
        }
    }

    return (
        <div className="general-settings">
            <h2 className="general-settings__heading">{constants.ORG_SETTINGS.GENERAL_SETTINGS}</h2>
            <div className="general-settings__container">
                <div className="general-settings__permissions-container">
                    <div className="general-settings__checkbox-container" onClick={handleChangeObservers}>
                        <div className={`general-settings__checkbox ${observers && 'general-settings__checkbox_active'}`} />
                        <p className="general-settings__checkbox-text">{constants.ORG_SETTINGS.ADD_OBSERVERS}</p>
                    </div>
                    <div className="general-settings__checkbox-container" onClick={handleChangeCounters}>
                        <div className={`general-settings__checkbox ${counters && 'general-settings__checkbox_active'}`} />
                        <p className="general-settings__checkbox-text">{constants.ORG_SETTINGS.ADD_COUNTERS}</p>
                    </div>
                    <div className="general-settings__checkbox-container" onClick={handleChangeTemplates}>
                        <div className={`general-settings__checkbox ${templates && 'general-settings__checkbox_active'}`} />
                        <p className="general-settings__checkbox-text">{constants.ORG_SETTINGS.ADD_TEMPLATES}</p>
                    </div>
                    <div className="general-settings__checkbox-container" onClick={handleChangeInvalidBallots}>
                        <div className={`general-settings__checkbox ${invalidBallots && 'general-settings__checkbox_active'}`} />
                        <p className="general-settings__checkbox-text">{constants.ORG_SETTINGS.INVALID_BALLOTS}</p>
                    </div>
                    <div className="general-settings__checkbox-container" onClick={handleChangeProlong}>
                        <div className={`general-settings__checkbox ${prolong && 'general-settings__checkbox_active'}`} />
                        <p className="general-settings__checkbox-text">{constants.ORG_SETTINGS.PROLONG}</p>
                    </div>
                </div>
                <div className="general-settings__additional-container">
                    <div className="general-settings__option-container">
                        <p className="general-settings__option-name">{constants.ORG_SETTINGS.STATISTIC}</p>
                        <div className="general-settings__option-value-container" onClick={handleOpenMinutesOptions}>
                            <p className="general-settings__option-value">{minutesOption.text}</p>
                            <div className="general-settings__option-arrow" />
                            <div className={`general-settings__options-dropdown-container ${isMinutesOptionsOpen && 'general-settings__options-dropdown-container_active'}`}>
                                {minutesOptions.map((option) => (
                                    <div key={option.value} className="general-settings__option-select-container" onClick={() => handleMinutesOptionSelect(option.value)}>
                                        <p className="general-settings__option-select-value">{option.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="general-settings__option-container">
                        <p className="general-settings__option-name">{constants.ORG_SETTINGS.TIME_ZONE}</p>
                        <div className="general-settings__option-value-container" onClick={handleOpenTimeZoneOptions}>
                            <p className="general-settings__option-value">{utcOffset.LABEL}</p>
                            <div className="general-settings__option-arrow" />
                            <div className={`general-settings__options-dropdown-container ${isTimeZoneOptionsOpen && 'general-settings__options-dropdown-container_active'}`}>
                                {timeZone.map((option, index) => (
                                    <div key={index} className="general-settings__option-select-container" onClick={() => setOffset(option.VALUE)}>
                                        <p className="general-settings__option-select-value">{option.LABEL}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="general-settings__input-container">
                        <p className="general-settings__input-heading">{constants.ORG_SETTINGS.SUPPORT_EMAIL}</p>
                        <input
                            type="text"
                            className="general-settings__input-email"
                            placeholder={constants.ORG_SETTINGS.SUPPORT_EMAIL_PLACEGOLDER}
                            onChange={email.onChange}
                            value={email.value}
                        />
                    </div>
                    <div className="general-settings__input-container">
                        <p className="general-settings__input-heading">{constants.ORG_SETTINGS.DESCRIPTION}</p>
                        <textarea
                            type="text"
                            className="general-settings__input-description"
                            placeholder={constants.ORG_SETTINGS.DESCRIPTION_PLACEGOLDER}
                            onChange={description.onChange}
                            value={description.value}
                        />
                    </div>
                </div>
            </div>
            <p className="general-settings__save-changes-error">{saveChangesErrorMessage}</p>
            <button className="general-settings__save-changes-button" onClick={onSaveChangesClick}>{constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE}</button>
        </div>
    )
}

export default GeneralSettings;
