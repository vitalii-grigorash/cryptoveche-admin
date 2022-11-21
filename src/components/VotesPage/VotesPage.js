import React, {useState} from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import VotesPageFilterSortButtons from "../VotesPageFilterSortButtons/VotesPageFilterSortButtons";
import MyVotesBlockForm from "../MyVotesBlockForm/MyVotesBlockForm";

const VotesPage = (props) => {

    const {
        constants,
        allEvents,
        handleCurrentEvents,
        toggleEventRegistration,
        showEventResult,
        formatDate,
        formatTime,
        utcOffset,
        authAs
    } = props;

    const [btnActiveVotes, setBtnActiveVotes] = useState(true);
    const [btnArchiveVotes, setBtnArchiveVotes] = useState(false);
    const [activeEvents, setActiveEvents] = useState([]);
    const [archiveEvents, setArchiveEvents] = useState([]);
    const [statusFilterArray, setStatusFilterArray] = useState([]);
    const [typeFilterArray, setTypeFilterArray] = useState([]);
    const [registerDateFrom, setRegisterDateFrom] = useState('');
    const [registerDateTo, setRegisterDateTo] = useState('');
    const [eventStartDateFrom, setEventStartDateFrom] = useState('');
    const [eventStartDateTo, setEventStartDateTo] = useState('');
    const [isResetAllCheckboxClick, setResetAllCheckboxClick] = useState(false);
    const [activeEventsSearchInput, setActiveEventsSearchInput] = useState('');
    const [archiveEventsSearchInput, setArchiveEventsSearchInput] = useState('');
    const [activeEventsForRender, setActiveEventsForRender] = useState([]);
    const [archiveEventsForRender, setArchiveEventsForRender] = useState([]);
    const [activeEmptyStateMessage, setActiveStateEmptyMessage] = useState(false)
    const [sortType, setSortType] = useState('')
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(5);
    const [result, setResult] = useState(5);
    const [pageCount, setPageCount] = useState(1);
    const [selectedResultsShow, setSelectedResultsShow] = useState(5);
    const [showResultsFromArchive, setShowResultsFromArchive] = useState(0);
    const [resultsShowArchive, setResultsShowArchive] = useState(5);
    const [resultArchive, setResultArchive] = useState(5);
    const [pageCountArchive, setPageCountArchive] = useState(1);
    const [selectedResultsShowArchive, setSelectedResultsShowArchive] = useState(5);

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
                        <h2 onClick={() => { toggleActiveHide() }} className={btnActiveVotes ? 'active-votes-page-switch-buttons__button' : 'votes-page-switch-buttons__button'}>Активные <span className='_active-vote-bnt _mobile-active-vote-bnt'>голосования</span></h2>
                    </div>
                    <div>
                        <h2 onClick={() => { toggleArchiveShow() }} className={btnArchiveVotes ? 'active-votes-page-switch-buttons__button' : 'votes-page-switch-buttons__button'}>Архивные <span className='_active-vote-bnt _mobile-active-vote-bnt'>голосования</span></h2>
                    </div>
                </div>
                {btnActiveVotes && (
                    <>
                        {activeEventsForRender.slice(showResultsFrom, resultsShow).map((event) => (
                                <MyVotesBlockForm
                                    key={event.id}
                                    votesData={event}
                                    handleCurrentEvents={handleCurrentEvents}
                                    toggleEventRegistration={toggleEventRegistration}
                                    showEventResult={showEventResult}
                                    formatDate={formatDate}
                                    formatTime={formatTime}
                                    utcOffset={utcOffset}
                                />
                            )
                        )}
                    </>
                )}
                {btnArchiveVotes && (
                    <>
                        {archiveEventsForRender.slice(showResultsFromArchive, resultsShowArchive).map((event) => (
                                <MyVotesBlockForm
                                    key={event.id}
                                    votesData={event}
                                    handleCurrentEvents={handleCurrentEvents}
                                    toggleEventRegistration={toggleEventRegistration}
                                    showEventResult={showEventResult}
                                    formatDate={formatDate}
                                    formatTime={formatTime}
                                    utcOffset={utcOffset}
                                />
                            )
                        )}
                    </>
                )}
                <span className={activeEmptyStateMessage ? 'votes-page-block__empty-state-message active' : 'votes-page-block__empty-state-message'}>У вас пока нет голосований, но они здесь появятся, когда вас пригласят!</span>
            </div>
        </div>
    )
}
export default VotesPage;

