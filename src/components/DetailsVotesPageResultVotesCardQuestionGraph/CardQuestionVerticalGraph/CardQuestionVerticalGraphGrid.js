import React from "react";
import CardQuestionVerticalGraphThinColumn from "../CardQuestionVerticalGraphThinColumn/CardQuestionVerticalGraphThinColumn";

const CardQuestionVerticalGraphGrid = (props) => {

    const {
        resultVote,
        getNameColumnColor
    } = props;

    return (
        <div className={'card-question-vertical-graph-grid__vertical-grid'}>
            <table className={'vertical-grid__position-table-grid'}>
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
                        <CardQuestionVerticalGraphThinColumn
                            key={el.id}
                            nameAnswer={el.title}
                            result={el.columns}
                            colorColumn={getNameColumnColor.map(el => el.color)}
                        />
                    )
                })
            }
        </div>
    )
}
export default CardQuestionVerticalGraphGrid;