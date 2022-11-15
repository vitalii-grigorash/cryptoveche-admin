import React from "react";
import sortingBlockIconDec from '../../img/SortingBlockIconDecrement.svg';
import sortingBlockRow from '../../img/FooterRowSelect.svg';
import redCircleMobile from "../../img/SortingBlockRedCircleMobile.svg";
import sortBtnMobile from "../../img/SortingBlockSortBtnMobile.svg";
import filterBtnMobile from "../../img/SortingBlockFilterBtnMobile.svg";

const SortingBlock = ({ constants }) => {


    return (
        <div className="container__sorting-block">
            <div className="sorting-block">
                <p className="sorting-block__sorting-label">{constants.SORTING_BLOCK.SORTING_BLOCK_LABEL}</p>
                <p className="sorting-block__sorting-type">{constants.SORTING_BLOCK.SORTING_BLOCK_TYPE_SORT}</p>
                <img alt={'иконка сортировки'} src={sortingBlockIconDec} className="sorting-block__icon-decrement"/>
                <img alt={'иконка стрелочка'} src={sortingBlockRow} className="sorting-block__icon-row"/>
            </div>
            <div className="sorting-block-mobile">
                <div className="sorting-block-mobile__filters-sort-button">
                    <img alt={'иконка фильтры'} src={filterBtnMobile}/>
                    <p>{constants.SORTING_BLOCK.SORTING_BLOCK_FILTER_BTN}</p>
                    <img alt={'красная точка'} className="sorting-block-mobile__red-circle" src={redCircleMobile} />
                </div>
                <div className="sorting-block-mobile__filters-sort-button">
                    <img alt={'иконка сортировка'} src={sortBtnMobile} />
                    <p>{constants.SORTING_BLOCK.SORTING_BLOCK_SORT_BTN}</p>
                    <img alt={'красная точка'} className="sorting-block-mobile__red-circle" src={redCircleMobile} />
                </div>
            </div>
        </div>
    )
}
export default SortingBlock;