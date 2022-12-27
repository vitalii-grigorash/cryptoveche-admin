import React, { useEffect, useState } from "react";
import DetailsVotesPageResultVotesCardQuestionTable from "../DetailsVotesPageResultVotesCardQuestionTable/DetailsVotesPageResultVotesCardQuestionTable";
import DetailsVotesPageResultVotesCardQuestionGraphRow from "../DetailsVotesPageResultVotesCardQuestionGraph/DetailsVotesPageResultVotesCardQuestionGraphRow";

const DetailsVotesPageResultQuestionRow = (props) => {

    const {
        question,
        currentEventData
    } = props;

    const [ruleText, setRuleText] = useState('');
    const [graphResult, setGraphResult] = useState(false)
    const [tableResult, setTableResult] = useState(true)
    const [hideBorderBottom, setHideBorderBottom] = useState(false)

    function toggleGraphShow() {
        setGraphResult(true)
        setTableResult(false)
    }

    function toggleTableShow() {
        setTableResult(true)
        setGraphResult(false)
    }

    function simpleQuestion(rules) {
        setRuleText('Необходимо выбрать ровно ' + rules.pick_eq);
    }

    function positionSingleQuestion(rules) {
        setRuleText('Количество должностных позиций доступных для выбора ' + rules.pick_le);
    }

    function positionMultipleQuestion(rules) {
        setRuleText('Количество кандидатов доступных для выбора ' + rules.pick_le);
    }

    function samePositionsQuestion(rules) {
        setRuleText('Количество кандидатов доступных для выбора ' + rules.pick_le);
    }

    function arbitraryQuestionNoRules() {
        setRuleText('Необходимо выбрать один или несколько');
    }

    function arbitraryQuestionLessThan(rules) {
        setRuleText('Необходимо выбрать меньше чем ' + rules.pick_lt);
    }

    function arbitraryQuestionMoreThan(rules) {
        setRuleText('Необходимо выбрать больше чем ' + rules.pick_gt);
    }

    function arbitraryQuestionLessOrEqual(rules) {
        setRuleText('Необходимо выбрать меньше или ровно ' + rules.pick_le);
    }

    function arbitraryQuestionMoreOrEqual(rules) {
        setRuleText('Необходимо выбрать больше или ровно ' + rules.pick_ge);
    }

    function arbitraryQuestionFromTo(rules) {
        setRuleText(`Необходимо выбрать от ${rules.pick_gt} до ${rules.pick_lt}`);
    }

    function arbitraryQuestionFromEqualToEqual(rules) {
        setRuleText(`Необходимо выбрать от ${rules.pick_ge} (включительно) до ${rules.pick_le} (включительно)`);
    }

    function arbitraryQuestionFromEqualTo(rules) {
        setRuleText(`Необходимо выбрать от ${rules.pick_ge} (включительно) до ${rules.pick_lt}`);
    }

    function arbitraryQuestionFromToEqual(rules) {
        setRuleText(`Необходимо выбрать от ${rules.pick_gt} до ${rules.pick_le} (включительно)`);
    }

    function arbitraryQuestionFewRules(rules) {
        if (
            rules.pick_gt !== -1 &&
            rules.pick_ge === -1 &&
            rules.pick_lt !== -1 &&
            rules.pick_le === -1 &&
            rules.pick_eq === -1
        ) {
            arbitraryQuestionFromTo(rules);
        } else if (
            rules.pick_gt === -1 &&
            rules.pick_ge !== -1 &&
            rules.pick_lt === -1 &&
            rules.pick_le !== -1 &&
            rules.pick_eq === -1
        ) {
            arbitraryQuestionFromEqualToEqual(rules);
        } else if (
            rules.pick_gt === -1 &&
            rules.pick_ge !== -1 &&
            rules.pick_lt !== -1 &&
            rules.pick_le === -1 &&
            rules.pick_eq === -1
        ) {
            arbitraryQuestionFromEqualTo(rules);
        } else if (
            rules.pick_gt !== -1 &&
            rules.pick_ge === -1 &&
            rules.pick_lt === -1 &&
            rules.pick_le !== -1 &&
            rules.pick_eq === -1
        ) {
            arbitraryQuestionFromToEqual(rules);
        }
    }

    function arbitraryQuestion(rules) {
        if (
            rules.pick_gt === -1 &&
            rules.pick_ge === -1 &&
            rules.pick_lt === -1 &&
            rules.pick_le === -1 &&
            rules.pick_eq === -1
        ) {
            arbitraryQuestionNoRules();
        } else if (
            rules.pick_gt === -1 &&
            rules.pick_ge === -1 &&
            rules.pick_lt === -1 &&
            rules.pick_le === -1 &&
            rules.pick_eq !== -1
        ) {
            simpleQuestion(rules);
        } else if (
            rules.pick_gt === -1 &&
            rules.pick_ge === -1 &&
            rules.pick_lt !== -1 &&
            rules.pick_le === -1 &&
            rules.pick_eq === -1
        ) {
            arbitraryQuestionLessThan(rules);
        } else if (
            rules.pick_gt !== -1 &&
            rules.pick_ge === -1 &&
            rules.pick_lt === -1 &&
            rules.pick_le === -1 &&
            rules.pick_eq === -1
        ) {
            arbitraryQuestionMoreThan(rules);
        } else if (
            rules.pick_gt === -1 &&
            rules.pick_ge === -1 &&
            rules.pick_lt === -1 &&
            rules.pick_le !== -1 &&
            rules.pick_eq === -1
        ) {
            arbitraryQuestionLessOrEqual(rules);
        } else if (
            rules.pick_gt === -1 &&
            rules.pick_ge !== -1 &&
            rules.pick_lt === -1 &&
            rules.pick_le === -1 &&
            rules.pick_eq === -1
        ) {
            arbitraryQuestionMoreOrEqual(rules);
        } else {
            arbitraryQuestionFewRules(rules);
        }
    }

    useEffect(() => {
            const filteredQuestion = currentEventData.questions.find(currentQuestion => currentQuestion.id === question.id);
            if (question.template === 'ynq') {
                simpleQuestion(filteredQuestion.rules);
            } else if (question.template === 'none') {
                arbitraryQuestion(filteredQuestion.rules);
            } else if (question.template === 'position_single') {
                positionSingleQuestion(filteredQuestion.rules);
            } else if (question.template === 'position_multiple') {
                positionMultipleQuestion(filteredQuestion.rules);
            } else if (question.template === 'same_positions') {
                samePositionsQuestion(filteredQuestion.rules);
            }
        },
        // eslint-disable-next-line
        [
            currentEventData.questions,
            question.id,
            question.template
        ]
    );

    useEffect(() => {
        if(currentEventData.questions.length === 1) {
            setHideBorderBottom(true)
        } else {
            setHideBorderBottom(false)
        }
    }, [currentEventData.questions.length])

    return (
        <div className={hideBorderBottom ? 'details-votes-page-result-question-row active' : 'details-votes-page-result-question-row'}>
            <div className='details-votes-page-result-question-row__title-container'>
                <h3 className="details-votes-page-result-question-row__title">{question.title}</h3>
                <h5 className="details-votes-page-result-question-row__rule">{ruleText}</h5>
            </div>
            <div className='details-votes-page-result-votes-card__switch-table-gistogramma'>
                    <div onClick={toggleGraphShow} className={graphResult ? 'switch-table-gistogramma__gistogramma active' : 'switch-table-gistogramma__gistogramma'}></div>
                    <div onClick={toggleTableShow} className={tableResult ? 'switch-table-gistogramma__table active' : 'switch-table-gistogramma__table'}></div>
            </div>
            {tableResult && (
                <DetailsVotesPageResultVotesCardQuestionTable
                    answers={question.answers}
                    numInvalid={question.numInvalid}
                />
            )}
            {graphResult && (
                <DetailsVotesPageResultVotesCardQuestionGraphRow
                    answersTemplateRow={question.answers}
                    numInvalid={question.numInvalid}
                />
            )}
        </div>
    )
}

export default DetailsVotesPageResultQuestionRow;