import React from "react";
import sortingBlockIconDec from '../../img/SortingBlockIconDecrement.svg';
import sortingBlockRow from '../../img/FooterRowSelect.svg';

const SortingBlock = () => {



    return (
        <div className="container__sorting-block">
            <p className="sorting-block__sorting-label">Сортировать по:</p>
            <p className="sorting-block__sorting-type">Количеству транзакций</p>
            <img alt={'иконка сортировки'} src={sortingBlockIconDec} className="sorting-block__icon-decrement"/>
            <img alt={'иконка стрелочка'} src={sortingBlockRow} className=""/>
        </div>
    )
}
export default SortingBlock;