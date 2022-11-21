import React, {useEffect, useState} from "react";
import './MaterialsVoteQuestionModal.css';
import MaterialsVoteQuestionModalDocuments
    from "./MaterialsVoteQuestionModalDocuments/MaterialsVoteQuestionModalDocuments";
import MaterialsVoteQuestionModalLinks from "./MaterialsVoteQuestionModalLinks/MaterialsVoteQuestionModalLinks";

const MaterialsVoteQuestionModal = React.memo((props) => {

    const {
        active,
        setActive,
        currentMaterialsVote,
        currentMaterialsQuestion
    } = props;

    const [typeDocument, setTypeDocument] = useState([])
    const [typeLink, setTypeLink] = useState([])

    // const getTypeDocumentMaterialsVote = (type) => {
    //     const filteredCurrentMaterialsVoteDocument = type.materials.filter(elem => elem.type === 'doc');
    //     setTypeDocument(filteredCurrentMaterialsVoteDocument);
    // }
    //
    // const getTypeLinkMaterialsVote = (type) => {
    //         const filteredCurrentMaterialsVoteLink = type.materials.filter(elem => elem.type === 'link');
    //         setTypeLink(filteredCurrentMaterialsVoteLink);
    // }
    //
    // const getTypeDocumentMaterialsQuestion = (type) => {
    //     const filteredCurrentMaterialsQuestionDocument = type.filter(elem => elem.type === 'doc');
    //     setTypeDocument(filteredCurrentMaterialsQuestionDocument);
    // }
    //
    // const getTypeLinkMaterialsQuestion = (type) => {
    //     const filteredCurrentMaterialsQuestionDocument = type.filter(elem => elem.type === 'link');
    //     setTypeLink(filteredCurrentMaterialsQuestionDocument);
    // }

    useEffect(() => {
        if(currentMaterialsVote !== undefined){
            const filteredCurrentMaterialsVoteDocument = currentMaterialsVote.materials.filter(elem => elem.type === 'doc');
            setTypeDocument(filteredCurrentMaterialsVoteDocument);
            const filteredCurrentMaterialsVoteLink = currentMaterialsVote.materials.filter(elem => elem.type === 'link');
            setTypeLink(filteredCurrentMaterialsVoteLink);
        }
        return () => setTypeDocument([]) || setTypeLink([])
    }, [currentMaterialsVote]);

    useEffect(() => {
        if(currentMaterialsQuestion !== undefined) {
            const filteredCurrentMaterialsQuestionDocument = currentMaterialsQuestion.filter(elem => elem.type === 'doc');
            setTypeDocument(filteredCurrentMaterialsQuestionDocument);
            const filteredCurrentMaterialsQuestionLink = currentMaterialsQuestion.filter(elem => elem.type === 'link');
            setTypeLink(filteredCurrentMaterialsQuestionLink);
        }
        return () => setTypeDocument([]) || setTypeLink([])
    }, [currentMaterialsQuestion]);

    useOnClickOutsideMaterialsVoteModal(active, () => setActive(false));

    function useOnClickOutsideMaterialsVoteModal(active, handler) {
        useEffect(() => {
            const listener = (e) => {
                if (!active) {
                    return;
                }
                handler(e);
            };
            document.addEventListener('click', listener);
            return function () {
                document.removeEventListener('click', listener);
            };
        }, [active, handler])
    }

    return (
        <div className={active ? 'materials-vote-question-modal__wrapper active' : 'materials-vote-question-modal__wrapper'}>
            <div className={active ? 'materials-vote-question-modal__content active' : 'materials-vote-question-modal__content'} onClick={e => e.stopPropagation()}>
                {React.Children.toArray(typeDocument.map(item => {
                    return (
                        <MaterialsVoteQuestionModalDocuments
                            nameDocument={item.title}
                            valueDocument={item.value}/>
                    )
                }))
                }
                {React.Children.toArray(typeLink.map(el => {
                    return (
                        <MaterialsVoteQuestionModalLinks
                            nameLink={el.value}/>
                    )
                }))
                }
            </div>
        </div>
    )
})
export default MaterialsVoteQuestionModal;