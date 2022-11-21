import React from "react";
import '../../MaterialsVoteQuestionModal/MaterialsVoteQuestionModal.css';

const MaterialsVoteQuestionModalLinks = (props) => {

    const {
        nameLink
    } = props;

    return (
        <div className={'materials-vote-question-modal__link-materials'}>
            <a href={nameLink} target={'_blank'} rel={'noopener noreferrer nofollow'}>{nameLink}</a>
        </div>
    )
}
export default MaterialsVoteQuestionModalLinks;