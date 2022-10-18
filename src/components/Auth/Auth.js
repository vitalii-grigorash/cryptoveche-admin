import '../Auth/Auth.css';
import cryptoveche_logo from '../../img/Auth_logotype_crypto.svg';
import row_input_select_role from '../../img/Auth_icon_row_select_role.svg';
import show_pass_icon from '../../img/Auth_show_pass_icon.svg';
import hide_pass_icon from '../../img/Auth_hidden_pass.svg';
import auth_background_image from '../../img/Auth_backgroundimage.svg';
import auth_background_mobile from '../../img/Auth_background_mobile.svg';
import {Link, useNavigate} from "react-router-dom";

const Auth = () => {

    const linkButtonRegPage = useNavigate();

    return (
        <div className="wrapper-auth">
            <div className="auth-main-block">
                <div className="auth-main-block__auth-form">
                    <div className="auth-form__title">
                        Авторизация
                    </div>
                    <div className="auth-form__select-role">
                        <label className="select-role__label">Войти как</label>
                        <div className="select-role__time-zone-select-container">
                            <p className="select-role__time-zone-select-value">Секретарь</p>
                            <img className="select-role__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                <div className="select-role__time-zone-options-container">
                                        <p className="select-role__time-zone-option"></p>
                                </div>
                        </div>
                    </div>
                    <div className="auth-form__username">
                        <label className="username__label">Имя пользователя</label>
                        <input className="username__field-username"/>
                    </div>
                    <div className="auth-form__password">
                        <label className="password__label">Пароль</label>
                        <input type={"password"} className="password__field-pass"/>
                    </div>
                    <div className="auth-form__link-forget-pass">
                        <a className="link-forget-pass__link-page-forget" href={'/'}>Забыли пароль?</a>
                    </div>
                    <div className="auth-form__remember-me">
                        <label className='remember-me__checkbox_container'>
                            <input defaultChecked={true} type="checkbox"/>
                            <span className='remember-me__checkmark'/>
                        </label>
                        <span className="remember-me__label">Запомнить меня</span>
                    </div>
                    <div className="auth-form__button-enter">
                        <button className="button-enter__btn-enter" >Войти</button>
                        <a className="button-enter__link-gosuslugi" href={'/'}>Войти через ЕСИА</a>
                    </div>
                    <div className="auth-form__mobile-link-reg">
                        <span className="mobile-link-reg__question-info">Ещё нет аккаунта?</span>
                        <Link to={'/reg'} className="mobile-link-reg__link-reg-page">Зарегистрироваться</Link>
                    </div>
                </div>
                <div className="auth-main-block__reg-btn-logotype">
                    <div className="reg-btn-logotype__logo">
                        <img className="logo__cryptoveche-logotype" alt={'логотип'} src={cryptoveche_logo}/>
                    </div>
                    <div className="reg-btn-logotype__title-reg-block">
                        <div className="title-reg-block__title">
                            <span>Панель управления</span>
                            <span>системой электронных</span>
                            <span>голосований</span>
                        </div>
                        <div className="title-reg-block__question-account">
                            Еще нет аккаунта?
                        </div>
                        <div className="title-reg-block__reg-btn">
                            <button className="reg-btn__registration-button" onClick={() => linkButtonRegPage('/reg')}>Зарегистрироваться</button>
                        </div>
                    </div>
                    <img alt={'картинка в блоке с лого'} className="reg-btn-logotype__background-image" src={auth_background_image}/>
                    <img alt={'картинка в блоке с лого мобильная версия'} className="reg-btn-logotype__background-image-mobile" src={auth_background_mobile}/>
                </div>
            </div>
        </div>
    )
}
export default Auth;