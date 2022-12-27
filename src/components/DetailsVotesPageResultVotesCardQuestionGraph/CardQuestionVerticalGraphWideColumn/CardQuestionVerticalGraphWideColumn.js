import React from "react";

const CardQuestionVerticalGraphWideColumn = (props) => {

    const {
        result,
        colorForColumn
    } = props;

    return (
        <div className={'card-question-vertical-graph-wide-column__wrapper'}>
            <div className={'card-question-vertical-graph-wide-column__columns'}>
                <svg className={'card-question-vertical-graph-wide-column__column-svg'}>
                    <rect width={'65'} height={result + 1} fill={colorForColumn}  x="0" y="0" rx="0" ry="0"/>
                </svg>
            </div>
            <div className={'card-question-vertical-graph-wide-column__name-column'}>{result}</div>
        </div>
    )
}
export default CardQuestionVerticalGraphWideColumn;