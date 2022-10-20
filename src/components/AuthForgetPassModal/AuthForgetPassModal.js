import React from "react";
import {useNavigate} from "react-router-dom";

const AuthForgetPassModal = (props) => {

    const {
        active,
        constants
    } = props;

    const linkAuth= useNavigate();

    return (
        <div className={active ? 'auth-forget-pass-modal active' : 'auth-forget-pass-modal'}>
            <div className='auth-forget-pass-modal__content'>
                <h1 className="auth-forget-pass-modal__content-title">{constants.AUTH_FORGET_PASS.AUTH_FORGET_PASS_MODAL_TITLE}</h1>
                <span className="auth-forget-pass-modal__content-info">{constants.AUTH_FORGET_PASS.AUTH_FORGET_PASS_MODAL_INFO}</span>
                <button className="auth-forget-pass-modal__content-btn" type={'button'} onClick={() => {linkAuth('/auth')}}>{constants.AUTH_FORGET_PASS.AUTH_FORGET_PASS_MODAL_BTN}</button>
            </div>
        </div>
    )
}
export default AuthForgetPassModal;