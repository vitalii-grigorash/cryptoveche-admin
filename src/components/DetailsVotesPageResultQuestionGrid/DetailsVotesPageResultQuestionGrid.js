import React, { useState } from "react";
import DetailsVotesPageResultGridTable from '../DetailsVotesPageResultGridTable/DetailsVotesPageResultGridTable';
import DetailsVotesPageResultVotesCardQuestionGraphGrid
    from "../DetailsVotesPageResultVotesCardQuestionGraph/DetailsVotesPageResultVotesCardQuestionGraphGrid";

const DetailsVotesPageResultQuestionGrid = (props) => {

    const {
        question
    } = props;

    const [graphResult, setGraphResult] = useState(false)
    const [tableResult, setTableResult] = useState(true)

    function toggleGraphShow() {
        setGraphResult(true)
        setTableResult(false)
    }

    function toggleTableShow() {
        setTableResult(true)
        setGraphResult(false)
    }

    return (
        <div className='details-votes-page-result-question-grid'>
            <div className='details-votes-page-result-question-grid__title-container'>
                <h3 className="details-votes-page-result-question-grid__title">{question.title}</h3>
                <h5 className="details-votes-page-result-question-grid__rule">Выберите один из вариантов ответа</h5>
            </div>
            <div className='details-votes-page-result-votes-card__switch-table-gistogramma'>
                <div onClick={toggleGraphShow} className={graphResult ? 'switch-table-gistogramma__gistogramma active' : 'switch-table-gistogramma__gistogramma'}></div>
                <div onClick={toggleTableShow} className={tableResult ? 'switch-table-gistogramma__table active' : 'switch-table-gistogramma__table'}></div>
            </div>
            {tableResult && (
                <div className="details-votes-page-result-question-grid__tables-container">
                    {question.answers.map((answer) => (
                        <DetailsVotesPageResultGridTable
                            key={answer.id}
                            answer={answer}
                        />
                    ))}
                </div>
            )}
            {graphResult && (
                <DetailsVotesPageResultVotesCardQuestionGraphGrid
                    answersTemplateGrid={question.answers}
                />
            )}
        </div>
    )
}
export default DetailsVotesPageResultQuestionGrid;