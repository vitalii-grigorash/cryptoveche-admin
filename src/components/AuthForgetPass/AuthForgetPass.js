import React, {useState} from "react";
import cryptoveche_logo from '../../img/Auth_logotype_crypto.svg';
import auth_background_image from '../../img/Group 2605.svg';
import auth_background_mobile from "../../img/Auth_background_mobile.svg";
import rowBackAuthPage from '../../img/AuthForgetPassRowBackIcon.svg';
import {Link} from "react-router-dom";
import AuthForgetPassModal from "../AuthForgetPassModal/AuthForgetPassModal";

const AuthForgetPass = (props) => {

    const {
        handleLangChange,
        constants,
        changeLanguageBtn
    } = props;

    const [activeModal, setActiveModal] = useState(false)

    function onSendEmailClick() {
        setActiveModal(true)
    }

    return (
            <div className="wrapper-forget-pass">
                <div className="forget-pass-main-block">
                    <div className={activeModal ? "forget-pass-main-block__forget-pass-form active" : "forget-pass-main-block__forget-pass-form"}>
                        <div className="forget-pass-form__title">
                            <div className="forget-pass-form__title-row-back">
                                <Link to={'/auth'}><img className="forget-pass-form__row-back" src={rowBackAuthPage} alt={'стрелочка для возврата'} /></Link>
                                <span className="forget-pass-form__label">{constants.AUTH_FORGET_PASS.AUTH_FORGET_PASS_TITLE}</span>
                            </div>
                            <div className="title__change-lang">
                                <span onClick={() => handleLangChange('ru')} className={changeLanguageBtn ? "change-lang__russian active" : "change-lang__russian"}>РУС</span>
                                <span onClick={() => handleLangChange('en')} className={changeLanguageBtn ? "change-lang__english" : "change-lang__english active"}>ENG</span>
                            </div>
                        </div>
                        <div className="forget-pass-form__rule">
                            {constants.AUTH_FORGET_PASS.AUTH_FORGET_PASS_NOTE}
                        </div>
                        <div className="forget-pass-form__field-forget-pass">
                            <input className="field-forget-pass__email" placeholder={'E-mail'}/>
                            <p className="forget-pass-form__error-message">{constants.AUTH_FORGET_PASS.AUTH_FORGET_PASS_ERROR}</p>
                        </div>
                        <div className="forget-pass-form__btn-forget-pass">
                            <button onClick={onSendEmailClick} className="btn-forget-pass__btn-send">{constants.AUTH_FORGET_PASS.AUTH_FORGET_PASS_BTN}</button>
                        </div>
                    </div>
                    <div className={activeModal ? "forget-pass-main-block__logotype-forget-pass active" : "forget-pass-main-block__logotype-forget-pass" }>
                        <div className="logotype-forget-pass__logo">
                            <img className="logo__cryptoveche-logotype" alt={'логотип'} src={cryptoveche_logo}/>
                        </div>
                        <div className="logotype-forget-pass__title">
                            {constants.AUTH_FORGET_PASS.AUTH_FORGET_PASS_LOGO_TITLE}
                        </div>
                        <img alt={'картинка в блоке с лого'} className="logotype-forget-pass__background-image" src={auth_background_image}/>
                        <img alt={'картинка в блоке с лого мобильная версия'} className="logotype-forget-pass__background-image-mobile" src={auth_background_mobile}/>
                    </div>
                </div>
                <AuthForgetPassModal
                    constants={constants}
                    handleLangChange={handleLangChange}
                    changeLanguageBtn={changeLanguageBtn}
                    active={activeModal}/>
            </div>
    )
}
export default AuthForgetPass;