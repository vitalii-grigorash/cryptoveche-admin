import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import generalTitleRow from '../../img/GeneralTitleAllPagesRowIcon.svg';
import * as Organizations from '../../Api/Organizations';
import { Validation } from '../../utils/Validation';

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
                        console.log(org);
                        setCurrentOrg(org);
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
        </div>
    )
}

export default OrgSettings;
