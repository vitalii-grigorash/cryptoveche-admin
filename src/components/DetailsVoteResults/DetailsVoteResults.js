import React from "react";

const DetailsVoteResults = (props) => {

    const {
        constants
    } = props;

    return (
        <div className="details-vote-results__container">
            <h3 className="details-vote-questions__title-mobile">Результаты</h3>
            <h3 className="details-vote-questions__title">Вопросы для голосования</h3>

        </div>
    )
}
export default DetailsVoteResults;