import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import GroupUsers from "../GroupUsers/GroupUsers";
import ListUsers from "../ListUsers/ListUsers";
import AddNewGroupUsers from "../AddNewGroupUsers/AddNewGroupUsers";
import Main from "../Main/Main";
import GroupUsersSelectNameGroup from "../GroupUsersSelectNameGroup/GroupUsersSelectNameGroup";
import VotesPage from "../VotesPage/VotesPage";
import AddNewVote from "../AddNewVote/AddNewVote";
import OrgSettings from "../OrgSettings/OrgSettings";
import ListTemplates from "../ListTemplates/ListTemplates";
import DetailsVote from "../DetailsVote/DetailsVote";

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
    const [isPreloaderAuthBtn, setPreloaderAuthBtn] = useState(false);
    const [authAs, setAuthAs] = useState('');
    const { pathname } = useLocation();

    function requestHelper(request, body = {}) {
        return new Promise((resolve, reject) => {
            if (localStorage.getItem('jwt')) {
                const jwt = localStorage.getItem('jwt');
                const jwtTokens = JSON.parse(jwt);
                request(jwtTokens.access_token, body)
                    .then((res) => {
                        if (res.status === 'failure') {
                            UserAuth.getNewTokens(jwtTokens.refresh_token)
                                .then((newTokens) => {
                                    if (newTokens.status === 'failure') {
                                        logout();
                                    } else {
                                        localStorage.setItem('jwt', JSON.stringify(newTokens));
                                        request(newTokens.access_token, body)
                                            .then((res) => {
                                                resolve(res);
                                            })
                                            .catch((err) => {
                                                throw new Error(err.message);
                                            })
                                    }
                                })
                                .catch((err) => {
                                    throw new Error(err.message);
                                })
                        } else {
                            resolve(res);
                        }
                    })
                    .catch((err) => {
                        throw new Error(err.message);
                    })
            } else {
                logout();
            }
        })
    }

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

    function logout() {
        if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
        }
        if (localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt');
        }
        setLoggedIn(false);
        setCurrentUser({});
        setUserName('');
        navigate('/auth');
    }

    function handleLogin(email, password, authAs) {
        setPreloaderAuthBtn(true);
        UserAuth.authorize(email, password, authAs)
            .then((res) => {
                if (res.status === 'failure') {
                    handleAuthError(false);
                    handleAuthErrorMessage(constants.AUTH.AUTH_ERROR_MESSAGE);
                } else if (res.status === 'Permission denied') {
                    handleAuthError(false);
                    handleAuthErrorMessage(constants.AUTH.AUTH_ERROR_MESSAGE);
                } else {
                    if (isRememberMe) {
                        localStorage.setItem('user', JSON.stringify(res));
                    }
                    handleAuthError(true);
                    handleAuthErrorMessage('');
                    setLoggedIn(true);
                    addCurrentUser(res);
                    createUserName(res);
                    setAuthAs(res.authAs);
                    navigate('/');
                }
            })
            .catch((err) => {
                throw new Error(err.message);
            })
            .finally(() => {
                setPreloaderAuthBtn(false);
            })
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const userData = localStorage.getItem('user');
            const user = JSON.parse(userData);
            addCurrentUser(user);
            createUserName(user);
            setLoggedIn(true);
            setAuthAs(user.authAs);
            if (!(
                pathname === '/' ||
                pathname === '/add-org-page' ||
                pathname === '/organizations' ||
                pathname === '/profile-user' ||
                pathname === '/org-settings' ||
                pathname === '/add-new-group' ||
                pathname === '/add-new-vote' ||
                pathname === '/group-users' ||
                pathname === '/group-users/selected-name-group' ||
                pathname === '/list-users' ||
                pathname === '/list-votes'
            )) {
                navigate('/');
            }
        } else {
            if (!(
                pathname === '/auth'
            )) {
                logout();
            }
        }
        // eslint-disable-next-line
    }, []);

    function onOrgSettingsClick(org) {
        const currentOrg = {
            id: org.id
        }
        localStorage.setItem('currentOrgId', JSON.stringify(currentOrg));
        navigate('/org-settings');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                {isLoggedIn && (
                    <Header
                        constants={constants}
                        handleLogout={logout}
                        userName={userName}
                        authAs={authAs}
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
                            isPreloaderAuthBtn={isPreloaderAuthBtn}
                        />}
                    />
                    <Route exact path={'/'}
                        element={<Main
                            constants={constants}
                        />}
                    />
                    <Route exact path={'/organizations'}
                        element={<OrganizationsList
                            constants={constants}
                            requestHelper={requestHelper}
                            onOrgSettingsClick={onOrgSettingsClick}
                        />}
                    />
                    <Route path={'/org-settings'}
                        element={<OrgSettings
                            constants={constants}
                            requestHelper={requestHelper}
                        />}
                    />
                    <Route path={'/add-org-page'}
                        element={<AddNewOrganization
                            constants={constants}
                            requestHelper={requestHelper}
                        />}
                    />
                    <Route path={'/add-new-group'}
                        element={<AddNewGroupUsers
                            constants={constants}
                        />}
                    />
                    <Route path={'/add-new-vote'}
                        element={<AddNewVote
                            constants={constants}
                        />}
                    />
                    <Route path={'/add-new-template'}
                           element={<AddNewVote
                               constants={constants}
                           />}
                    />
                    <Route path={'/profile-user'}
                        element={<ProfileUser
                            constants={constants}
                        />}
                    />
                    <Route exact path={'/group-users'}
                        element={<GroupUsers
                            constants={constants}
                            authAs={authAs}
                        />}
                    />
                    <Route path={'/group-users/selected-name-group'}
                        element={<GroupUsersSelectNameGroup
                            constants={constants}
                            authAs={authAs}
                        />}
                    />
                    <Route path={'/list-users'}
                        element={<ListUsers
                            constants={constants}
                        />}
                    />
                    <Route exact path={'/list-votes'}
                        element={<VotesPage
                            constants={constants}
                            authAs={authAs}
                        />}
                    />
                    <Route path={'/details-vote'}
                           element={<DetailsVote
                               constants={constants}
                               authAs={authAs}
                               requestHelper={requestHelper}
                           />}
                    />
                    <Route exact path={'/list-templates'}
                           element={<ListTemplates
                               constants={constants}
                           />}
                    />
                </Routes>
                {isLoggedIn && (
                    <Footer
                        handleLangChange={handleLangChange}
                        constants={constants}
                        changeLanguageBtn={changeLanguageBtn}
                        authAs={authAs}
                    />
                )}
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;
