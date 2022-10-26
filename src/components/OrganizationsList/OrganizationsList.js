import React from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import SortingBlock from "../SortingBlock/SortingBlock";
import PaginationBlock from "../PaginationBlock/PaginationBlock";

const OrganizationsList = (props) => {

    const {
        constants
    } = props;

    return (
        <div className="container__organisation-list _container">
            <GeneralTitleAllPages
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME}
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER}
            />
            <div className="organisation-list__sort-pagination">
                <SortingBlock/>
                <PaginationBlock/>
            </div>

        </div>
    )
}
export default OrganizationsList;