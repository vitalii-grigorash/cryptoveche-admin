import React, { useEffect, useState } from "react";
import * as Organizations from '../../Api/Organizations';

const VoteSettings = (props) => {

    const {
        constants,
        requestHelper,
        org,
        reloadOrgPage,
        isOrgSuperAdmin
    } = props;

    const [showType, setShowType] = useState(false);
    const [defaultType, setDefaultType] = useState('');
    const [isShowTypeOptionsOpen, setShowTypeOptionsOpen] = useState(false);
    const [quorum, setQuorum] = useState(false);
    const [defaultQuorum, setDefaultQuorum] = useState('');
    const [isQuorumOptionsOpen, setQuorumOptionsOpen] = useState(false);
    const [selectedQuorumText, setSelectedQuorumText] = useState('');
    const [reRegistration, setReRegistration] = useState(false);
    const [defaultReRegistration, setDefaultReRegistration] = useState(false);
    const [isReRegistrationOptionsOpen, setReRegistrationOptionsOpen] = useState(false);
    const [reVoting, setReVoting] = useState(false);
    const [defaultReVoting, setDefaultReVoting] = useState(false);
    const [isReVotingOptionsOpen, setReVotingOptionsOpen] = useState(false);
    const [combinedTime, setCombinedTime] = useState(false);
    const [isSaveButtonActive, setSaveButtonActive] = useState(false);

    useEffect(() => {
        setShowType(org.config.event.show_type);
        setDefaultType(org.config.event.default_type);
        setQuorum(org.config.event.quorum);
        setDefaultQuorum(org.config.event.default_quorum);
        setReRegistration(org.config.event.re_registration);
        setDefaultReRegistration(org.config.event.default_re_registration);
        setReVoting(org.config.event.re_voting);
        setDefaultReVoting(org.config.event.default_re_voting);
        setCombinedTime(org.config.event.combined_time);
    },
        [
            org.config.event.show_type,
            org.config.event.default_type,
            org.config.event.quorum,
            org.config.event.default_quorum,
            org.config.event.re_registration,
            org.config.event.default_re_registration,
            org.config.event.re_voting,
            org.config.event.default_re_voting,
            org.config.event.combined_time
        ]
    )

    useEffect(() => {
        if (
            org.config.event.show_type === showType &&
            org.config.event.default_type === defaultType &&
            org.config.event.quorum === quorum &&
            org.config.event.default_quorum === defaultQuorum &&
            org.config.event.re_registration === reRegistration &&
            org.config.event.default_re_registration === defaultReRegistration &&
            org.config.event.re_voting === reVoting &&
            org.config.event.default_re_voting === defaultReVoting &&
            org.config.event.combined_time === combinedTime
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
            org.config.event.quorum,
            quorum,
            org.config.event.default_quorum,
            defaultQuorum,
            org.config.event.re_registration,
            reRegistration,
            org.config.event.default_re_registration,
            defaultReRegistration,
            org.config.event.re_voting,
            reVoting,
            org.config.event.default_re_voting,
            defaultReVoting,
            org.config.event.combined_time,
            combinedTime,
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
            setQuorumOptionsOpen(false);
            setReRegistrationOptionsOpen(false);
            setReVotingOptionsOpen(false);
        }
    }

    function handleQuorumActive() {
        if (quorum) {
            setQuorum(false);
        } else {
            setQuorum(true);
        }
    }

    function onDefaultQuorumSelectClick(quorum) {
        setDefaultQuorum(quorum);
    }

    function handleQuorumOptionsOpen() {
        if (isQuorumOptionsOpen) {
            setQuorumOptionsOpen(false);
        } else {
            setQuorumOptionsOpen(true);
            setShowTypeOptionsOpen(false);
            setReRegistrationOptionsOpen(false);
            setReVotingOptionsOpen(false);
        }
    }

    useEffect(() => {
        if (defaultQuorum === '0') {
            setSelectedQuorumText(constants.ORG_SETTINGS.QUORUM_ANY_VALUE);
        } else if (defaultQuorum === '51') {
            setSelectedQuorumText('50% + 1');
        } else if (defaultQuorum === '50') {
            setSelectedQuorumText('50%');
        } else if (defaultQuorum === '66') {
            setSelectedQuorumText('2/3');
        }
        // eslint-disable-next-line
    }, [defaultQuorum])

    function handleReRegistrationActive() {
        if (reRegistration) {
            setReRegistration(false);
        } else {
            setReRegistration(true);
        }
    }

    function onDefaultReRegistrationClick(reRegistration) {
        setDefaultReRegistration(reRegistration);
    }

    function handleReRegistrationOptionsOpen() {
        if (isReRegistrationOptionsOpen) {
            setReRegistrationOptionsOpen(false);
        } else {
            setReRegistrationOptionsOpen(true);
            setQuorumOptionsOpen(false);
            setShowTypeOptionsOpen(false);
            setReVotingOptionsOpen(false);
        }
    }

    function handleReVotingActive() {
        if (reVoting) {
            setReVoting(false);
        } else {
            setReVoting(true);
        }
    }

    function onDefaultReVotingClick(reVoting) {
        setDefaultReVoting(reVoting);
    }

    function handleReVotingOptionsOpen() {
        if (isReVotingOptionsOpen) {
            setReVotingOptionsOpen(false);
        } else {
            setReVotingOptionsOpen(true);
            setReRegistrationOptionsOpen(false);
            setQuorumOptionsOpen(false);
            setShowTypeOptionsOpen(false);
        }
    }

    function handleCombinedTimeActive() {
        if (combinedTime) {
            setCombinedTime(false);
        } else {
            setCombinedTime(true);
        }
    }

    function saveChanges() {
        const body = {
            event: {
                combined_time: combinedTime,
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
                quorum: quorum,
                default_quorum: defaultQuorum,
                default_quorum_type: "voting",
                re_voting: reVoting,
                default_re_voting: defaultReVoting,
                re_registration: reRegistration,
                default_re_registration: defaultReRegistration,
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
                <div className="vote-settings__option-main-container">
                    <div className="vote-settings__ckeckbox-container" onClick={handleQuorumActive}>
                        <div className={`vote-settings__ckeckbox ${quorum && 'vote-settings__ckeckbox_active'}`} />
                        <p className="vote-settings__ckeckbox-text">{constants.ORG_SETTINGS.QUORUM}</p>
                    </div>
                    <p className="vote-settings__default-state">{constants.ORG_SETTINGS.DEFAULT_STATE}</p>
                    <div className="vote-settings__select-container" onClick={handleQuorumOptionsOpen}>
                        <p className="vote-settings__select-text">{selectedQuorumText}</p>
                        <div className="vote-settings__select-arrow" />
                        <div className={`vote-settings__select-options-container ${isQuorumOptionsOpen && 'vote-settings__select-options-container_active'}`}>
                            <div className="vote-settings__option-container" onClick={() => onDefaultQuorumSelectClick('51')}>
                                <p className="vote-settings__option-value">50% + 1</p>
                            </div>
                            <div className="vote-settings__option-container" onClick={() => onDefaultQuorumSelectClick('50')}>
                                <p className="vote-settings__option-value">50%</p>
                            </div>
                            <div className="vote-settings__option-container" onClick={() => onDefaultQuorumSelectClick('66')}>
                                <p className="vote-settings__option-value">2/3</p>
                            </div>
                            <div className="vote-settings__option-container" onClick={() => onDefaultQuorumSelectClick('0')}>
                                <p className="vote-settings__option-value">{constants.ORG_SETTINGS.QUORUM_ANY_VALUE}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vote-settings__option-main-container">
                    <div className="vote-settings__ckeckbox-container" onClick={handleReRegistrationActive}>
                        <div className={`vote-settings__ckeckbox ${reRegistration && 'vote-settings__ckeckbox_active'}`} />
                        <p className="vote-settings__ckeckbox-text">{constants.ORG_SETTINGS.CANCEL_REG}</p>
                    </div>
                    <p className="vote-settings__default-state">{constants.ORG_SETTINGS.DEFAULT_STATE}</p>
                    <div className="vote-settings__select-container" onClick={handleReRegistrationOptionsOpen}>
                        <p className="vote-settings__select-text">{defaultReRegistration === true ? constants.ORG_SETTINGS.ALLOW : constants.ORG_SETTINGS.PROHIBIT}</p>
                        <div className="vote-settings__select-arrow" />
                        <div className={`vote-settings__select-options-container ${isReRegistrationOptionsOpen && 'vote-settings__select-options-container_active'}`}>
                            <div className="vote-settings__option-container" onClick={() => onDefaultReRegistrationClick(true)}>
                                <p className="vote-settings__option-value">{constants.ORG_SETTINGS.ALLOW}</p>
                            </div>
                            <div className="vote-settings__option-container" onClick={() => onDefaultReRegistrationClick(false)}>
                                <p className="vote-settings__option-value">{constants.ORG_SETTINGS.PROHIBIT}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vote-settings__option-main-container">
                    <div className="vote-settings__ckeckbox-container" onClick={handleReVotingActive}>
                        <div className={`vote-settings__ckeckbox ${reVoting && 'vote-settings__ckeckbox_active'}`} />
                        <p className="vote-settings__ckeckbox-text">{constants.ORG_SETTINGS.CHANGE_VOTE}</p>
                    </div>
                    <p className="vote-settings__default-state">{constants.ORG_SETTINGS.DEFAULT_STATE}</p>
                    <div className="vote-settings__select-container" onClick={handleReVotingOptionsOpen}>
                        <p className="vote-settings__select-text">{defaultReVoting === true ? constants.ORG_SETTINGS.ALLOW : constants.ORG_SETTINGS.PROHIBIT}</p>
                        <div className="vote-settings__select-arrow" />
                        <div className={`vote-settings__select-options-container ${isReVotingOptionsOpen && 'vote-settings__select-options-container_active'}`}>
                            <div className="vote-settings__option-container" onClick={() => onDefaultReVotingClick(true)}>
                                <p className="vote-settings__option-value">{constants.ORG_SETTINGS.ALLOW}</p>
                            </div>
                            <div className="vote-settings__option-container" onClick={() => onDefaultReVotingClick(false)}>
                                <p className="vote-settings__option-value">{constants.ORG_SETTINGS.PROHIBIT}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vote-settings__option-main-container">
                    <div className="vote-settings__ckeckbox-container" onClick={handleCombinedTimeActive}>
                        <div className={`vote-settings__ckeckbox ${combinedTime && 'vote-settings__ckeckbox_active'}`} />
                        <p className="vote-settings__ckeckbox-text">{constants.ORG_SETTINGS.COMBINE_TIME}</p>
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
