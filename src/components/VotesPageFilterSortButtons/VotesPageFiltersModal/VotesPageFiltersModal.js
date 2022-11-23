import React, { useEffect } from "react";
import filter_modal_close_button_mobile from '../../../img/VotesPageBlockFilterModal_close_button_mobile.svg';
import filter_modal_close_button from '../../../img/VotesPageBlockFilterModal_close_button.svg';
// import filter_modal_increment_button from '../../../img/VotesPageBlockModal_increment_icon.svg';
// import sorting_modal_decrease_btn from '../../../img/VotesPageBlockSortModal_decrease_btn.svg';
import FiltersModalCheckBox from "./FiltersModalCheckBox/FiltersModalCheckBox";
import {useOnClickOutsideModal} from "../../../utils/CustomHooks/UseOutsideModal/UseOutsideModal";

const VotesPageFiltersModal = (props) => {

    const {
        active,
        setActive,
        checkboxFilterArrayAdd,
        checkboxFilterArrayRemove,
        onApplyFilterClick,
        onResetFilterClick,
        registerDateFromChange,
        registerDateToChange,
        eventStartDateFromChange,
        eventStartDateToChange,
        registerDateFrom,
        registerDateTo,
        eventStartDateFrom,
        eventStartDateTo,
        // toggleRegisterDateAscending,
        // toggleEventDateAscending,
        // isRegisterDateAscending,
        // isEventDateAscending,
        changeAllCheckbox,
        isResetAllCheckboxClick,
        constants
    } = props;

    useOnClickOutsideModal(active,() => setActive(false))

    function applyFilter() {
        onApplyFilterClick();
        setActive(false);
    }

    function resetFilter() {
        onResetFilterClick();
        setActive(false);
    }

    return (
        <div className={active ? 'filters-modal active' : 'filters-modal'}>
            <div className={active ? 'filters-modal__content active' : 'filters-modal__content'} onClick={e => e.stopPropagation()}>
                <div className={'filters-modal__content-title-mobile'}>
                    <h5>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_FILTERS}</h5>
                    <img alt={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_ALT_BUTTON_CLOSE_WINDOW} src={filter_modal_close_button_mobile} onClick={() => setActive(false)} />
                </div>
                <div className={'filters-modal__content-title'}>
                    <h3>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_BY_VOTING_STATUS}</h3>
                    <h4>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_STATUS_VOTING}</h4>
                    <img alt={'кнопка-крестик'} src={filter_modal_close_button} onClick={() => setActive(false)} />
                </div>
                <div className={'filters-modal__content-checkboxes-status-vote'}>
                    <FiltersModalCheckBox
                        nameSearchVote={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_VOTING_IN_PROGRESS}
                        status={"voting"}
                        checkboxFilterArrayAdd={checkboxFilterArrayAdd}
                        checkboxFilterArrayRemove={checkboxFilterArrayRemove}
                        isResetAllCheckboxClick={isResetAllCheckboxClick}
                        changeAllCheckbox={changeAllCheckbox}
                    />
                    <FiltersModalCheckBox
                        nameSearchVote={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_REG_IN_PROGRESS}
                        status={"registration"}
                        checkboxFilterArrayAdd={checkboxFilterArrayAdd}
                        checkboxFilterArrayRemove={checkboxFilterArrayRemove}
                        isResetAllCheckboxClick={isResetAllCheckboxClick}
                        changeAllCheckbox={changeAllCheckbox}
                    />
                    <FiltersModalCheckBox
                        nameSearchVote={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_VOTING_AND_REG}
                        status={"registration"}
                        checkboxFilterArrayAdd={checkboxFilterArrayAdd}
                        checkboxFilterArrayRemove={checkboxFilterArrayRemove}
                        isResetAllCheckboxClick={isResetAllCheckboxClick}
                        changeAllCheckbox={changeAllCheckbox}
                    />
                    <FiltersModalCheckBox
                        nameSearchVote={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_WAITING_VOTE}
                        status={"event waiting"}
                        checkboxFilterArrayAdd={checkboxFilterArrayAdd}
                        checkboxFilterArrayRemove={checkboxFilterArrayRemove}
                        isResetAllCheckboxClick={isResetAllCheckboxClick}
                        changeAllCheckbox={changeAllCheckbox}
                    />
                    <FiltersModalCheckBox
                        nameSearchVote={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_WAITING_REG}
                        status={"waiting"}
                        checkboxFilterArrayAdd={checkboxFilterArrayAdd}
                        checkboxFilterArrayRemove={checkboxFilterArrayRemove}
                        isResetAllCheckboxClick={isResetAllCheckboxClick}
                        changeAllCheckbox={changeAllCheckbox}
                    />
                    <FiltersModalCheckBox
                        nameSearchVote={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_VOTE_END}
                        status={"ended"}
                        checkboxFilterArrayAdd={checkboxFilterArrayAdd}
                        checkboxFilterArrayRemove={checkboxFilterArrayRemove}
                        isResetAllCheckboxClick={isResetAllCheckboxClick}
                        changeAllCheckbox={changeAllCheckbox}
                    />
                    <FiltersModalCheckBox
                        nameSearchVote={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_QUORUM_NOT_REACHED}
                        status={"quorum_unpresant"}
                        checkboxFilterArrayAdd={checkboxFilterArrayAdd}
                        checkboxFilterArrayRemove={checkboxFilterArrayRemove}
                        isResetAllCheckboxClick={isResetAllCheckboxClick}
                        changeAllCheckbox={changeAllCheckbox}
                    />
                </div>
                <div className={'filters-modal__content-checkboxes-type-vote'}>
                    <h3>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_BY_VOTING_TYPE}</h3>
                    <h4>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_TYPE_VOTING}</h4>
                    <div className={'content-checkboxes-type-vote'}>
                        <FiltersModalCheckBox
                            nameSearchVote={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_OPEN}
                            type={"open"}
                            checkboxFilterArrayAdd={checkboxFilterArrayAdd}
                            checkboxFilterArrayRemove={checkboxFilterArrayRemove}
                            isResetAllCheckboxClick={isResetAllCheckboxClick}
                            changeAllCheckbox={changeAllCheckbox}
                        />
                        <FiltersModalCheckBox
                            nameSearchVote={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_CLOSE}
                            type={"secret"}
                            checkboxFilterArrayAdd={checkboxFilterArrayAdd}
                            checkboxFilterArrayRemove={checkboxFilterArrayRemove}
                            isResetAllCheckboxClick={isResetAllCheckboxClick}
                            changeAllCheckbox={changeAllCheckbox}
                        />
                    </div>
                </div>
                <div className={'filters-modal__content-date-start-reg'}>
                    <h3>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_BY_REG_START_DATE}</h3>
                    <h4>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_REG_START_DATE}</h4>
                    <div className={'content-date-start-reg'}>
                        <div className={'content-date-start-reg__select-dates'}>
                            <span>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_FROM}</span>
                            <input
                                type='date'
                                className={'content-date-start-reg__start-select-date'}
                                onChange={registerDateFromChange}
                                value={registerDateFrom}
                            />{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_TO}
                            <input
                                type='date'
                                className={'content-date-start-reg__end-select-date'}
                                onChange={registerDateToChange}
                                value={registerDateTo}
                            />
                        </div>
                        {/* <div className={'content-date-start-reg__increment-bnt'} onClick={toggleRegisterDateAscending}>
                            <span>{isRegisterDateAscending ? 'По возрастанию' : 'По убыванию'}</span><img alt={'кнопка по возрастанию'} src={isRegisterDateAscending ? filter_modal_increment_button : sorting_modal_decrease_btn} />
                        </div> */}
                    </div>
                </div>
                <div className={'filters-modal__content-date-start-vote'}>
                    <h3>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_BY_VOTE_START_DATE}</h3>
                    <h4>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_VOTE_START_DATE}</h4>
                    <div className={'content-date-start-vote'}>
                        <div className={'content-date-start-reg__select-dates'}>
                            <span>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_FROM}</span>
                            <input
                                type='date'
                                className={'content-date-start-vote__start-select-date'}
                                onChange={eventStartDateFromChange}
                                value={eventStartDateFrom}
                            />{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_TO}
                            <input
                                type='date'
                                className={'content-date-start-vote__end-select-date'}
                                onChange={eventStartDateToChange}
                                value={eventStartDateTo}
                            />
                        </div>
                        {/* <div className={'content-date-start-reg__increment-bnt'} onClick={toggleEventDateAscending}>
                            <span>{isEventDateAscending ? 'По возрастанию' : 'По убыванию'}</span><img alt={'кнопка по возрастанию'} src={isEventDateAscending ? filter_modal_increment_button : sorting_modal_decrease_btn} />
                        </div> */}
                    </div>
                </div>
                <div className={'filters-modal__buttons-container'}>
                    <button className={'filters-modal__button-apply'} onClick={applyFilter}>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_APPLY_FILTER}</button>
                    <button className={'filters-modal__button-reset'} onClick={resetFilter}>{constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_RESET_FILTERS}</button>
                </div>
            </div>
        </div>
    )
}
export default VotesPageFiltersModal;