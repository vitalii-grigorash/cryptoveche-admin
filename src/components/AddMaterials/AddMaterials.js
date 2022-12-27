import React from "react";
import * as Organizations from '../../Api/Organizations';

const AddMaterials = (props) => {

    const {
        constants,
        eventMaterials,
        isEvent,
        addEmptyMaterial,
        changeMaterialType,
        linkInputChange,
        titleInputChange,
        changeDocLink,
        deleteMaterial,
        requestHelper
    } = props;

    function handleOpenOptions(id) {
        const el = document.getElementById(id);
        if (el.classList.contains('add-materials__types-container_active')) {
            el.classList.remove('add-materials__types-container_active');
        } else {
            el.classList.add('add-materials__types-container_active');
        }
    }

    function onSelectFileHandler(e, id) {
        const files = e.target.files;
        const file = files[0];
        if (file !== undefined) {
            const fileName = file.name.replace(/ /g, '--');
            const random = new Date().getTime();
            const fileNameForSave = `${random + '_' + fileName}`;
            const data = new FormData();
            data.append(file.name, file, fileNameForSave);
            const uploadData = {
                data: data
            }
            requestHelper(Organizations.uploadProtocol, uploadData)
                .then((res) => {
                    changeDocLink(id, file.name, res[0]);
                })
                .catch((err) => {
                    throw new Error(err.message);
                })
        }
    }

    return (
        <div className="add-materials">
            <div className="add-materials__button-container" onClick={addEmptyMaterial}>
                <div className="add-materials__button-icon" />
                <p className="add-materials__button-text">{isEvent ? constants.ADD_NEW_VOTE.ADD_MATERIALS_VOTE_TITLE : constants.ADD_NEW_VOTE.ADD_MATERIALS_VOTE_TITLE_QUESTION_TYPE}</p>
            </div>
            {eventMaterials.sort(function (a, b) {
                const aId = a.id;
                const bId = b.id;
                if (aId < bId)
                    return -1
                if (aId > bId)
                    return 1
                return 0
            }).map((material) => (
                <div className="add-materials__main-container" key={material.id}>
                    <div className="add-materials__heading-container">
                        <div className="add-materials__heading-input-container">
                            <input
                                className="add-materials__heading-input"
                                type="text"
                                placeholder={constants.ADD_NEW_VOTE.ADD_MATERIALS_VOTE_PLACEHOLDER}
                                value={material.title}
                                onChange={(e) => titleInputChange(e, material.id)}
                            />
                            <p className="add-materials__heading-input-red-star">*</p>
                        </div>
                        <div className="add-materials__delete-container" onClick={() => deleteMaterial(material.id)}>
                            <p className="add-materials__delete-text">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_DELETE_BTN_TABLE}</p>
                            <div className="add-materials__delete-icon" />
                        </div>
                    </div>
                    <div className="add-materials__select-container">
                        <div className="add-materials__select-types-container" onClick={() => handleOpenOptions(material.id)}>
                            <p className="add-materials__select-types-value">{material.type === "link" ? constants.ADD_NEW_VOTE.ADD_MATERIALS_VOTE_LINK : constants.ADD_NEW_VOTE.ADD_MATERIALS_VOTE_DOCUMENT}</p>
                            <div className="add-materials__select-types-arrow" />
                            <div className="add-materials__types-container" id={material.id}>
                                <div className="add-materials__type-container" onClick={() => changeMaterialType(material.id, "link", isEvent)}>
                                    <p className="add-materials__type">{constants.ADD_NEW_VOTE.ADD_MATERIALS_VOTE_LINK}</p>
                                </div>
                                <div className="add-materials__type-container" onClick={() => changeMaterialType(material.id, "doc", isEvent)}>
                                    <p className="add-materials__type">{constants.ADD_NEW_VOTE.ADD_MATERIALS_VOTE_DOCUMENT}</p>
                                </div>
                            </div>
                        </div>
                        {material.type === "link" ? (
                            <input
                                className="add-materials__link-input"
                                type="text"
                                placeholder="https://example.com"
                                value={material.valueLink}
                                onChange={(e) => linkInputChange(e, material.id)}
                            />
                        ) : (
                            <div className="add-materials__file-add-container">
                                <input
                                    className="add-materials__file-add-input"
                                    id={material.id + "file"}
                                    type="file"
                                    onChange={(e) => onSelectFileHandler(e, material.id)}
                                />
                                <label htmlFor={material.id + "file"} className="add-materials__file-add-input-container">
                                    <div className="add-materials__file-add-input-file-name-container">
                                        <p className={`add-materials__file-add-input-file-name-text ${material.isFileSelected && 'add-materials__file-add-input-file-name-text_selected'}`}>{material.selectedFileName}</p>
                                    </div>
                                    <div className="add-materials__file-add-input-button">
                                        <p className='add-materials__file-add-input-button-text'>{constants.ORG_SETTINGS.LOAD_BUTTON}</p>
                                    </div>
                                </label>
                                <div className="add-materials__success-container">
                                    {material.isFileSelected && (
                                        <>
                                            <div className="add-materials__success-icon" />
                                            <p className="add-materials__success-label">{constants.ORG_SETTINGS.LOAD_READY}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="add-materials__delete-container-mobile" onClick={() => deleteMaterial(material.id)}>
                        <p className="add-materials__delete-text-mobile">{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_DELETE_BTN_TABLE}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AddMaterials;
