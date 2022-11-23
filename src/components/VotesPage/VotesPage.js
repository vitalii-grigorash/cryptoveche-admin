import React, {useState} from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import VotesPageFilterSortButtons from "../VotesPageFilterSortButtons/VotesPageFilterSortButtons";
import MyVotesBlockForm from "../MyVotesBlockForm/MyVotesBlockForm";

const VotesPage = (props) => {

    const {
        constants,
        authAs
    } = props;

    const [btnActiveVotes, setBtnActiveVotes] = useState(true);
    const [btnArchiveVotes, setBtnArchiveVotes] = useState(false);
    const [activeEmptyStateMessage, setActiveStateEmptyMessage] = useState(true)

    function toggleActiveHide() {
        setBtnActiveVotes(true)
        setBtnArchiveVotes(false)
    }

    function toggleArchiveShow() {
        setBtnActiveVotes(false)
        setBtnArchiveVotes(true)
    }

    return (
        <div className="votes-page__container _container">
            <GeneralTitleAllPages
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_VOTES}
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_VOTES}
            />
            <div className="votes-page__pagination-filter-sort-block">
                <VotesPageFilterSortButtons
                    constants={constants}/>
                <PaginationBlock
                    constants={constants}
                />
            </div>
            <div className='votes-page-block__main-content'>
                <div className='votes-page-switch-buttons'>
                    <div>
                        <h2 onClick={() => { toggleActiveHide() }} className={btnActiveVotes ? 'active-votes-page-switch-buttons__button' : 'votes-page-switch-buttons__button'}>
                            {constants.VOTES_PAGE.VOTES_PAGE_SWITCH_ACTIVE_BTN} <span className='_active-vote-bnt _mobile-active-vote-bnt'>{constants.VOTES_PAGE.VOTES_PAGE_SWITCH_ACTIVE_BTN_MOBILE}</span></h2>
                    </div>
                    <div>
                        <h2 onClick={() => { toggleArchiveShow() }} className={btnArchiveVotes ? 'active-votes-page-switch-buttons__button' : 'votes-page-switch-buttons__button'}>
                            {constants.VOTES_PAGE.VOTES_PAGE_SWITCH_ARCHIVE_BTN} <span className='_active-vote-bnt _mobile-active-vote-bnt'>{constants.VOTES_PAGE.VOTES_PAGE_SWITCH_ARCHIVE_BTN_MOBILE}</span></h2>
                    </div>
                </div>
                <MyVotesBlockForm
                    constants={constants}
                    authAs={authAs}
                />
                <MyVotesBlockForm
                    constants={constants}
                    authAs={authAs}/>
                <MyVotesBlockForm
                    constants={constants}
                    authAs={authAs}/>
                <p className={activeEmptyStateMessage ? "votes-page-block__main-content-show-more-button" : "votes-page-block__show-more active"}>{constants.VOTES_PAGE.VOTES_PAGE_SHOW_MORE_BTN}</p>
                <span className={activeEmptyStateMessage ? 'votes-page-block__empty-state-message active' : 'votes-page-block__empty-state-message'}>
                    {constants.VOTES_PAGE.VOTES_PAGE_SHOW_INFO_DO_NOT_VOTE}</span>
            </div>
        </div>
    )
}
export default VotesPage;

