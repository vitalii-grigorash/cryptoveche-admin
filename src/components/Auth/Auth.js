import '../Auth/Auth.css';
import cryptoveche_logo from '../../img/Auth_logotype_crypto.svg';
import row_input_select_role from '../../img/Auth_icon_row_select_role.svg';

const Auth = () => {


    return (
        <div className="wrapper-auth">
            <div className="auth-main-block">
                <div className="auth-main-block__auth-form">
                    <div className="auth-form__title">
                        Авторизация
                    </div>
                    <div className="auth-form__select-role">
                        <label>Войти как</label>
                        <div className="my-profile-form__time-zone-select-container">
                            <p className="my-profile-form__time-zone-select-value"></p>
                            <img className="my-profile-form__time-zone-select-arrow" src={row_input_select_role} alt="Стрелочка открытия меню"/>
                                <div className="my-profile-form__time-zone-options-container">
                                        <p className="my-profile-form__time-zone-option"></p>
                                </div>
                        </div>
                    </div>
                    <div className="auth-form__username">

                    </div>
                    <div className="auth-form__password">

                    </div>
                    <div className="auth-form__link-forget-pass">
                    </div>
                    <div className="auth-form__remember-me">
                    </div>
                    <div className="auth-form__button-enter">
                    </div>
                </div>
                <div className="auth-main-block__reg-btn-logotype">
                    <div className="reg-btn-logotype__logo">
                        <img className="logo__cryptoveche-logotype" alt={'логотип'} src={cryptoveche_logo}/>
                    </div>
                    <div className="reg-btn-logotype__title">
                        Панель управления системой электронных голосований
                    </div>
                    <div className="reg-btn-logotype__question-account">
                    </div>
                    <div className="reg-btn-logotype__reg-btn">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Auth;