import React, {useEffect} from "react";
import sorting_modal_close_button from "../../../img/VotesPageBlockFilterModal_close_button.svg";
import sorting_modal_decrease_btn from '../../../img/VotesPageBlockSortModal_decrease_btn.svg';
import sorting_modal_increase_bnt from '../../../img/VotesPageBlockSortModal_increase_btn.svg';
import {useOnClickOutsideModal} from "../../../utils/CustomHooks/UseOutsideModal/UseOutsideModal";

const VotesPageSortingModal = (props) => {

    const {
        active,
        setActive,
        clickSortTypeDec,
        clickSortTypeInc,
        constants
    } = props;

    const listSortName = [
        {name: constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_EVENT_NAME, sortPropertyDec: '-eventName', sortPropertyInc: 'eventName'},
        {name: constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_ORG_NAME, sortPropertyDec: '-orgName', sortPropertyInc: 'orgName'},
        {name: constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_TIME_START_REG, sortPropertyDec: '-startReg', sortPropertyInc: 'startReg'},
        {name: constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_TIME_START_VOTE, sortPropertyDec: '-startVote', sortPropertyInc: 'startVote'},
        {name: constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_TIME_END_REG, sortPropertyDec: '-endReg', sortPropertyInc: 'endReg'},
        {name: constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_TIME_END_VOTE, sortPropertyDec: '-endVote', sortPropertyInc: 'endVote'}
    ];

    //clickSortTypeDec функция для сортовки на уменьшение
    // clickSortTypeInc функция для сортировки на увеличение

    useOnClickOutsideModal(active,() => setActive(false))

    return (
        <div className={active ? 'sorting-modal active' : 'sorting-modal'}>
            <div className={active ? 'sorting-modal__content active' : 'sorting-modal__content'} onClick={e => e.stopPropagation()}>
                <div className={'sorting-modal__content-title'}>
                    <h3>Сортировать по</h3>
                    <img alt={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_ALT_BUTTON_CLOSE_WINDOW} src={sorting_modal_close_button} onClick={() => setActive(false)}/>
                </div>
                {listSortName.map((obj, i) => (
                    <div key={i} className={'sorting-modal__types-sort'}>
                        <span>{obj.name}</span>
                        <div className={'types-sort__decrease-increase-btn'}>
                            <img onClick={() => clickSortTypeDec(obj.sortPropertyDec, setActive(false))} alt={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_ALT_BUTTON_SORT_LOW} src={sorting_modal_decrease_btn}/>
                            <img onClick={() => clickSortTypeInc(obj.sortPropertyInc, setActive(false))} alt={constants.FILTER_SORT_BLOCK.FILTER_SORT_BLOCK_ALT_BUTTON_ALT_SORT_UP} src={sorting_modal_increase_bnt}/>
                        </div>
                    </div>
                ))
                }
                {/*<div className={'sorting-modal__mobile-buttons'}>*/}
                {/*    <button type={"button"} className={'sorting-modal__mobile-buttons-default-filter'}>Сбросить фильтры</button>*/}
                {/*    <button type={"button"} className={'sorting-modal__mobile-buttons-apply'}>Применить</button>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}
export default VotesPageSortingModal;