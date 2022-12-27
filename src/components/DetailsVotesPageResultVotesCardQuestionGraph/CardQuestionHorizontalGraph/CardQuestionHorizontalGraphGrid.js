import React from "react";
import CardQuestionHorizontalGraphColumnGrid
    from "../CardQuestionHorizontalGraphColumn/CardQuestionHorizontalGraphColumnGrid";

const CardQuestionHorizontalGraphGrid = (props) => {

    const {
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
                resultVote.map(item => {
                    return (
                        <CardQuestionHorizontalGraphColumnGrid
                            key={item.id}
                            result={item.columns}
                            colorName={item.color}
                        />
                    )
                })
            }

        </div>
    )
}

export default CardQuestionHorizontalGraphGrid;