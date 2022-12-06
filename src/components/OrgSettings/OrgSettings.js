import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import generalTitleRow from '../../img/GeneralTitleAllPagesRowIcon.svg';
import * as Organizations from '../../Api/Organizations';
import { Validation } from '../../utils/Validation';
import AdminsSettings from "../AdminsSettings/AdminsSettings";
import GeneralSettings from "../GeneralSettings/GeneralSettings";
import ProtocolSettings from "../ProtocolSettings/ProtocolSettings";
import VoteSettings from "../VoteSettings/VoteSettings";
import MailingSettings from '../MailingSettings/MailingSettings';

const OrgSettings = (props) => {

    const {
        constants,
        requestHelper
    } = props;

    const navigate = useNavigate();
    const title = Validation();
    const [isEditUserActive, setEditUserActive] = useState(false);
    const [currentOrg, setCurrentOrg] = useState({});
    const [orgTitle, setOrgTitle] = useState('');
    const [isAdminsSettingsActive, setAdminsSettingsActive] = useState(true);
    const [isGeneralSettingsActive, setGeneralSettingsActive] = useState(false);
    const [isProtocolSettingsActive, setProtocolSettingsActive] = useState(false);
    const [isVoteSettingsActive, setVoteSettingsActive] = useState(false);
    const [isMailingSettingsActive, setMailingSettingsActive] = useState(false);
    const [mobileSettingsName, setMobileSettingsName] = useState('');
    const [isMobileNavActive, setMobileNavActive] = useState(true);
    const [isAdminsSettingsMobileActive, setAdminsSettingsMobileActive] = useState(false);
    const [isGeneralSettingsMobileActive, setGeneralSettingsMobileActive] = useState(false);
    const [isProtocolSettingsMobileActive, setProtocolSettingsMobileActive] = useState(false);
    const [isVoteSettingsMobileActive, setVoteSettingsMobileActive] = useState(false);
    const [isMailingSettingsMobileActive, setMailingSettingsMobileActive] = useState(false);
    const [isOrganizationActive, setOrganizationActive] = useState(false);

    function getCurrentOrg() {
        if (localStorage.getItem('currentOrgId')) {
            const currentOrg = localStorage.getItem('currentOrgId');
            const org = JSON.parse(currentOrg);
            const body = {
                id: org.id
            }
            requestHelper(Organizations.getOrganization, body)
                .then((org) => {
                    if (org.status !== 'failure') {
                        setCurrentOrg(org);
                        setOrganizationActive(org.settings.inactive);
                        setOrgTitle(org.title);
                        title.setValue(org.title);
                    } else {
                        navigate('/');
                    }
                })
                .catch((err) => {
                    throw new Error(err.message);
                })
        } else {
            navigate('/');
        }
    }

    useEffect(() => {
        getCurrentOrg();
        // eslint-disable-next-line
    }, [])

    function reloadOrgPage() {
        getCurrentOrg();
    }

    function onEditTitleButtonClick() {
        setEditUserActive(true);
    }

    function onSaveTitleClick() {
        setOrgTitle(title.value);
        title.setValue(title.value);
        setEditUserActive(false);
        const body = {
            org_id: currentOrg.id,
            title: title.value
        }
        requestHelper(Organizations.updateOrgTitle, body)
            .then((res) => {
                if (res.status === "ok") {
                    console.log(res.status);
                } else {
                    console.log(res.text);
                }
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }

    function onCancelTitleClick() {
        setEditUserActive(false);
        title.setValue(currentOrg.title);
    }

    function adminsSettingsShow() {
        setAdminsSettingsActive(true);
        setGeneralSettingsActive(false);
        setProtocolSettingsActive(false);
        setVoteSettingsActive(false);
        setMailingSettingsActive(false);
    }

    function generalSettingsShow() {
        setGeneralSettingsActive(true);
        setAdminsSettingsActive(false);
        setProtocolSettingsActive(false);
        setVoteSettingsActive(false);
        setMailingSettingsActive(false);
    }

    function protocolSettingsShow() {
        setProtocolSettingsActive(true);
        setGeneralSettingsActive(false);
        setAdminsSettingsActive(false);
        setVoteSettingsActive(false);
        setMailingSettingsActive(false);
    }

    function voteSettingsShow() {
        setVoteSettingsActive(true);
        setProtocolSettingsActive(false);
        setGeneralSettingsActive(false);
        setAdminsSettingsActive(false);
        setMailingSettingsActive(false);
    }

    function mailingSettingsShow() {
        setMailingSettingsActive(true);
        setVoteSettingsActive(false);
        setProtocolSettingsActive(false);
        setGeneralSettingsActive(false);
        setAdminsSettingsActive(false);
    }

    function onSettingsBackClick() {
        setMobileNavActive(true);
        setMobileSettingsName('');
        setAdminsSettingsMobileActive(false);
        setGeneralSettingsMobileActive(false);
        setProtocolSettingsMobileActive(false);
        setVoteSettingsMobileActive(false);
        setMailingSettingsMobileActive(false);
    }

    function adminsSettingsMobileShow() {
        setMobileNavActive(false);
        setAdminsSettingsMobileActive(true);
        setMobileSettingsName(constants.ORG_SETTINGS.ADMINS_LIST);
    }

    function generalSettingsMobileShow() {
        setMobileNavActive(false);
        setGeneralSettingsMobileActive(true);
        setMobileSettingsName(constants.ORG_SETTINGS.GENERAL_SETTINGS);
    }

    function protocolSettingsMobileShow() {
        setMobileNavActive(false);
        setProtocolSettingsMobileActive(true);
        setMobileSettingsName(constants.ORG_SETTINGS.PROTOCOL_SETTINGS);
    }

    function voteSettingsMobileShow() {
        setMobileNavActive(false);
        setVoteSettingsMobileActive(true);
        setMobileSettingsName(constants.ORG_SETTINGS.VOTE_CONSTRUCOR);
    }

    function mailingSettingsMobileShow() {
        setMobileNavActive(false);
        setMailingSettingsMobileActive(true);
        setMobileSettingsName(constants.ORG_SETTINGS.MAILING_SETTINGS);
    }

    function handleBlockOrg() {
        const isOrgActive = currentOrg.settings.inactive === true ? false : true;
        const body = {
            org_id: currentOrg.id,
            inactive: isOrgActive
        }
        requestHelper(Organizations.blockOrg, body)
            .then((res) => {
                if (res.status === "ok") {
                    getCurrentOrg();
                } else {
                    console.log(res.text);
                }
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }

    function onDeleteOrgClick() {
        const body = {
            orgForDelete: [currentOrg.id]
        }
        requestHelper(Organizations.deleteOrg, body)
            .then((res) => {
                if (res.status === "ok") {
                    navigate('/organizations');
                } else {
                    console.log(res.text);
                }
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }

    return (
        <div className="org-settings _container">
            <div className="org-settings__page-title-container">
                <div className="org-settings__crumbs-container">
                    <p className="org-settings__crumb">{constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}</p>
                    <img className="org-settings__arrow" alt={constants.GENERAL.ALT_ICON} src={generalTitleRow} />
                    <p className="org-settings__crumb">{constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_ORG_MANY}</p>
                </div>
                {!isEditUserActive ? (
                    <div className="org-settings__title-container">
                        <p className="org-settings__title">{orgTitle}</p>
                        <div className="org-settings__edit-title" onClick={onEditTitleButtonClick} />
                    </div>
                ) : (
                    <div className="org-settings__edit-title-container">
                        <input
                            type="text"
                            name="title"
                            placeholder={constants.ORG_SETTINGS.PLACEHOLDER}
                            value={title.value}
                            onChange={title.onChange}
                            className="org-settings__edit-title-input"
                        />
                        <div className="org-settings__edit-title-buttons-container">
                            <button className="org-settings__edit-title-button-save" onClick={onSaveTitleClick}>{constants.ORG_SETTINGS.BUTTON_SAVE}</button>
                            <button className="org-settings__edit-title-button-cancel" onClick={onCancelTitleClick}>{constants.ORG_SETTINGS.BUTTON_CANCEL}</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="org-settings__main-container">
                <div className="org-settings__nav-container">
                    <div className={`${isAdminsSettingsActive ? 'org-settings__link-container org-settings__link-container_active' : 'org-settings__link-container org-settings__link-container_admins'}`} onClick={adminsSettingsShow}>
                        <div className={`${isAdminsSettingsActive ? 'org-settings__link-icon org-settings__link-icon_admins-active' : 'org-settings__link-icon org-settings__link-icon_admins'}`} />
                        <p className="org-settings__link-text">{constants.ORG_SETTINGS.ADMINS_LIST}</p>
                    </div>
                    <div className={`${isGeneralSettingsActive ? 'org-settings__link-container org-settings__link-container_active' : 'org-settings__link-container org-settings__link-container_general'}`} onClick={generalSettingsShow}>
                        <div className={`${isGeneralSettingsActive ? 'org-settings__link-icon org-settings__link-icon_general-active' : 'org-settings__link-icon org-settings__link-icon_general'}`} />
                        <p className="org-settings__link-text">{constants.ORG_SETTINGS.GENERAL_SETTINGS}</p>
                    </div>
                    <div className={`${isProtocolSettingsActive ? 'org-settings__link-container org-settings__link-container_active' : 'org-settings__link-container org-settings__link-container_protocol'}`} onClick={protocolSettingsShow}>
                        <div className={`${isProtocolSettingsActive ? 'org-settings__link-icon org-settings__link-icon_protocol-active' : 'org-settings__link-icon org-settings__link-icon_protocol'}`} />
                        <p className="org-settings__link-text">{constants.ORG_SETTINGS.PROTOCOL_SETTINGS}</p>
                    </div>
                    <div className={`${isVoteSettingsActive ? 'org-settings__link-container org-settings__link-container_active' : 'org-settings__link-container org-settings__link-container_vote'}`} onClick={voteSettingsShow}>
                        <div className={`${isVoteSettingsActive ? 'org-settings__link-icon org-settings__link-icon_vote-active' : 'org-settings__link-icon org-settings__link-icon_vote'}`} />
                        <p className="org-settings__link-text">{constants.ORG_SETTINGS.VOTE_CONSTRUCOR}</p>
                    </div>
                    <div className={`${isMailingSettingsActive ? 'org-settings__link-container org-settings__link-container_active' : 'org-settings__link-container org-settings__link-container_mailing'}`} onClick={mailingSettingsShow}>
                        <div className={`${isMailingSettingsActive ? 'org-settings__link-icon org-settings__link-icon_mailing-active' : 'org-settings__link-icon org-settings__link-icon_mailing'}`} />
                        <p className="org-settings__link-text">{constants.ORG_SETTINGS.MAILING_SETTINGS}</p>
                    </div>
                    <div className={`${isOrganizationActive ? 'org-settings__link-container-green' : 'org-settings__link-container-red'}`} onClick={handleBlockOrg}>
                        <div className={`${isOrganizationActive ? 'org-settings__link-icon org-settings__link-icon_unlock' : 'org-settings__link-icon org-settings__link-icon_block'}`} />
                        <p className="org-settings__link-text">{`${isOrganizationActive ? constants.ORG_SETTINGS.UNLOCK_ORG : constants.ORG_SETTINGS.BLOCK_ORG}`}</p>
                    </div>
                    <div className="org-settings__link-container-red" onClick={onDeleteOrgClick}>
                        <div className="org-settings__link-icon org-settings__link-icon_delete" />
                        <p className="org-settings__link-text">{constants.ORG_SETTINGS.DELETE_ORG}</p>
                    </div>
                </div>
                <div className="org-settings__container">
                    {isAdminsSettingsActive && (
                        <AdminsSettings
                            constants={constants}
                            requestHelper={requestHelper}
                            org={currentOrg}
                            reloadOrgPage={reloadOrgPage}
                        />
                    )}
                    {isGeneralSettingsActive && (
                        <GeneralSettings
                            constants={constants}
                            requestHelper={requestHelper}
                            org={currentOrg}
                            reloadOrgPage={reloadOrgPage}
                        />
                    )}
                    {isProtocolSettingsActive && (
                        <ProtocolSettings
                            constants={constants}
                            requestHelper={requestHelper}
                            org={currentOrg}
                            reloadOrgPage={reloadOrgPage}
                        />
                    )}
                    {isVoteSettingsActive && (
                        <VoteSettings />
                    )}
                    {isMailingSettingsActive && (
                        <MailingSettings />
                    )}
                </div>
            </div>
            {/* Мобильная версия */}
            <div className="org-settings__main-container-mobile">
                {!isMobileNavActive && (
                    <div className="org-settings__mobile-heading-container">
                        <div className="org-settings__mobile-button-back-container" onClick={onSettingsBackClick}>
                            <div className="org-settings__mobile-button-back-arrow" />
                            <p className="org-settings__mobile-button-back-text">{constants.ORG_SETTINGS.SETTINGS_BACK}</p>
                        </div>
                        <p className="org-settings__mobile-settings-name">{mobileSettingsName}</p>
                    </div>
                )}
                {isMobileNavActive ? (
                    <div className="org-settings__nav-container-mobile">
                        <div className="org-settings__link-container" onClick={adminsSettingsMobileShow}>
                            <div className="org-settings__link-icon org-settings__link-icon_admins" />
                            <p className="org-settings__link-text">{constants.ORG_SETTINGS.ADMINS_LIST}</p>
                        </div>
                        <div className="org-settings__link-container" onClick={generalSettingsMobileShow}>
                            <div className="org-settings__link-icon org-settings__link-icon_general" />
                            <p className="org-settings__link-text">{constants.ORG_SETTINGS.GENERAL_SETTINGS}</p>
                        </div>
                        <div className="org-settings__link-container" onClick={protocolSettingsMobileShow}>
                            <div className="org-settings__link-icon org-settings__link-icon_protocol" />
                            <p className="org-settings__link-text">{constants.ORG_SETTINGS.PROTOCOL_SETTINGS}</p>
                        </div>
                        <div className="org-settings__link-container" onClick={voteSettingsMobileShow}>
                            <div className="org-settings__link-icon org-settings__link-icon_vote" />
                            <p className="org-settings__link-text">{constants.ORG_SETTINGS.VOTE_CONSTRUCOR}</p>
                        </div>
                        <div className="org-settings__link-container" onClick={mailingSettingsMobileShow}>
                            <div className="org-settings__link-icon org-settings__link-icon_mailing" />
                            <p className="org-settings__link-text">{constants.ORG_SETTINGS.MAILING_SETTINGS}</p>
                        </div>
                        <div className={`${isOrganizationActive ? 'org-settings__link-container-green' : 'org-settings__link-container-red'}`} onClick={handleBlockOrg}>
                            <div className={`${isOrganizationActive ? 'org-settings__link-icon org-settings__link-icon_unlock' : 'org-settings__link-icon org-settings__link-icon_block'}`} />
                            <p className="org-settings__link-text">{`${isOrganizationActive ? constants.ORG_SETTINGS.UNLOCK_ORG : constants.ORG_SETTINGS.BLOCK_ORG}`}</p>
                        </div>
                        <div className="org-settings__link-container-red" onClick={onDeleteOrgClick}>
                            <div className="org-settings__link-icon org-settings__link-icon_delete" />
                            <p className="org-settings__link-text">{constants.ORG_SETTINGS.DELETE_ORG}</p>
                        </div>
                    </div>
                ) : (
                    <div className="org-settings__container-mobile">
                        {isAdminsSettingsMobileActive && (
                            <AdminsSettings
                                constants={constants}
                                requestHelper={requestHelper}
                                org={currentOrg}
                                reloadOrgPage={reloadOrgPage}
                            />
                        )}
                        {isGeneralSettingsMobileActive && (
                            <GeneralSettings
                                constants={constants}
                                requestHelper={requestHelper}
                                org={currentOrg}
                                reloadOrgPage={reloadOrgPage}
                            />
                        )}
                        {isProtocolSettingsMobileActive && (
                            <ProtocolSettings
                                constants={constants}
                                requestHelper={requestHelper}
                                org={currentOrg}
                                reloadOrgPage={reloadOrgPage}
                            />
                        )}
                        {isVoteSettingsMobileActive && (
                            <VoteSettings />
                        )}
                        {isMailingSettingsMobileActive && (
                            <MailingSettings />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrgSettings;
