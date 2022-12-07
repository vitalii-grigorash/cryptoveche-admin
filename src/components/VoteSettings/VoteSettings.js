import React, { useEffect, useState } from "react";
import * as Organizations from '../../Api/Organizations';

const VoteSettings = (props) => {

    const {
        constants,
        requestHelper,
        org,
        reloadOrgPage
    } = props;

    console.log(org);

    const [showType, setShowType] = useState(false);
    const [defaultType, setDefaultType] = useState('');
    const [isShowTypeOptionsOpen, setShowTypeOptionsOpen] = useState(false);
    const [isSaveButtonActive, setSaveButtonActive] = useState(false);

    useEffect(() => {
        setShowType(org.config.event.show_type);
        setDefaultType(org.config.event.default_type);
    },
        [
            org.config.event.show_type,
            org.config.event.default_type
        ]
    )

    useEffect(() => {
        if (
            org.config.event.show_type === showType &&
            org.config.event.default_type === defaultType
        ) {
            setSaveButtonActive(false);
        } else {
            setSaveButtonActive(true);
        }
    },
        [
            org.config.event.show_type,
            showType,
            org.config.event.default_type,
            defaultType,
        ]
    )

    function handleShowTypeActive() {
        if (showType) {
            setShowType(false);
        } else {
            setShowType(true);
        }
    }

    function onDefaultTypeSelectClick(type) {
        setDefaultType(type);
    }

    function handleShowTypeOptionsOpen() {
        if (isShowTypeOptionsOpen) {
            setShowTypeOptionsOpen(false);
        } else {
            setShowTypeOptionsOpen(true);
        }
    }

    function saveChanges() {
        const body = {
            event: {
                combined_time: false,
                show_type: showType,
                default_type: defaultType,
                templates: [
                    "none",
                    "ynq",
                    "position_single",
                    "position_multiple",
                    "same_positions",
                    "grid",
                    "radio_grid"
                ],
                ynq_answers: [
                    "За",
                    "Против",
                    "Воздержаться"
                ],
                quorum: true,
                default_quorum: "0",
                default_quorum_type: "voting",
                re_voting: true,
                default_re_voting: false,
                re_registration: true,
                default_re_registration: false,
                material: true,
                question_material: true,
                answer_material: true
            },
            org_id: org.id
        }
        requestHelper(Organizations.updateVoteSettings, body)
            .then(() => {
                reloadOrgPage();
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }

    return (
        <div className="vote-settings">
            <h2 className="vote-settings__heading">{constants.ORG_SETTINGS.VOTE_CONSTRUCOR}</h2>
            <div className="vote-settings__container">
                <div className="vote-settings__option-main-container">
                    <div className="vote-settings__ckeckbox-container" onClick={handleShowTypeActive}>
                        <div className={`vote-settings__ckeckbox ${showType && 'vote-settings__ckeckbox_active'}`} />
                        <p className="vote-settings__ckeckbox-text">{constants.ORG_SETTINGS.VOTE_TYPE}</p>
                    </div>
                    <p className="vote-settings__default-state">{constants.ORG_SETTINGS.DEFAULT_STATE}</p>
                    <div className="vote-settings__select-container" onClick={handleShowTypeOptionsOpen}>
                        <p className="vote-settings__select-text">{defaultType === 'secret' ? constants.ORG_SETTINGS.SECRET_VOTE : constants.ORG_SETTINGS.OPEN_VOTE}</p>
                        <div className="vote-settings__select-arrow" />
                        <div className={`vote-settings__select-options-container ${isShowTypeOptionsOpen && 'vote-settings__select-options-container_active'}`}>
                            <div className="vote-settings__option-container" onClick={() => onDefaultTypeSelectClick('open')}>
                                <p className="vote-settings__option-value">{constants.ORG_SETTINGS.OPEN_VOTE}</p>
                            </div>
                            <div className="vote-settings__option-container" onClick={() => onDefaultTypeSelectClick('secret')}>
                                <p className="vote-settings__option-value">{constants.ORG_SETTINGS.SECRET_VOTE}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {isSaveButtonActive && (
                    <button className="vote-settings__save-button" onClick={saveChanges}>{constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE}</button>
                )}
            </div>
        </div>
    )
}

export default VoteSettings;
