import '../Reg/Reg.css';
import cryptoveche_logo from "../../img/Auth_logotype_crypto.svg";
import auth_background_image from "../../img/Auth_backgroundimage.svg";
import auth_background_mobile from "../../img/Auth_background_mobile.svg";
import optionRow from '../../img/Auth_icon_row_select_role.svg';
import row_back_page from '../../img/Registration_row_icon.svg';
import timeZone from '../../utils/TimeZoneData/TimeZoneRu.json';
import {Link, useNavigate } from "react-router-dom";
import {useState} from "react";

const Reg = () => {

    const linkButtonBackAuth = useNavigate();
    const [timeZoneLocation, setTimeZoneLocation] = useState('(UTC+3) Россия - Москва - московское время');
    const [timeZoneValue, setTimeZoneValue] = useState(3);
    const [isTimeZoneOptionsOpen, setTimeZoneOptionsOpen] = useState(false);
    const [showHideElem, setShowHideElem] = useState(false);

    function onSelectTimeZoneClick(location) {
        setTimeZoneValue(location.VALUE);
        setTimeZoneLocation(location.LABEL);
    }

    function handleTimeZoneOptionsOpen() {
        if (isTimeZoneOptionsOpen) {
            setTimeZoneOptionsOpen(false);
        } else {
            setTimeZoneOptionsOpen(true);
        }
    }

    function mobileShowElem() {
        setShowHideElem(true)
    }

    function mobileHideElem() {
        setShowHideElem(false)
    }

    return (
        <div className="wrapper-reg">
            <div className="reg-main-block">
                <div className="reg-main-block__auth-btn-logotype">
                    <div className="auth-btn-logotype__logo">
                        <img className="logo__cryptoveche-logotype" alt={'логотип'} src={cryptoveche_logo}/>
                    </div>
                    <div className="auth-btn-logotype__title-reg-block">
                        <div className="auth-btn-logotype__title">
                            <span>Панель управления</span>
                            <span>системой электронных</span>
                            <span>голосований</span>
                        </div>
                        <div className="title-auth-block__question-account">
                            Уже есть аккаунт?
                        </div>
                        <div className="title-auth-block__auth-btn">
                            <button className="auth-btn__auth-button" onClick={() => linkButtonBackAuth('/auth')}>Войти</button>
                        </div>
                    </div>
                    <img alt={'картинка в блоке с лого'} className="auth-btn-logotype__background-image" src={auth_background_image}/>
                    <img alt={'картинка в блоке с лого мобильная версия'} className="auth-btn-logotype__background-image-mobile" src={auth_background_mobile}/>
                </div>
                 <form className="reg-main-block__reg-form">
                     <div className="reg-form__title">
                         <img onClick={e => mobileHideElem(e)} className={showHideElem ? "reg-form__title-row-back active" : "reg-form__title-row-back"} alt={'стрелочка для возврата'} src={row_back_page}/>
                         <span className="reg-form__title-reg">Регистрация</span>
                     </div>
                     <div className="reg-form__username-reg-fields">
                        <div className="username-reg-fields__surname">
                            <label className="surname__label">Фамилия<span className="reg-main-block__red-star-heading_span">*</span></label>
                            <input className="surname__field"/>
                        </div>
                         <div className="username-reg-fields__first-name">
                             <label className="first-name__label">Имя<span className="reg-main-block__red-star-heading_span">*</span></label>
                             <input className="first-name__field"/>
                         </div>
                         <div className="username-reg-fields__middle-name">
                             <label className="middle-name__label">Отчество</label>
                             <input className="middle-name__field"/>
                         </div>
                     </div>
                     {/*<div className="reg-form__e-mail-field">*/}
                     {/*   <label className="e-mail-field__label">E-mail<span className="reg-main-block__red-star-heading_span">*</span></label>*/}
                     {/*    <input className="e-mail-field__field"/>*/}
                     {/*</div>*/}
                     {/*<div className="reg-form__set-password">*/}
                     {/*   <div className="set-password__set-pass">*/}
                     {/*       <label className="set-pass__set-pass-label">Придумайте пароль</label>*/}
                     {/*       <input type={"password"} className="set-pass__set-pass-field"/>*/}
                     {/*   </div>*/}
                     {/*    <div className="set-password__repeat-pass">*/}
                     {/*       <label className="set-pass__repeat-pass-label">Повторите пароль</label>*/}
                     {/*       <input className="set-pass__repeat-pass-field"/>*/}
                     {/*    </div>*/}
                     {/*</div>*/}
                         <div className={showHideElem ? 'reg-form__time-zone-main-container active' : 'reg-form__time-zone-main-container'}>
                             <p className="reg-form__time-zone-heading">Выберите часовой пояс<span className="reg-main-block__red-star-heading_span">*</span></p>
                             <div className="reg-form__time-zone-select-container" onClick={handleTimeZoneOptionsOpen}>
                                 <p className="reg-form__time-zone-select-value">{timeZoneLocation}</p>
                                 <img className="reg-form__time-zone-select-arrow" src={optionRow} alt="Стрелочка открытия меню" />
                                 {isTimeZoneOptionsOpen && (
                                     <div className="reg-form__time-zone-options-container">
                                         {timeZone.map((location, index) => (
                                             <p className="reg-form__time-zone-option" key={index} onClick={() => onSelectTimeZoneClick(location)}>{location.LABEL}</p>
                                         ))}
                                     </div>
                                 )}
                             </div>
                         </div>
                     {/*<div className="reg-form__politic-checkbox">*/}
                     {/*    <label className='remember-me__checkbox_container'>*/}
                     {/*        <input type="checkbox"/>*/}
                     {/*        <span className='remember-me__checkmark'/>*/}
                     {/*    </label>*/}
                     {/*    <span className="politic-checkbox__label">Ознакомлен с <a className="politic-checkbox__label-link" rel={'nofollow noreferrer'} href={'https://dltc.spbu.ru/confidentiality'} target={'_blank'}>Политикой</a>. Подтверждаю принадлежность мне указанного электронного адреса</span>*/}
                     {/*</div>*/}
                     {/*<div className="reg-form__reg-button">*/}
                     {/*    <button className="reg-button__button">Зарегистрироваться</button>*/}
                     {/*</div>*/}
                 </form>
                {/*-Кнопка для мобильной версии-*/}
                <div className={showHideElem ? 'reg-block__button-next-page active' : 'reg-block__button-next-page'}>
                    <span className="reg-block__button-next-page__label">Шаг 1 из 2</span>
                    <button className="reg-block__button-next-page__btn" type={"button"} onClick={e => mobileShowElem(e)}>Продолжить</button>
                    <div className="reg-block__button-next-page__link-auth">
                        <span className="button-next-page__link">Уже есть аккаунт?</span><Link className="button-next-page__link-auth" to={'/auth'}>Войти</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Reg;