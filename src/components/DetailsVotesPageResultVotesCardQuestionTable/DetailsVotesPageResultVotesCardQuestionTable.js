import React from "react";
import CardQuestionCellsTable from "./CardQuestionCellsTable/CardQuestionCellsTable";

const DetailsVotesPageResultVotesCardQuestionTable = (props) => {

    const {
        answers,
        numInvalid
    } = props;

    return (
        <div className={'details-votes-page-result-card-table__wrapper'}>
            <table className={'details-votes-page-result-card-table__table'}>
                <tbody>
                <tr>
                    <th>Вариант ответа</th>
                    <th>Результат</th>
                </tr>
                {answers.map((answer) => (
                    <CardQuestionCellsTable
                        key={answer.id}
                        varinantAnswer={answer.title}
                        result={answer.columns[0].favor}
                    />
                ))}
                <CardQuestionCellsTable varinantAnswer={'Недействительные бюллетени'} result={numInvalid} />
                </tbody>
            </table>
        </div>
    )
}

export default DetailsVotesPageResultVotesCardQuestionTable;