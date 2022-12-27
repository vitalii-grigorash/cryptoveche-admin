import React from "react";

const CardQuestionGraphNameColumnRow = ({nameColumn, colorSquare}) => {


    const styleSquare = {
        background: colorSquare,
        width: '10px',
        height: '10px',
        opacity: '0.5',
        position: 'absolute'
    }

    return (
        <div className={'card-question-graph-column__wrapper'}>
            <div style={styleSquare}></div><span className={'card-question-graph-column__name-column'}>{nameColumn}</span>
        </div>
    )
}
export default CardQuestionGraphNameColumnRow;