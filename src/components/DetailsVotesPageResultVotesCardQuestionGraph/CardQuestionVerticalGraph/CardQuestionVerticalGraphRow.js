import React from "react";
import CardQuestionVerticalGraphWideColumn from "../CardQuestionVerticalGraphWideColumn/CardQuestionVerticalGraphWideColumn";

const CardQuestionVerticalGraphRow = (props) => {

    const {
        numInvalid,
        resultVote
    } = props;

    return (
        <div className={'card-question-vertical-graph__vertical-grid'}>
            <table className={'vertical-grid__position-table'}>
                <tbody>
                <tr><td></td></tr>
                <tr><td></td></tr>
                <tr><td></td></tr>
                <tr><td></td></tr>
                <tr><td></td></tr>
                <tr><td></td></tr>
                <tr><td></td></tr>
                <tr><td></td></tr>
                <tr><td></td></tr>
                <tr><td></td></tr>
                </tbody>
            </table>
            {
                resultVote.map(item => {
                    return (
                        <CardQuestionVerticalGraphWideColumn
                            key={item.id}
                            result={item.columns[0].favor}
                            colorForColumn={item.color}
                        />
                    )
                })
            }
            <CardQuestionVerticalGraphWideColumn
                result={numInvalid}
                colorForColumn={'#9FA1A8'}
            />
        </div>
    )
}
export default CardQuestionVerticalGraphRow;