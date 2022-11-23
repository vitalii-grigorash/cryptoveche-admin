import React from "react";
import '../../MaterialsVoteQuestionModal/MaterialsVoteQuestionModal.css';
import show_doc from "../../../../../img/Materials_vote_modal_show_doc_icon.svg";
import load_doc_icon from "../../../../../img/Materials_vote_modal_load_icon.svg";

const MaterialsVoteQuestionModalDocuments = (props) => {

    const {
        nameDocument,
        valueDocument
    } = props;

    function showDocument(e) {
        e.preventDefault();
        window.open(valueDocument);
    }

    const downloadDocument = () => {
        fetch(valueDocument)
            .then(response => {
                response.blob().then(blob => {
                    const fileURL = window.URL.createObjectURL(blob);
                    let alink = document.createElement('a');
                    alink.href = fileURL;
                    alink.download = valueDocument;
                    alink.click();
                })
            })
    }

    return (
        <div className={'materials-vote-question-modal__document-icons'}>
            <span>{nameDocument}</span>
            <div className={'document-icons__icons-block'}>
                <img alt={'показать документы'} src={show_doc} onClick={(e) => {showDocument(e)}}/>
                <img onClick={downloadDocument} alt={'скачать материалы'} src={load_doc_icon}/>
            </div>
        </div>
    )
}
export default MaterialsVoteQuestionModalDocuments;