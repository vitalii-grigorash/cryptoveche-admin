import React from "react";
import DetailsVoteQuestionsCard from "../DetailsVoteQuestionsCard/DetailsVoteQuestionsCard";

const DetailsVoteQuestions = (props) => {

    const {
        constants
    } = props;

    const testObj = [
        {nameQuestion: '1. Согласны ли вы с решением №576?', ruleQuestion: 'Необходимо выбрать ровно 1', typeCard: 'row'},
        {nameQuestion: '2. Как должен происходить процесс выбора делегатов конференции?', ruleQuestion: 'Необходимо выбрать ровно 1', typeCard: 'row'},
        {nameQuestion: '3. Выберите кандидата на позицию делегата Ученого Совета СПбГУ.', ruleQuestion: 'Необходимо выбрать ровно 1', typeCard: 'row'},
        {nameQuestion: '4. Выберите кандидата на позицию делегата Ученого Совета СПбГУ. ', ruleQuestion: 'Выберите один из вариантов ответа напротив каждого кандидата', typeCard: 'grid'},
        {nameQuestion: '5 Выберите лучшего композитора мира', ruleQuestion: 'Выберите один из вариантов ответа напротив каждого кандидата', typeCard: 'radioGrid'}
    ]

    return (
        <div className="details-vote-questions__container">
            <h3 className="details-vote-questions__title-mobile">Ознакомиться с вопросами</h3>
            <h3 className="details-vote-questions__title">Вопросы для голосования</h3>
            {
                testObj.map((el, i) => {
                    return (
                        <DetailsVoteQuestionsCard key={i} nameQuestion={el.nameQuestion} ruleQuestion={el.ruleQuestion} typeCard={el.typeCard}/>
                    )
                })
            }
        </div>
    )
}
export default DetailsVoteQuestions;