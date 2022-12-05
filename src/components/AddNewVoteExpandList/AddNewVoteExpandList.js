import React, {useState} from "react";
import iconPlus from "../../img/AddNewVoteIconPlus.svg";
import iconExcel from "../../img/AddNewVoteIconExcel.svg";
import * as excel from "xlsx";

const AddNewVoteExpandList = (props) => {

    const {
        constants
    } = props;

    const [activeAddImportExcelMailUser, setActiveAddImportExcelMailUser] = useState(false);
    const [isExcelFileSelected, setExcelFileSelected] = useState(false);
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
        <div className="add-new-vote-expand-list">
            <div onClick={() => setActiveAddImportExcelMailUser(!activeAddImportExcelMailUser)} className="add-new-vote-expand-list__add-list-voters-active-btn">
                <img className="add-new-vote-expand-list__materials-vote-icon-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON}/>
                <p className="add-new-vote-expand-list__add-list-voters-active-btn-label">РАСШИРИТЬ СПИСОК</p>
            </div>
            <div className={activeAddImportExcelMailUser ? "add-new-vote-expand-list__add-list-voters-import-excel-mail active" : "add-new-vote-expand-list__add-list-voters-import-excel-mail"}>
                <div className="add-new-vote-expand-list__add-list-voters-search-mail">
                    <p className="add-new-vote-expand-list__add-list-voters-mail-address-label">Почтовые адреса пользователей</p>
                    <p className="add-new-vote-expand-list__add-list-voters-rule">(по одному на каждую строчку для каждого пользователя)</p>
                    <input className="add-new-vote-expand-list__add-list-voters-text-input" type={"text"}/>
                    <button className="add-new-vote-expand-list__add-list-voters-search-btn">Найти в базе пользователей</button>
                </div>
                <div className="add-new-vote-expand-list__add-list-voters-import-excel">
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
                    <div className="add-new-vote-expand-list__add-list-voters-excel">
                        <img className="add-new-vote-expand-list__add-list-voters-excel-icon" src={iconExcel} alt={constants.GENERAL.ALT_ICON}/>
                        <p className="add-new-vote-expand-list__add-list-voters-excel-label">Импорт данных из excel</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddNewVoteExpandList;