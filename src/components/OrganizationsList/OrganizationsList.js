import React, { useEffect, useState } from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import editBtnIcon from '../../img/OrganizationsLisеIconEditButton.svg';
import * as Organizations from '../../Api/Organizations';
import { Validation } from '../../utils/Validation';

const OrganizationsList = (props) => {

    const {
        constants,
        requestHelper
    } = props;

    const orgDetailsSearch = Validation();
    const [orgDetails, setOrgDetails] = useState([]);
    const [orgDetailsForRender, setOrgDetailsForRender] = useState([]);
    const [orgDetailsSearchInput, setOrgDetailsSearchInput] = useState('');
    const [showResultsFrom, setShowResultsFrom] = useState(0);
    const [resultsShow, setResultsShow] = useState(5);
    const [result, setResult] = useState(5);
    const [pageCount, setPageCount] = useState(1);
    const [selectedResultsShow, setSelectedResultsShow] = useState(5);

    useEffect(() => {
        requestHelper(Organizations.getOrganizations)
            .then((data) => {
                setOrgDetails(data);
            })
            .catch((err) => {
                throw new Error(err.message);
            })
        // eslint-disable-next-line
    }, []);

    function handleShowResultsFrom(value) {
        setShowResultsFrom(value);
    }

    function handleResultsShow(value) {
        setResultsShow(value);
    }

    function showPrevResults() {
        if (resultsShow <= result) {
            return
        } else {
            setShowResultsFrom(showResultsFrom - result);
            handleShowResultsFrom(showResultsFrom - result);
            setResultsShow(resultsShow - result);
            handleResultsShow(resultsShow - result);
            setPageCount(pageCount - 1);
        }

    }

    function showNextResults() {
        if (resultsShow >= orgDetailsForRender.length) {
            return
        } else {
            setShowResultsFrom(0 + resultsShow);
            handleShowResultsFrom(0 + resultsShow);
            setResultsShow(result + resultsShow);
            handleResultsShow(result + resultsShow);
            setPageCount(pageCount + 1);
        }
    }

    function onChoiceClick(value) {
        setResultsShow(value);
        handleResultsShow(value);
        setResult(value);
        setSelectedResultsShow(value);
        setShowResultsFrom(0);
        handleShowResultsFrom(0);
        setPageCount(1);
    }

    function searchInput(value) {
        setOrgDetailsSearchInput(value);
    }

    useEffect(() => {
        if (orgDetailsSearchInput === '') {
            setOrgDetailsForRender(orgDetails);
        } else {
            const dataForRender = [];
            orgDetails.forEach((org) => {
                if (org.title.toLowerCase().includes(orgDetailsSearchInput.toLowerCase())) {
                    dataForRender.push(org);
                }
            })
            setOrgDetailsForRender(dataForRender);
        }
    },
        [
            orgDetailsSearchInput,
            orgDetails,
        ]
    );

    return (
        <div className="container__organisation-list _container">
            <GeneralTitleAllPages
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_ORG}
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_ORG}
            />
            <PaginationBlock
                sortList={orgDetailsForRender}
                orgDetailsSearch={orgDetailsSearch}
                searchInput={searchInput}
                onChoiceClick={onChoiceClick}
                selectedResultsShow={selectedResultsShow}
                pageCount={pageCount}
                showPrevResults={showPrevResults}
                showNextResults={showNextResults}
                constants={constants}
            />
            <div className="organisation-list__table-organisations">
                <div className="table-organisations-header">
                    <p className="table-organisations-header__name-org">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_NAME_ORG}</p>
                    <p className="table-organisations-header__secret">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_SECRETARY}</p>
                    <p className="table-organisations-header__group-users">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_GROUP_USERS}</p>
                    <p className="table-organisations-header__votes">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_VOTES}</p>
                    <p className="table-organisations-header__active-votes">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_ACTIVE_VOTES}</p>
                    <p className="table-organisations-header__templates">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_TEMPLATES}</p>
                    <p className="table-organisations-header__actions">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_ACTIONS}</p>
                </div>
                {orgDetailsForRender.slice(showResultsFrom, resultsShow).map((orgDetail) => (
                    <div key={orgDetail.id} className="table-organisations-row">
                        <p className="table-organisations-row__name-org">{orgDetail.title}</p>
                        <p className="table-organisations-row__num-secret">
                            <span className="num-secret-mobile">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_SECRETARY}</span>
                            {orgDetail.numUsers}
                        </p>
                        <p className="table-organisations-row__group-users">
                            <span className="group-users-mobile">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_GROUP_USERS}</span>
                            {orgDetail.numGroups}
                        </p>
                        <p className="table-organisations-row__votes">
                            <span className="votes-mobile">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_VOTES}</span>
                            {orgDetail.numEvents}
                        </p>
                        <p className="table-organisations-row__active-votes">
                            <span className="active-votes-mobile">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_ACTIVE_VOTES}</span>
                            {orgDetail.numActiveEvents}
                        </p>
                        <p className="table-organisations-row__templates">
                            <span className="templates-mobile">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_TEMPLATES}</span>
                            {orgDetail.numTemplates}
                        </p>
                        <div className="table-organisations-row__action">
                            <img alt={editBtnIcon} src={editBtnIcon} className="table-organisations-row__icon-edit" />
                            <span className="table-organisations-row__edit-btn">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_EDIT_BTN}</span>
                            <span className="table-organisations-row__edit-btn-mobile">{constants.ORGANIZATIONS_LIST.ORGANIZATIONS_LIST_EDIT_BTN_MOBILE}</span>
                        </div>
                    </div>
                ))}
            </div>
            <PaginationBlock
                sortList={orgDetailsForRender}
                orgDetailsSearch={orgDetailsSearch}
                searchInput={searchInput}
                onChoiceClick={onChoiceClick}
                selectedResultsShow={selectedResultsShow}
                pageCount={pageCount}
                showPrevResults={showPrevResults}
                showNextResults={showNextResults}
                constants={constants}
            />
        </div>
    )
}

export default OrganizationsList;
