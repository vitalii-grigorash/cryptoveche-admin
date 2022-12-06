import React, { useEffect, useState } from "react";
import * as Organizations from '../../Api/Organizations';

const ProtocolSettings = (props) => {

    const {
        constants,
        requestHelper,
        org,
        reloadOrgPage
    } = props;

    const [saveButtonText, setSaveButtonText] = useState(constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE);
    const [isCheckboxActive, setCheckboxActive] = useState(false);
    const [isFileSelected, setFileSelected] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState(constants.ADD_NEW_ORG.ADD_NEW_ORG_SELECT_FILE);
    const [newProtocol, setNewProtocol] = useState({});
    const [templateLink, setTemplateLink] = useState('');
    const [isSaveButtonActive, setSaveButtonActive] = useState(false);
    const [currentProtocolName, setCurrentProtocolName] = useState('');

    useEffect(() => {
        setCheckboxActive(org.config.protocol.enabled);
    }, [org.config.protocol.enabled])

    useEffect(() => {
        setTemplateLink(org.config.protocol.template_link);
        const protocolName = org.config.protocol.template_link.split('/');
        setCurrentProtocolName(protocolName[3]);
    }, [org.config.protocol.template_link])

    useEffect(() => {
        if (isFileSelected) {
            setSaveButtonActive(true);
        } else if (isCheckboxActive !== org.config.protocol.enabled) {
            setSaveButtonActive(true);
        } else {
            setSaveButtonActive(false);
        }
    }, [isCheckboxActive, isFileSelected, org.config.protocol.enabled])

    function handleChangeProtocolEnable() {
        if (isCheckboxActive) {
            setCheckboxActive(false);
        } else {
            setCheckboxActive(true);
        }
    }

    function onSelectFileHandler(e) {
        // для записи в S3 добавить к имени уникальное значение, например new Date().getTime();
        // const random = new Date().getTime();
        // console.log(random);
        const files = e.target.files;
        const file = files[0];
        setSelectedFileName(file.name);
        setFileSelected(true);
        const data = new FormData();
        data.append(file.name, file, file.name);
        setNewProtocol(data);
    }

    function changeProtocol() {
        setSaveButtonText(constants.ORG_SETTINGS.BUTTON_LOADING);
        const uploadProtocolData = {
            data: newProtocol
        }
        const body = {
            protocol: {
                enabled: isCheckboxActive,
                template_link: ''
            },
            org_id: org.id
        }
        requestHelper(Organizations.uploadProtocol, uploadProtocolData)
            .then((res) => {
                body.protocol.template_link = res[0];
                requestHelper(Organizations.updateProtocolSettings, body)
                    .then(() => {
                        reloadOrgPage();
                        setFileSelected(false);
                        setSelectedFileName(constants.ADD_NEW_ORG.ADD_NEW_ORG_SELECT_FILE);
                        setNewProtocol({});
                    })
                    .catch((err) => {
                        throw new Error(err.message);
                    })
            })
            .catch((err) => {
                throw new Error(err.message);
            })
            .finally(() => {
                setSaveButtonText(constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE);
            })
    }

    function changeProtocolEnable() {
        setSaveButtonText(constants.ORG_SETTINGS.BUTTON_LOADING);
        const body = {
            protocol: {
                enabled: isCheckboxActive
            },
            org_id: org.id
        }
        requestHelper(Organizations.updateProtocolSettings, body)
            .then(() => {
                reloadOrgPage();
            })
            .catch((err) => {
                throw new Error(err.message);
            })
            .finally(() => {
                setSaveButtonText(constants.ORG_SETTINGS.BUTTON_SAVE_ADMINS_CHANGE);
            })
    }

    function saveChanges() {
        if (isFileSelected) {
            changeProtocol();
        } else {
            changeProtocolEnable();
        }
    }

    return (
        <div className="protocol-settings">
            <h2 className="protocol-settings__heading">{constants.ORG_SETTINGS.PROTOCOL_SETTINGS}</h2>
            <div className="protocol-settings__container">
                <div className="protocol-settings__checkbox-container" onClick={handleChangeProtocolEnable}>
                    <div className={`protocol-settings__checkbox-icon ${isCheckboxActive && 'protocol-settings__checkbox-icon_active'}`} />
                    <p className="protocol-settings__checkbox-text">{constants.ORG_SETTINGS.FORM_PROTOCOL}</p>
                </div>
                <div className="protocol-settings__files-container">
                    <div className="protocol-settings__save-protocol-container">
                        <p className="protocol-settings__save-protocol-heading">{constants.ORG_SETTINGS.CURRENT_PROTOCOL}</p>
                        <a href={templateLink} className="protocol-settings__save-container">
                            <p className="protocol-settings__save-protocol-name">{currentProtocolName}</p>
                            <div className="protocol-settings__save-protocol-button" />
                        </a>
                    </div>
                    <div className="protocol-settings__download-file-container">
                        <p className="protocol-settings__download-file-label">{constants.ORG_SETTINGS.DOWNLOAD_NEW_TEMPLATE_PROTOCOL}</p>
                        <div className="protocol-settings__file-add-container">
                            <input
                                className="protocol-settings__file-add-input"
                                id="file"
                                type="file"
                                accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={(e) => onSelectFileHandler(e)}
                            />
                            <label htmlFor="file" className="protocol-settings__file-add-input-container">
                                <div className="protocol-settings__file-add-input-file-name-container">
                                    <p className={`protocol-settings__file-add-input-file-name-text ${isFileSelected && 'protocol-settings__file-add-input-file-name-text_selected'}`}>{selectedFileName}</p>
                                </div>
                                <div className="protocol-settings__file-add-input-button">
                                    <p className='protocol-settings__file-add-input-button-text'>{constants.ORG_SETTINGS.LOAD_BUTTON}</p>
                                </div>
                            </label>
                            {isFileSelected && (
                                <div className="protocol-settings__success-container">
                                    <div className="protocol-settings__success-icon" />
                                    <p className="protocol-settings__success-label">{constants.ORG_SETTINGS.LOAD_READY}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {isSaveButtonActive && (
                    <button className="protocol-settings__save-button" onClick={saveChanges}>{saveButtonText}</button>
                )}
            </div>
        </div>
    )
}

export default ProtocolSettings;
