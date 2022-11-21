import React, {useState} from "react";
import './MaterialsVoteQuestion.css';
import MaterialsVoteQuestionModal from "./MaterialsVoteQuestionModal/MaterialsVoteQuestionModal";
import material_vote_row from '../../../img/Materials_vote_row.svg';

const MaterialsVoteQuestion = (props) => {

    const {
        materialsVoteName,
        currentMaterialsVote,
        currentMaterialsQuestion
    } = props;

    const [materialsModalActive, setMaterialsModalActive] = useState(false);

    return (
        <div onClick={() => setMaterialsModalActive(!materialsModalActive)} className={'materials-vote-question__wrapper'}>
            <span className={'materials-vote-question__materials-name'}>{materialsVoteName}</span>
            <img className="materials-vote-question-select-arrow" src={material_vote_row} alt="Стрелочка открытия меню"/>
            <MaterialsVoteQuestionModal currentMaterialsQuestion={currentMaterialsQuestion} currentMaterialsVote={currentMaterialsVote} active={materialsModalActive} setActive={setMaterialsModalActive}/>
        </div>
    )
}
export default MaterialsVoteQuestion;