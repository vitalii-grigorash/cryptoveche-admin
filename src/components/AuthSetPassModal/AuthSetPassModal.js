import React from "react";
import {useNavigate} from "react-router-dom";
import successIcon from '../../img/AuthSetPassSuccessIcon.svg';


const AuthSetPassModal = (props) => {

    const {
        active,
        constants,
        changeLanguageBtn,
        handleLangChange
    } = props;

    const linkAuth= useNavigate();

    return (
        <div className={active ? 'auth-set-pass-modal active' : 'auth-set-pass-modal'}>
            <div className='auth-set-pass-modal__content'>
                <div className="auth-set-pass-modal__content-title-change-lang">
                    <h1 className="auth-set-pass-modal__content-title">{constants.AUTH_SET_PASS.AUTH_SET_PASS_TITLE}</h1>
                    <div className="auth-set-pass-modal__content-lang">
                        <div className="title__change-lang">
                            <span onClick={() => handleLangChange('ru')} className={changeLanguageBtn ? "change-lang__russian active" : "change-lang__russian"}>РУС</span>
                            <span onClick={() => handleLangChange('en')} className={changeLanguageBtn ? "change-lang__english" : "change-lang__english active"}>ENG</span>
                        </div>
                    </div>
                </div>
                <div className="auth-set-pass-modal__icon-content">
                    <img className="auth-set-pass-modal__icon" alt={'иконка галочка'} src={successIcon}/>
                    <span className="auth-set-pass-modal__content-info">{constants.AUTH_SET_PASS.AUTH_SET_PASS_MODAL_INFO}</span>
                </div>
                <button className="auth-set-pass-modal__content-btn" type={'button'} onClick={() => {linkAuth('/auth')}}>{constants.AUTH_SET_PASS.AUTH_SET_PASS_MODAL_BTN}</button>
            </div>
        </div>
    )
}
export default AuthSetPassModal;