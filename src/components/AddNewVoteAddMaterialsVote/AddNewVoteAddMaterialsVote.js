import React, {useState} from "react";
import iconClip from "../../img/AddNewVoteIconClip.svg";
import iconPlus from "../../img/AddNewVoteIconPlus.svg";
import iconDelete from "../../img/AddNewOrgDeleteIcon.svg";
import iconSuccess from "../../img/AddNewVoteAddMaterialsIconSuccess.svg";
import row_input_select_role from "../../img/Auth_icon_row_select_role.svg";
import * as excel from "xlsx";

const AddNewVoteAddMaterialsVote = (props) => {

    const {
        nameMaterialsVote,
        constants
    } = props;

    const [isExcelFileSelected, setExcelFileSelected] = useState(false);
    const [showAddMaterialsVotes, setShowAddMaterialsVotes] = useState(false);
    const [activeSelectLinkDocument, setActiveLinkDocument] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState(constants.ADD_NEW_ORG.ADD_NEW_ORG_SELECT_FILE);
    const [usersToFind, setUsersToFind] = useState([]);
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    function onSelectFileHandler(e) {
        var files = e.target.files, f = files[0];
        setSelectedFileName(files[0].name);
        setExcelFileSelected(true);
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = excel.read(data, { type: 'binary' });
            const uploadedUsers = workbook.Strings.map(user => user.h);
            const filteredUsers = uploadedUsers.filter(user => user !== undefined);
            const validUsersEmails = [];
            filteredUsers.forEach(user => {
                if (regex.test(String(user).toLowerCase())) {
                    validUsersEmails.push(user);
                }
            });
            const uniqАrr = [...new Set(validUsersEmails)];
            setUsersToFind(uniqАrr);
        };
        reader.readAsBinaryString(f);
    }

    return (
        <>
            <div className="add-new-vote__materials-vote-btn">
                <img className="add-new-vote__materials-vote-icon-clip" src={iconClip} alt={constants.GENERAL.ALT_ICON}/>
                <p onClick={() => setShowAddMaterialsVotes(!showAddMaterialsVotes)} className="add-new-vote__materials-vote-label">{nameMaterialsVote}</p>
                <img className={showAddMaterialsVotes ? "add-new-vote__materials-vote-icon-plus" : "add-new-vote__materials-vote-icon-plus hidden"} alt={constants.GENERAL.ALT_ICON} src={iconPlus}/>
            </div>
            {showAddMaterialsVotes && (
                <>
                    <div className="add-new-vote__materials-vote-add-link-document">
                        <div className="add-new-vote__name-materials-vote">
                            <div>
                                <input className="add-new-vote__name-materials-vote-input" placeholder={constants.ADD_NEW_VOTE.ADD_MATERIALS_VOTE_PLACEHOLDER} type={'text'}/>
                                <span className="add-new-vote__red-star">*</span>
                            </div>
                            <div className="add-new-vote__delete-materials-btn">
                                <img className="add-new-vote__delete-materials-icon" src={iconDelete} alt={constants.GENERAL.ALT_ICON}/>
                                <p>{constants.ADD_NEW_VOTE.ADD_NEW_VOTE_DELETE_BTN_TABLE}</p>
                            </div>
                        </div>
                        <div className="add-new-vote__link-document-block">
                            <div onClick={() => setActiveLinkDocument(!activeSelectLinkDocument)} className="add-new-vote__time-zone-select-container _add-materials-vote">
                                <p className="add-new-vote__time-zone-select-value">{constants.ADD_NEW_VOTE.ADD_MATERIALS_VOTE_DOCUMENT}</p>
                                <img className="add-new-vote__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                <div className={activeSelectLinkDocument ? "add-new-vote__time-zone-options-container _add-document-link" : "add-new-vote__time-zone-options-container hidden"}>
                                    <p className="add-new-vote__time-zone-option">{constants.ADD_NEW_VOTE.ADD_MATERIALS_VOTE_LINK}</p>
                                </div>
                            </div>
                            {/*<input className="add-new-vote__add-link" type={'text'}/>*/}
                            <div className="add-new-vote__excel-add-container">
                                <input
                                    className="add-new-vote__excel-add-input"
                                    id="excel__file"
                                    type="file"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                    onChange={(e) => onSelectFileHandler(e)}
                                />
                                <label htmlFor="excel__file" className="add-new-vote__excel-add-input-container">
                                    <div className="add-new-vote__excel-add-input-file-name-container">
                                        <p className={`add-new-vote__excel-add-input-file-name-text ${isExcelFileSelected && 'add-new-vote__excel-add-input-file-name-text_selected'}`}>{selectedFileName}</p>
                                    </div>
                                    <div className="add-new-vote__excel-add-input-button">
                                        <p className='add-new-vote__excel-add-input-button-text'>{constants.ADD_NEW_ORG.ADD_NEW_ORG_LOAD_BTN}</p>
                                    </div>
                                </label>
                            </div>
                            <div className="add-new-vote__materials-vote-icon-ready">
                                <img className="add-new-vote__materials-vote-icon-success" src={iconSuccess} alt={constants.GENERAL.ALT_ICON}/>
                                <p className="add-new-vote__materials-vote-ready">{constants.ADD_NEW_VOTE.ADD_MATERIALS_SUCCESS_INFO}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
export default AddNewVoteAddMaterialsVote;