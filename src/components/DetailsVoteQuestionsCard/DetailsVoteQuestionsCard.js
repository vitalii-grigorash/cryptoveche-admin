import React, {useEffect, useState} from "react";
import MaterialsVoteQuestion from "../VotesStatusComponents/MaterialsVoteQuestion/MaterialsVoteQuestion";

const DetailsVoteQuestionsCard = (props) => {

    const {
        nameQuestion,
        ruleQuestion,
        typeCard
    } = props;

    const [activeTypeRow, setActiveTypeRow] = useState(false);
    const [activeTypeGrid, setActiveTypeGrid] = useState(true);
    const [activeRadioGrid, setActiveRadioGrid] = useState(false);

    useEffect(() => {
        const getStyleCard = document.querySelectorAll('.details-vote-questions-card');
        const lastCard = getStyleCard[getStyleCard.length - 1]
        lastCard.style.border = 'none'
        lastCard.style.padding = '0'
        lastCard.style.margin = '0'

        if (typeCard === 'row') {
            setActiveTypeRow(true)
            setActiveTypeGrid(false)
        } else if(typeCard === 'grid') {
            setActiveTypeGrid(true)
            setActiveTypeRow(false)
        } else if (typeCard === 'radioGrid') {
            setActiveTypeRow(false)
            setActiveRadioGrid(true)
        }
    }, [typeCard])

    return (
        <div className="details-vote-questions-card">
            <div className="details-vote-questions-card__question">
                <p className="details-vote-questions-card__question-name">{nameQuestion}</p>
                <p className="details-vote-questions-card__question-note">{ruleQuestion}</p>
                <div className="details-vote-questions-card__materials-vote">
                    <MaterialsVoteQuestion materialsVoteName={'Материалы вопроса'}/></div>
            </div>
            {activeTypeRow && (
                <div className="details-vote-questions-card__row-answer">
                    <div className="details-vote-questions-card__row-answer-variant">
                        <div className="details-vote-questions-card__row-answer-variant-square"></div>
                        <p className="details-vote-questions-card__row-answer-variant-name">Да</p>
                    </div>
                </div>
            )}
            {activeTypeGrid && (
                <>
                    <div className="details-vote-questions-card__grid">
                        <div className="details-vote-questions-card__grid-answer-header">
                            <p className="details-vote-questions-card__grid-answer-header-empty-block"></p>
                            <p className="details-vote-questions-card__grid-answer-header-item">Против</p>
                            <p className="details-vote-questions-card__grid-answer-header-item">Воздержаться</p>
                            <p className="details-vote-questions-card__grid-answer-header-item">За</p>
                        </div>
                        <div className="details-vote-questions-card__grid-answer-row">
                            <div className="details-vote-questions-card__grid-answer-row-item">
                                <p className="details-vote-questions-card__grid-answer-row-name">Вариант один какой-то</p>
                                <div className="details-vote-questions-card__grid-answer-row-checkbox">
                                    <div className={activeRadioGrid ? "details-vote-questions-card__grid-answer-row-radio" : "details-vote-questions-card__grid-answer-row-checkmark"}/>
                                </div>
                                <div className="details-vote-questions-card__grid-answer-row-checkbox">
                                    <div className={activeRadioGrid ? "details-vote-questions-card__grid-answer-row-radio" : "details-vote-questions-card__grid-answer-row-checkmark"}/>
                                </div>
                                <div className="details-vote-questions-card__grid-answer-row-checkbox">
                                    <div className={activeRadioGrid ? "details-vote-questions-card__grid-answer-row-radio" : "details-vote-questions-card__grid-answer-row-checkmark"}/>
                                </div>
                            </div>
                        </div>
                        <div className="details-vote-questions-card__grid-answer-row-item">
                            <p className="details-vote-questions-card__grid-answer-row-name">Довольно длинный четвертый</p>
                            <div className="details-vote-questions-card__grid-answer-row-checkbox">
                                <div className={activeRadioGrid ? "details-vote-questions-card__grid-answer-row-radio" : "details-vote-questions-card__grid-answer-row-checkmark"}/>
                            </div>
                            <div className="details-vote-questions-card__grid-answer-row-checkbox">
                                <div className={activeRadioGrid ? "details-vote-questions-card__grid-answer-row-radio" : "details-vote-questions-card__grid-answer-row-checkmark"}/>
                            </div>
                            <div className="details-vote-questions-card__grid-answer-row-checkbox">
                                <div className={activeRadioGrid ? "details-vote-questions-card__grid-answer-row-radio" : "details-vote-questions-card__grid-answer-row-checkmark"}/>
                            </div>
                        </div>
                        <div className="details-vote-questions-card__grid-answer-row-item">
                            <p className="details-vote-questions-card__grid-answer-row-name">Некий третий варик</p>
                            <div className="details-vote-questions-card__grid-answer-row-checkbox">
                                <div className={activeRadioGrid ? "details-vote-questions-card__grid-answer-row-radio" : "details-vote-questions-card__grid-answer-row-checkmark"}/>
                            </div>
                            <div className="details-vote-questions-card__grid-answer-row-checkbox">
                                <div className={activeRadioGrid ? "details-vote-questions-card__grid-answer-row-radio" : "details-vote-questions-card__grid-answer-row-checkmark"}/>
                            </div>
                            <div className="details-vote-questions-card__grid-answer-row-checkbox">
                                <div className={activeRadioGrid ? "details-vote-questions-card__grid-answer-row-radio" : "details-vote-questions-card__grid-answer-row-checkmark"}/>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default DetailsVoteQuestionsCard;