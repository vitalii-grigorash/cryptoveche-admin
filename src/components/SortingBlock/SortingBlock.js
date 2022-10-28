import React from "react";
import sortingBlockIconDec from '../../img/SortingBlockIconDecrement.svg';
import sortingBlockRow from '../../img/FooterRowSelect.svg';

const SortingBlock = ({ constants }) => {



    return (
        <div className="container__sorting-block">
            <p className="sorting-block__sorting-label">{constants.SORTING_BLOCK.SORTING_BLOCK_LABEL}</p>
            <p className="sorting-block__sorting-type">{constants.SORTING_BLOCK.SORTING_BLOCK_TYPE_SORT}</p>
            <img alt={'иконка сортировки'} src={sortingBlockIconDec} className="sorting-block__icon-decrement"/>
            <img alt={'иконка стрелочка'} src={sortingBlockRow} className="sorting-block__icon-row"/>
        </div>
    )
}
export default SortingBlock;