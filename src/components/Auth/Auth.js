import React, { useState, useEffect } from "react";
import cryptoveche_logo from '../../img/Auth_logotype_crypto.svg';
import row_input_select_role from '../../img/Auth_icon_row_select_role.svg';
import hide_pass_icon from '../../img/Auth_show_pass_icon.svg';
import show_pass_icon from '../../img/Auth_hidden_pass.svg';
import auth_background_image from '../../img/Group 2605.svg';
import auth_background_mobile from '../../img/Auth_background_mobile.svg';
import { Validation } from '../../utils/Validation';

const Auth = (props) => {

    const {
        handleLangChange,
        constants,
        changeLanguageBtn,
        handleRememberMe,
        isRememberMe,
        handleLogin,
        isAuthFormValid,
        handleAuthError,
        handleAuthErrorMessage,
        authErrorMessage,
        config
    } = props;

    const email = Validation();
    const password = Validation();
    const [showPass, setShowPass] = useState(false);
    const [typePass, setTypePass] = useState('password');
    const [authAs, setAuthAs] = useState('admin');
    const [optionValue, setOptionValue] = useState(constants.AUTH.AUTH_ROLE_ADMIN);
    const [isAuthOptionsActive, setAuthOptionsActive] = useState(false);

    const authOptions = [
        {
            name: constants.AUTH.AUTH_ROLE_ADMIN,
            value: 'admin'
        },
        {
            name: constants.AUTH.AUTH_ROLE_OBSERVER,
            value: 'observer'
        },
        {
            name: constants.AUTH.AUTH_ROLE_COUNTER,
            value: 'counter'
        }
    ]

    function showHidePass() {
        if (typePass === 'password') {
            setTypePass('text');
            setShowPass(true);
        } else {
            setTypePass('password');
            setShowPass(false);
        }
    }

    function onSelectAuthOption(name, value) {
        setOptionValue(name);
        setAuthAs(value);
    }

    function onAuthButtonClick() {
        if (email.value === '' || password.value === '') {
            handleAuthError(false);
            handleAuthErrorMessage(constants.AUTH.AUTH_ERROR_MESSAGE_REQUIRED);
        } else {
            handleAuthError(true);
            handleAuthErrorMessage('');
            handleLogin(email.value, password.value, authAs);
        }
    }

    function handleShowAuthOptions() {
        if (isAuthOptionsActive) {
            setAuthOptionsActive(false);
        } else {
            setAuthOptionsActive(true);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onAuthButtonClick();
        }
    };

    const onCloseAuthOptionClick = (e) => {
        if (!e.target.classList.contains('select-role__time-zone-option')) {
            if (!e.target.classList.contains('select-role__time-zone-select-container')) {
                if (!e.target.classList.contains('select-role__time-zone-select-arrow')) {
                    if (!e.target.classList.contains('select-role__time-zone-select-value')) {
                        setAuthOptionsActive(false);
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (isAuthOptionsActive) {
            document.addEventListener("mousedown", onCloseAuthOptionClick);
            return () => document.removeEventListener('mousedown', onCloseAuthOptionClick);
        }
    }, [isAuthOptionsActive])

    useEffect(() => {
        if (isAuthOptionsActive) {
            if (email.value !== '' && password.value !== '') {
                document.addEventListener("keydown", handleKeyDown);
                return () => document.removeEventListener("keydown", handleKeyDown);

            } else {
                document.addEventListener("keydown", handleKeyDown);
                return () => document.removeEventListener("keydown", handleKeyDown);
            }
        } else {
            if (email.value !== '' && password.value !== '') {
                document.addEventListener("keydown", handleKeyDown);
                return () => document.removeEventListener("keydown", handleKeyDown);

            } else {
                document.addEventListener("keydown", handleKeyDown);
                return () => document.removeEventListener("keydown", handleKeyDown);
            }
        }
        // eslint-disable-next-line
    }, [email.value, password.value, isAuthOptionsActive]);

    return (
        <div className="wrapper-auth">
            <div className="auth-main-block">
                <div className="auth-main-block__auth-form">
                    <div className="auth-form__title">
                        <span className="title__auth">{constants.AUTH.AUTH_TITLE}</span>
                        <div className="title__change-lang">
                            <span onClick={() => handleLangChange('ru')} className={changeLanguageBtn ? "change-lang__russian active" : "change-lang__russian"}>РУС</span>
                            <span onClick={() => handleLangChange('en')} className={changeLanguageBtn ? "change-lang__english" : "change-lang__english active"}>ENG</span>
                        </div>
                    </div>
                    <div className="auth-form__select-role-container">
                        <label className="select-role__label">{constants.AUTH.AUTH_LABEL_SELECT_ROLE}</label>
                        <div className="select-role__time-zone-select-container" onClick={handleShowAuthOptions}>
                            <p className="select-role__time-zone-select-value">{optionValue}</p>
                            <img className="select-role__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню" />
                            <div className={`select-role__time-zone-options-container ${isAuthOptionsActive && 'select-role__time-zone-options-container_active'}`}>
                                {authOptions.map((option, index) => (
                                    <p
                                        key={index}
                                        className="select-role__time-zone-option"
                                        onClick={() => onSelectAuthOption(option.name, option.value)}
                                    >
                                        {option.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="auth-form__username">
                        <label className="username__label">{constants.AUTH.AUTH_LOGIN}</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='admin@admin.com'
                            required
                            value={email.value}
                            onChange={email.onChange}
                            className={`username__field-username ${!isAuthFormValid && 'username__field-username_error'}`}
                        />
                    </div>
                    <div className="auth-form__password">
                        <label className="password__label">{constants.AUTH.AUTH_PASS}</label>
                        <input
                            type={typePass}
                            name="password"
                            placeholder={constants.AUTH.AUTH_PASS_PLACEHOLDER}
                            required
                            value={password.value}
                            onChange={password.onChange}
                            className={`password__field-pass ${!isAuthFormValid && 'password__field-pass_error'}`}
                        />
                        <img onClick={() => showHidePass()} className="auth-form__icon-pass" alt={'иконка скрыть/показать пароль'} src={showPass ? show_pass_icon : hide_pass_icon} />
                        <span className={`auth-form__error-message ${!isAuthFormValid && 'auth-form__error-message_active'}`}>{authErrorMessage}</span>
                    </div>
                    <div className="auth-form__link-forget-pass">
                        <a href={`${config.client_url}/forget`} className="link-forget-pass__link-page-forget" target="_blank" rel='noopener noreferrer'>{constants.AUTH.AUTH_FORGET_PASS}</a>
                    </div>
                    <div className="auth-form__remember-me">
                        <label className='remember-me__checkbox_container'>
                            <input
                                type="checkbox"
                                checked={isRememberMe}
                                onChange={handleRememberMe}
                            />
                            <span className='remember-me__checkmark' />
                        </label>
                        <span className="remember-me__label">{constants.AUTH.AUTH_REMEMBER_ME}</span>
                    </div>
                    <div className="auth-form__button-enter">
                        <button onClick={onAuthButtonClick} className={`${config.enable_esia ? 'button-enter__btn-enter' : 'button-enter__btn-enter-large'}`}>{constants.AUTH.AUTH_ENTER_BTN}</button>
                        {config.enable_esia && (
                            <a
                                className="button-enter__link-gosuslugi"
                                href='https://esia.gosuslugi.ru/login/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {constants.AUTH.AUTH_ENTER_LINK_GOSUSLUGI}
                            </a>
                        )}
                    </div>
                    <div className="auth-form__mobile-link-reg">
                        <span className="mobile-link-reg__question-info">{constants.AUTH.AUTH_QUESTION_ACCOUNT}</span>
                        <a href={`${config.client_url}/registration`} className="mobile-link-reg__link-reg-page" target="_blank" rel='noopener noreferrer'>{constants.AUTH.AUTH_REG_BTN}</a>
                    </div>
                </div>
                <div className="auth-main-block__reg-btn-logotype">
                    <div className="reg-btn-logotype__logo">
                        <img className="logo__cryptoveche-logotype" alt={'логотип'} src={cryptoveche_logo} />
                    </div>
                    <div className="reg-btn-logotype__title-reg-block">
                        <div className="title-reg-block__title">
                            {constants.AUTH.AUTH_TITLE_LOGO_BLOCK}
                        </div>
                        <div className="title-reg-block__question-account">
                            {constants.AUTH.AUTH_QUESTION_ACCOUNT}
                        </div>
                        <a href={`${config.client_url}/registration`} className="title-reg-block__reg-btn" target="_blank" rel='noopener noreferrer'>
                            <button className="reg-btn__registration-button">{constants.AUTH.AUTH_REG_BTN}</button>
                        </a>
                    </div>
                    <img alt='картинка в блоке с лого' className="reg-btn-logotype__background-image" src={auth_background_image} />
                    <img alt='картинка в блоке с лого мобильная версия' className="reg-btn-logotype__background-image-mobile" src={auth_background_mobile} />
                </div>
            </div>
        </div>
    )
}

export default Auth;
