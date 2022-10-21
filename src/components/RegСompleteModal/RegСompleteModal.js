import React from "react";
import {useNavigate} from "react-router-dom";
import successIcon from "../../img/AuthSetPassSuccessIcon.svg";

const RegCompleteModal = (props) => {

    const {
        active,
        changeLanguageBtn,
        constants,
        handleLangChange
    } = props;

    const linkAuth= useNavigate();

    return (
        <div className={active ? 'reg-complete-modal active' : 'reg-complete-modal'}>
            <div className='reg-complete-modal__content'>
                <div className="reg-complete-modal__content-title-change-lang">
                    <h1 className="reg-complete-modal__content-title">{constants.REG_COMPLETE_MODAL.REG_COMPLETE_MODAL_TITLE}</h1>
                    <div className="reg-complete-modal__content-lang">
                        <div className="title__change-lang">
                            <span onClick={() => handleLangChange('ru')} className={changeLanguageBtn ? "change-lang__russian active" : "change-lang__russian"}>РУС</span>
                            <span onClick={() => handleLangChange('en')} className={changeLanguageBtn ? "change-lang__english" : "change-lang__english active"}>ENG</span>
                        </div>
                    </div>
                </div>
                <div className="reg-complete-modal__icon-content">
                    <img className="reg-complete-modal__icon" alt={'иконка галочка'} src={successIcon}/>
                    <span className="reg-complete-modal__content-info">{constants.REG_COMPLETE_MODAL.REG_COMPLETE_MODAL_INFO}</span>
                </div>
                <button className="reg-complete-modal__content-btn" type={'button'} onClick={() => {linkAuth('/auth')}}>{constants.REG_COMPLETE_MODAL.REG_COMPLETE_MODAL_BTN}</button>
            </div>
        </div>
    )
}
export default RegCompleteModal;


