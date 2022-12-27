import React from "react";
import CardQuestionHorizontalGraphColumnRow
    from "../CardQuestionHorizontalGraphColumn/CardQuestionHorizontalGraphColumnRow";
import CardQuestionHorizontalGraphColumnRowInvalidBallots
    from "../CardQuestionHorizontalGraphColumn/CardQuestionHorizontalGraphColumnRowInvalidBallots";

const CardQuestionHorizontalGraphRow = (props) => {

    const {
        numInvalid,
        resultVote
    } = props;

    return (

        <div className={'card-question-horizontal-graph__horizontal-grid'}>
            <table className={'horizontal-grid__position-table'}>
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
                resultVote.map(el => {
                    return (
                        <CardQuestionHorizontalGraphColumnRow
                            key={el.id}
                            result={el.columns[0].favor}
                            colorColumns={el.color}/>
                    )
                })
            }
            <CardQuestionHorizontalGraphColumnRowInvalidBallots
                numInvalid={numInvalid}
            />
        </div>
    )
}
export default CardQuestionHorizontalGraphRow;