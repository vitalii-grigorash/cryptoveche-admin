import React, {useState} from "react";
import AuthSetPassModal from "../AuthSetPassModal/AuthSetPassModal";
import cryptoveche_logo from "../../img/Auth_logotype_crypto.svg";
import auth_background_image from "../../img/Group 2605.svg";
import auth_background_mobile from "../../img/Auth_background_mobile.svg";
import show_pass_icon from "../../img/Auth_hidden_pass.svg";
import hide_pass_icon from "../../img/Auth_show_pass_icon.svg";

const AuthSetPass = (props) => {

    const {
        handleLangChange,
        constants,
        changeLanguageBtn
    } = props;

    const [activeModal, setActiveModal] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [typePass, setTypePass] = useState('password');
    const [showRepeatPass, setShowRepeatPass] = useState(false);
    const [typeRepeatPass, setTypeRepeatPass] = useState('password');

    function onChangePassClick() {
        setActiveModal(true)
    }

    function showHidePass() {
        if(typePass === 'password') {
            setTypePass('text')
            setShowPass(true)
        } else {
            setTypePass('password')
            setShowPass(false)
        }
    }

    function showHideRepeatPass() {
        if(typeRepeatPass === 'password') {
            setTypeRepeatPass('text')
            setShowRepeatPass(true)
        } else {
            setTypeRepeatPass('password')
            setShowRepeatPass(false)
        }
    }

    return (
        <div className="wrapper-set-pass">
            <div className="set-pass-main-block">
                <div className={activeModal ? "set-pass-main-block__set-pass-form active" : "set-pass-main-block__set-pass-form"}>
                    <div className="set-pass-form__title">
                            <p className="set-pass-form__label">{constants.AUTH_SET_PASS.AUTH_SET_PASS_TITLE}</p>
                        <div className="title__change-lang">
                            <span onClick={() => handleLangChange('ru')} className={changeLanguageBtn ? "change-lang__russian active" : "change-lang__russian"}>РУС</span>
                            <span onClick={() => handleLangChange('en')} className={changeLanguageBtn ? "change-lang__english" : "change-lang__english active"}>ENG</span>
                        </div>
                    </div>
                    <div className="set-pass-form__new-set-pass">
                        <label className="new-set-pass__label">{constants.AUTH_SET_PASS.AUTH_SET_PASS_NEW_PASS}</label>
                        <input type={typePass} className="new-set-pass__field"/>
                        <img onClick={() => showHidePass()} className="new-set-pass__icon-pass" alt={'иконка скрыть/показать пароль'} src={showPass ? show_pass_icon : hide_pass_icon} />
                    </div>
                    <div className="set-pass-form__repeat-new-set-pass">
                        <label className="repeat-new-set-pass__label">{constants.AUTH_SET_PASS.AUTH_SET_PASS_REPEAT_PASS}</label>
                        <input type={typeRepeatPass} className="repeat-new-set-pass__field"/>
                        <img onClick={() => showHideRepeatPass()} className="repeat-new-set-pass__icon-pass" alt={'иконка скрыть/показать пароль'} src={showRepeatPass ? show_pass_icon : hide_pass_icon} />
                         <p className="set-pass-form__error-message">{constants.AUTH_SET_PASS.AUTH_SET_PASS_ERROR}</p>
                    </div>
                    <div className="set-pass-form__save-btn-block">
                        <button onClick={onChangePassClick} className="set-pass-form__save-btn">{constants.AUTH_SET_PASS.AUTH_SET_PASS_SAVE_BTN}</button>
                    </div>
                </div>
                <div className={activeModal ? "set-pass-main-block__logotype-set-pass active" : "set-pass-main-block__logotype-set-pass" }>
                    <div className="logotype-set-pass__logo">
                        <img className="logo__cryptoveche-logotype" alt={'логотип'} src={cryptoveche_logo}/>
                    </div>
                    <div className="logotype-set-pass__title">
                        {constants.AUTH_SET_PASS.AUTH_SET_PASS_LOGO_TITLE}
                    </div>
                    <img alt={'картинка в блоке с лого'} className="logotype-set-pass__background-image" src={auth_background_image}/>
                    <img alt={'картинка в блоке с лого мобильная версия'} className="logotype-set-pass__background-image-mobile" src={auth_background_mobile}/>
                </div>
            </div>
            <AuthSetPassModal
                constants={constants}
                handleLangChange={handleLangChange}
                changeLanguageBtn={changeLanguageBtn}
                active={activeModal}/>
        </div>
    )
}
export default AuthSetPass;