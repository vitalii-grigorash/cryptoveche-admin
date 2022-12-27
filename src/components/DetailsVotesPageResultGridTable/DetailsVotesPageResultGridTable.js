import React from "react";
import CardQuestionCellsTable from "../DetailsVotesPageResultVotesCardQuestionTable/CardQuestionCellsTable/CardQuestionCellsTable";

const DetailsVotesPageResultGridTable = (props) => {

    const {
        answer
    } = props;

    return (
        <div className='details-votes-page-result-grid-table__wrapper'>
            <table className='details-votes-page-result-grid-table__table'>
                <tbody>
                <tr>
                    <th>{answer.title}</th>
                    <th>Результат</th>
                </tr>
                {answer.columns.map((answer) => (
                    <CardQuestionCellsTable
                        key={answer.id}
                        varinantAnswer={answer.value}
                        result={answer.favor}
                    />
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default DetailsVotesPageResultGridTable;