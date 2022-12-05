import React from "react";
import MaterialsVoteQuestion from "../VotesStatusComponents/MaterialsVoteQuestion/MaterialsVoteQuestion";

const AddNewVoteCreatedQuestion = () => {



    return (
        <div className="add-new-vote-created-question">
            <div className="add-new-vote-created-question__question-block">
                <div className="add-new-vote-created-question__name-question-materials-rules">
                    <h3 className="add-new-vote-created-question__name-question">1. Как должен происходить процесс выбора делегатов конференции?</h3>
                    <p className="add-new-vote-created-question__rules">Необходимо выбрать ровно 1</p>
                    <div className="add-new-vote-created-question__materials">
                        <MaterialsVoteQuestion materialsVoteName={'Материалы вопроса'}/>
                    </div>
                </div>
                <div className="">

                </div>
                <div className="">

                </div>
            </div>
        </div>
    )
}
export default AddNewVoteCreatedQuestion;