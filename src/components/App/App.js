import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { config } from '../../config';
import * as en from '../../utils/Localization/En/constants';
import * as ru from '../../utils/Localization/Ru/constants';
import Auth from "../Auth/Auth";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import OrganizationsList from "../OrganizationsList/OrganizationsList";
import AddNewOrganization from "../AddNewOrganization/AddNewOrganization";
import ProfileUser from "../ProfileUser/ProfileUser";
import * as UserAuth from '../../Api/Auth';
// import Reg from "../Reg/Reg";
// import AuthSetPass from "../AuthSetPass/AuthSetPass";
// import AuthForgetPass from "../AuthForgetPass/AuthForgetPass";

function App() {

    const navigate = useNavigate();
    const [constants, setConstants] = useState(ru.constants);
    const [changeLanguageBtn, setChangeLanguageBtn] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isRememberMe, setRememberMe] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const [userName, setUserName] = useState('');
    const [isAuthFormValid, setAuthFormValid] = useState(true);
    const [authErrorMessage, setAuthErrorMessage] = useState('');
    // const { pathname } = useLocation();

    function handleLangChange(value) {
        const lang = {
            lang: value
        }
        if (value === 'ru') {
            setConstants(ru.constants);
            localStorage.setItem('lang', JSON.stringify(lang));
            setChangeLanguageBtn(true);
        } else {
            setConstants(en.constants);
            localStorage.setItem('lang', JSON.stringify(lang));
            setChangeLanguageBtn(false);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('lang')) {
            const storageLang = localStorage.getItem('lang');
            const lang = JSON.parse(storageLang);
            if (lang.lang === 'en') {
                setConstants(en.constants);
                setChangeLanguageBtn(false);
            } else {
                setConstants(ru.constants);
                setChangeLanguageBtn(true);
            }
        } else {
            setConstants(ru.constants);
        }
    }, []);

    function handleRememberMe() {
        if (isRememberMe) {
            setRememberMe(false);
        } else {
            setRememberMe(true);
        }
    }

    function addCurrentUser(user) {
        setCurrentUser(user);
    }

    const userDefaultName = {
        lastName: "Неизвестный",
        firstName: "Пользователь"
    }

    function createUserName(user) {
        const firstName = function () {
            if (user.first_name === "" || user.first_name === undefined) {
                return `${userDefaultName.firstName.charAt(0)}`;
            } else {
                return `${user.first_name.charAt(0)}`;
            }
        }
        const lastName = function () {
            if (user.last_name === "" || user.last_name === undefined) {
                return userDefaultName.lastName
            } else {
                return user.last_name;
            }
        }
        const middleName = function () {
            if (user.second_name === "" || user.second_name === undefined) {
                return ""
            } else {
                return `${user.second_name.charAt(0)}.`;
            }
        };
        const shortName = `${lastName()} ${firstName()}.${middleName()}`;
        setUserName(shortName);
    }

    function handleAuthError(isValid) {
        setAuthFormValid(isValid);
    }

    function handleAuthErrorMessage(message) {
        setAuthErrorMessage(message);
    }

    function handleLogin(email, password, authAs) {
        console.log(email);
        console.log(password);
        console.log(authAs);
        UserAuth.authorize(email, password, authAs)
            .then((res) => {
                console.log(res);
                if (res.status === 'failure') {
                    handleAuthError(false);
                    handleAuthErrorMessage(constants.AUTH.AUTH_ERROR_MESSAGE);
                    // setPreloaderAuthBtn(false);
                } else if (res.status === 'Permission denied') {
                    handleAuthError(false);
                    handleAuthErrorMessage(constants.AUTH.AUTH_ERROR_MESSAGE);
                } else {
                    // if (isRememberMe) {
                    //     localStorage.setItem('user', JSON.stringify(res));
                    // }
                    handleAuthError(true);
                    handleAuthErrorMessage('');
                    // setLoggedIn(true);
                    // addCurrentUser(res);
                    // createUserName(res);
                    // navigate('/');
                }
            })
            .catch((err) => {
                throw new Error(err.message);
            })
        // setPreloaderAuthBtn(true);

    }

    return (
        <div className="app">
            {isLoggedIn && (
                <Header
                    constants={constants}
                />
            )}
            <Routes>
                <Route path={'/auth'}
                    element={<Auth
                        handleLangChange={handleLangChange}
                        constants={constants}
                        changeLanguageBtn={changeLanguageBtn}
                        handleRememberMe={handleRememberMe}
                        isRememberMe={isRememberMe}
                        config={config}
                        handleLogin={handleLogin}
                        isAuthFormValid={isAuthFormValid}
                        handleAuthError={handleAuthError}
                        handleAuthErrorMessage={handleAuthErrorMessage}
                        authErrorMessage={authErrorMessage}
                    />}
                />
                <Route exact path={'/'}
                    element={<OrganizationsList
                        constants={constants}
                    />}
                />
                <Route path={'/add-org-page'}
                    element={<AddNewOrganization
                        constants={constants}
                    />}
                />
                <Route path={'/profile-user'}
                    element={<ProfileUser
                        constants={constants}
                    />}
                />
            </Routes>
            {isLoggedIn && (
                <Footer
                    handleLangChange={handleLangChange}
                    constants={constants}
                    changeLanguageBtn={changeLanguageBtn}
                />
            )}
        </div>
    );
}

export default App;
