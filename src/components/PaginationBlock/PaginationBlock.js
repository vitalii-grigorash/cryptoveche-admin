import React, { useState, useEffect } from "react";
import changeRowLeft from '../../img/PaginationChangePageRowIconLeft.svg';
import changeRowRight from '../../img/PaginationChangePageRowIconRight.svg';
import paginationSeacrhIcon from '../../img/PaginationSearchIcon.svg';

const PaginationBlock = (props) => {

    const {
        sortList,
        orgDetailsSearch,
        searchInput,
        onChoiceClick,
        selectedResultsShow,
        pageCount,
        showPrevResults,
        showNextResults,
        constants
    } = props;

    const [isOptionsActive, setOptionsActive] = useState(false);
    const [allPages, setAllPages] = useState(0);

    useEffect(() => {
        const pages = sortList.length / selectedResultsShow
        if (Math.ceil(pages) === 0) {
            setAllPages(1);
        } else {
            setAllPages(Math.ceil(pages));
        }
    }, [sortList.length, selectedResultsShow]);

    useEffect(() => {
        searchInput(orgDetailsSearch.value);
    },
        [
            orgDetailsSearch.value,
            searchInput
        ]
    );

    function handleShowOptionsContainer() {
        if (isOptionsActive) {
            setOptionsActive(false);
        } else {
            setOptionsActive(true);
        }
    }

    return (
        <div className='navigation-menu__pagination-search-block'>
            <div className='pagination-search-block__show-page' onClick={handleShowOptionsContainer}>
                <p className="pagination-search-block__text">{constants.PAGINATION.PAGINATION_SHOW_LABEL}</p>
                <div className="pagination-search-block__arrow-count-page">
                    {selectedResultsShow} <div className="pagination-search-block__arrow" />
                </div>
                {isOptionsActive && (
                    <div className="pagination-search-block__options-container">
                        <div className="pagination-search-block__option-container" onClick={() => onChoiceClick(5)}>
                            <p className="pagination-search-block__option">5</p>
                        </div>
                        <div className="pagination-search-block__option-container" onClick={() => onChoiceClick(10)}>
                            <p className="pagination-search-block__option">10</p>
                        </div>
                        <div className="pagination-search-block__option-container" onClick={() => onChoiceClick(50)}>
                            <p className="pagination-search-block__option">50</p>
                        </div>
                        <div className="pagination-search-block__option-container" onClick={() => onChoiceClick(100)}>
                            <p className="pagination-search-block__option">100</p>
                        </div>
                        <div className="pagination-search-block__option-container" onClick={() => onChoiceClick(200)}>
                            <p className="pagination-search-block__option">200</p>
                        </div>
                    </div>
                )}
            </div>
            <div className='pagination-search-block__change-page'>
                <span className="change-page__counter-page">{pageCount} {constants.PAGINATION.PAGINATION_PAGE_FROM_PAGE} {allPages}</span>
                <span className="change-page__rows">
                    <img alt='стрелка переключатель страниц' src={changeRowLeft} onClick={showPrevResults} className="change-page__rows-left" />
                    <img alt='стрелка переключатель страниц' src={changeRowRight} onClick={showNextResults} className="change-page__rows-right" />
                </span>
            </div>
            <div className='pagination-search-block__search-table'>
                <img className='search-table__search-table-icon' alt='иконка поиска' src={paginationSeacrhIcon} />
                <input
                    type='text'
                    name='searchInput'
                    className='pagination-search-block__search-table-input'
                    placeholder={constants.PAGINATION.PAGINATION_SEARCH}
                    value={orgDetailsSearch.value}
                    onChange={orgDetailsSearch.onChange}
                />
            </div>
        </div>
    )
}

export default PaginationBlock;
