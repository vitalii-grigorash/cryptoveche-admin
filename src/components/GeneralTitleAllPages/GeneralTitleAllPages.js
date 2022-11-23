import React from "react";
import generalTitleRow from '../../img/GeneralTitleAllPagesRowIcon.svg';

const GeneralTitleAllPages = (props) => {

    const {
        titleName,
        firstLetter,
        secondLetter
    } = props;

    return (
        <div className="container__general-title-allpages">
            <div className="general-title-allpages__page-info">
                <p className="page-info__first-letter">{firstLetter}</p>
                <img alt={'иконка-стрелочка'} src={generalTitleRow} className="general-title-allpages__row" />
                <p className="page-info__second-letter">{secondLetter}</p>
            </div>
            <div className="general-title-allpages__title-name">
                <h1 className="title-name__title">{titleName}</h1>
            </div>
        </div>
    )
}

export default GeneralTitleAllPages;
