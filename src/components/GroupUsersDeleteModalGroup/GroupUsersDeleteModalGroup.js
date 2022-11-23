import React from "react";
import {useOnClickOutsideModal} from "../../utils/CustomHooks/UseOutsideModal/UseOutsideModal";

const GroupUsersDeleteModalGroup = (props) => {

    const {
        active,
        setActiveModal,
        constants
    } = props;

    // useOnClickOutsideModal(active, () => setActiveModal(false));

    let numberGroups =  5;

    const correctWordGroup = (value,  words) => {
        let cases = [2, 0, 1, 1, 1, 2];
        return words[
            (value % 100 > 4 && value % 100 < 20) ? 2 : cases[(value % 10 < 5) ? value % 10 : 5]
            ];
    }

    return (
        <div id={'block'} className={active ? 'container__group-users-delete-modal-group active' : 'container__group-users-delete-modal-group'}
             onClick={(e) => e.stopPropagation()}>
            <p className="group-users-delete-modal-group__selector-group">
                Выбрано {numberGroups} {correctWordGroup(numberGroups,[`${constants.GROUP_USERS.GROUP_USERS_MODAL_NUMBER_GROUP}`, `${constants.GROUP_USERS.GROUP_USERS_MODAL_NUMBER_GROUPS}`, `${constants.GROUP_USERS.GROUP_USERS_MODAL_NUMBER_SEVERAL_GROUP}`])}
            </p>
            <div className="group-users-delete-modal-group__buttons">
                <button onClick={() => setActiveModal(false)} className="group-users-delete-modal-group__cancel-btn">{constants.GROUP_USERS.GROUP_USERS_MODAL_CANCEL}</button>
                <button className="group-users-delete-modal-group__delete-btn">{constants.GROUP_USERS.GROUP_USERS_MODAL_DELETE_SELECTED}</button>
            </div>
        </div>
    )
}
export default GroupUsersDeleteModalGroup;
