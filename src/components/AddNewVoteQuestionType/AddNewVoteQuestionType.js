import React from "react";
import iconCloseModal from "../../img/AddNewVoteQuestuionTypeIconCloseModal.svg";
import iconPlus from "../../img/AddNewVoteQuestuionTypeIconPlus.svg";
import iconBasket from "../../img/AddNewVoteQuestuionTypeIconBasket.svg";
import iconRulePlus from "../../img/AddNewVoteIconPlus.svg";
import iconRuleDelete from "../../img/AddNewGroupIconBasket.svg";

const AddNewVoteQuestionType = (props) => {

    const {
        activeModalTypeQuestion,
        setActiveModalTypeQuestion,
        constants
    } = props;

    const onCloseModal = () => {
        setActiveModalTypeQuestion(false)
    }

    return (
        <div className={activeModalTypeQuestion ? "add-new-vote-question-type__container active" : "add-new-vote-question-type__container"}>
            <div className="add-new-vote-question-type">
                <div className="add-new-vote-question-type__title">
                    <h3 className="add-new-vote-question-type__title-number-question">
                        Вопрос
                    </h3>
                    <img onClick={onCloseModal} className="add-new-vote-question-type__title-icon-close" src={iconCloseModal} alt={constants.GENERAL.ALT_ICON}/>
                </div>
                <div className="add-new-vote-question-type__name-question">
                    <label className="add-new-vote-question-type__name-question-label">
                        Заголовок вопроса
                        <span className="add-new-vote__red-star">*</span>
                    </label>
                    <input className="add-new-vote-question-type__name-question-input"
                           type={'text'}
                           placeholder={'Введите ваш вопрос'}
                    />
                </div>
                <div className="add-new-vote-question-type__types-variants-answer">
                    <h3 className="add-new-vote-question-type__types-variants-answer-title">
                        Варианты ответа
                    </h3>
                    <div className="add-new-vote-question-type__type-input-block">
                        <input disabled={false} placeholder={'Введите вариант ответа'} className="add-new-vote-question-type__type-input-text"/>
                        <div className="add-new-vote-question-type__type-input-icons">
                            <img className="add-new-vote-question-type__type-input-gray-plus" src={iconPlus} alt={constants.GENERAL.ALT_ICON}/>
                            <img className="add-new-vote-question-type__type-input-gray-basket" src={iconBasket} alt={constants.GENERAL.ALT_ICON}/>
                        </div>
                    </div>
                    <div className="add-new-vote-question-type__rules-block">
                        <div className="add-new-vote-question-type__title-rules-block">
                            <img className="add-new-vote-question-type__rules-icon-plus" src={iconRulePlus} alt={constants.GENERAL.ALT_ICON}/>
                            <p className="add-new-vote-question-type__rules-add-rule-label">ДОБАВИТЬ ПРАВИЛО</p>
                        </div>
                        <div>
                            <h3>Правило</h3>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div>
                        Добавить материалы к вопросу
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddNewVoteQuestionType;