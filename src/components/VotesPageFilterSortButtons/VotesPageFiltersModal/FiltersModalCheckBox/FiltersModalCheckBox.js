import React, { useEffect, useState } from "react";

const FiltersModalCheckBox = (props) => {

    const {
        nameSearchVote,
        status,
        type,
        checkboxFilterArrayAdd,
        checkboxFilterArrayRemove,
        isResetAllCheckboxClick,
        changeAllCheckbox
    } = props;

    const [value, setValue] = useState('');
    const [isCheckboxChecked, setCheckboxChecked] = useState(false);

    useEffect(() => {
        if (isResetAllCheckboxClick) {
            setCheckboxChecked(false);
            changeAllCheckbox();
        }
    }, [isResetAllCheckboxClick, changeAllCheckbox])

    useEffect(() => {
        if (status === undefined) {
            setValue(type);
        } else {
            setValue(status);
        }
    }, [status, type])

    function onCheckboxClick(evt) {
        if (isCheckboxChecked) {
            checkboxFilterArrayRemove(evt.target.value);
            setCheckboxChecked(false);
        } else {
            checkboxFilterArrayAdd(evt.target.value);
            setCheckboxChecked(true);
        }
    }

    return (
        <div className={'checkbox-status-vote'}>
            <label className={'checkbox-status-vote_container'}>
                <input
                    type="checkbox"
                    value={value}
                    onChange={onCheckboxClick}
                    checked={isCheckboxChecked}
                />
                <span className={'checkbox-status-vote_checkmark'} />
            </label>
            <span>{nameSearchVote}</span>
        </div>
    )
}
export default FiltersModalCheckBox;