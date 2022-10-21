import React from "react";
import close_icon from '../../img/RegistrationPassRequireModal_icon_close.svg';
import warning_icon from '../../img/RegistrationPassRequireModal_icon_warning.svg';
import warning_icon_mobile from '../../img/RegistrationPassRequireModal_icon_warning_mobile.svg';
import close_icon_mobile from '../../img/RegistrationPassRequireModal_icon_close_mobile.svg';


const RegPasswordRequireModal = (props) => {

   const {
       active,
       setActive
   } = props;

    return (
        <div className={active ? 'registration-pass-require-modal__wrapper active' : 'registration-pass-require-modal__wrapper'}>
            <div className={active ? 'registration-pass-require-modal__content active' : 'registration-pass-require-modal__content'}>
                <div className={'registration-pass-require-modal__content-text'}>
                    <img className={'content-text__warning-icon'} alt={'иконка предупреждение'} src={warning_icon}/>
                    <img className={'content-text__warning-icon-mobile'} alt={'иконка предупреждение'} src={warning_icon_mobile}/>
                    <span>Пароль должен содержать от 8 до 64 символов, состоять из латинских букв верхнего, нижнего регистра и цифр.</span>
                    <img className={'content-text__close-icon'} alt={'иконка крестик'} src={close_icon} onClick={() => setActive(false)}/>
                    <img className={'content-text__close-icon-mobile'} alt={'иконка крестик'} src={close_icon_mobile} onClick={() => setActive(false)}/>
                </div>
            </div>
        </div>
    )

}
export default RegPasswordRequireModal;