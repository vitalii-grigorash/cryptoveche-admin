import React, { useState, useEffect } from "react";
import timeZoneRu from '../../utils/TimeZoneData/TimeZoneRu.json';
import timeZoneEn from '../../utils/TimeZoneData/TimeZoneEn.json';
import { Validation } from '../../utils/Validation';
import * as Organizations from '../../Api/Organizations';

const GeneralSettings = (props) => {

    const {
        constants,
        requestHelper,
        org,
        reloadOrgPage,
        isOrgSuperAdmin
    } = props;

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
    const [isSaveButtonActive, setSaveButtonActive] = useState(false);
    const [saveButtonText, setSaveButtonText] = useState(constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE);
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

    useEffect(() => {
        setObservers(org.config.general.observers);
        setCounters(org.config.general.counters);
        setTemplates(org.config.general.templates);
        setInvalidBallots(org.config.general.invalid_ballots);
        setProlong(org.config.general.prolong);
    },
        [
            org.config.general.observers,
            org.config.general.counters,
            org.config.general.templates,
            org.config.general.invalid_ballots,
            org.config.general.prolong
        ]
    )

    useEffect(() => {
        if (
            org.config.general.observers === observers &&
            org.config.general.counters === counters &&
            org.config.general.templates === templates &&
            org.config.general.invalid_ballots === invalidBallots &&
            org.config.general.prolong === prolong &&
            org.config.general.statistics_step.toString() === minutesOption.value &&
            org.settings.email === email.value &&
            org.settings.description === description.value &&
            org.config.general.utc_offset.toString() === utcOffset.VALUE
        ) {
            setSaveButtonActive(false);
        } else {
            setSaveButtonActive(true);
        }
    },
        [
            org.config.general.observers,
            observers,
            org.config.general.counters,
            counters,
            org.config.general.templates,
            templates,
            org.config.general.invalid_ballots,
            invalidBallots,
            org.config.general.prolong,
            prolong,
            org.config.general.statistics_step,
            minutesOption.value,
            org.settings.email,
            email.value,
            org.settings.description,
            description.value,
            org.config.general.utc_offset,
            utcOffset.VALUE
        ]
    )

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

    function saveAdditionalSettings() {
        setSaveButtonText(constants.ORG_SETTINGS.BUTTON_LOADING);
        const body = {
            org_id: org.id,
            inactive: org.settings.inactive,
            email: email.value,
            description: description.value
        }
        requestHelper(Organizations.updateAdditionalSettings, body)
            .then((res) => {
                if (res.status === "ok") {
                    reloadOrgPage();
                } else {
                    console.log(res.text);
                }
            })
            .catch((err) => {
                throw new Error(err.message);
            })
            .finally(() => {
                setSaveButtonText(constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE);
            })
    }

    function saveGeneralSettings() {
        const body = {
            general: {
                observers: observers,
                counters: counters,
                templates: templates,
                invalid_ballots: invalidBallots,
                prolong: prolong,
                statistics_step: Number(minutesOption.value),
                utc_offset: Number(utcOffset.VALUE),
                statistics: true,
                statisticsWindowStep: 60
            },
            org_id: org.id
        }
        requestHelper(Organizations.updateGeneralSettings, body)
            .then((res) => {
                if (res.status === "ok") {
                    if (
                        org.settings.email === email.value &&
                        org.settings.description === description.value
                    ) {
                        reloadOrgPage();
                    } else {
                        saveAdditionalSettings();
                    }
                } else {
                    console.log(res.text);
                }
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }

    useEffect(() => {
        if (email.value === '') {
            setSaveChangesErrorMessage('');
        }
    }, [email.value])

    function onSaveChangesClick() {
        if (email.value !== '') {
            if (regex.test(String(email.value).toLowerCase())) {
                saveGeneralSettings();
                setSaveChangesErrorMessage('');
            } else {
                setSaveChangesErrorMessage(constants.ADD_NEW_ORG.ADD_NEW_ORG_SUPPORT_EMAIL_ERROR);
            }
        } else {
            saveGeneralSettings();
            setSaveChangesErrorMessage('');
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
            {isSaveButtonActive && (
                <>
                    <p className="general-settings__save-changes-error">{saveChangesErrorMessage}</p>
                    <button className="general-settings__save-changes-button" onClick={onSaveChangesClick}>{saveButtonText}</button>
                </>
            )}
        </div>
    )
}

export default GeneralSettings;
