import React, {useState, useEffect, useMemo} from "react";
import headerLogo from '../../img/HeaderLogo.svg';
import headerRowBtn from '../../img/HeaderRowButton.svg';
import headerMyprofileIcon from '../../img/HeaderMyprofileIcon.svg';
// import headerSettingIcon from '../../img/HeaderSettingIcon.svg';
// import headerSearchIcon from '../../img/HeaderSearchIcon.svg';
import headerSearchIconMobile from '../../img/HeaderSeachIconMobile.svg';
import headerExitIcon from '../../img/HeaderExitIcon.svg';
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderBurgerMenu from "../HeaderBurgerMenu/HeaderBurgerMenu";
import {useOnClickOutsideModal} from "../../utils/CustomHooks/UseOutsideModal/UseOutsideModal";

const Header = (props) => {

    const {
        constants,
        userName,
        handleLogout,
        authAs
    } = props;

    const [activeAddButton, setActiveAddButton] = useState(false);
    const [activeMyProfile, setActiveMyProfile] = useState(false);
    const [activeUsersButton, setActiveUsersButton] = useState(false);
    const [activeVotesButton, setActiveVotesButton] = useState(false);
    const [burgerMenuActive, setBurgerMenuActive] = useState(false);
    const { pathname } = useLocation();
    const linkButtonOrgPage = useNavigate();

    function showAddButtonList() {
        setActiveAddButton(true)
    }

    function showUserButtonList() {
        setActiveUsersButton(true)
    }

    function showVotesButtonList() {
        setActiveVotesButton(true)
    }

    function showMyProfileModal() {
        setActiveMyProfile(true)
    }

    useOnClickOutsideModal(activeAddButton, () => setActiveAddButton(false));
    useOnClickOutsideModal(activeMyProfile, () => setActiveMyProfile(false));
    useOnClickOutsideModal(activeUsersButton, () => setActiveUsersButton(false));
    useOnClickOutsideModal(activeVotesButton, () => setActiveVotesButton(false));

    return (
        <div className="header">
            {/*/------Меню бургер для мобильной версии---------------------------------------------------------------*/}
            <div className={'header-burger-menu'}>
                <nav>
                    <div className={'header-burger-menu__button'} onClick={() => setBurgerMenuActive(true)}>
                        <span />
                    </div>
                </nav>
                <img alt={'иконка поиска'} src={headerSearchIconMobile} />
                <input
                    placeholder='Поиск'
                    className='header-burger-menu__input-search'
                    type="text"
                    name="search"
                />
            </div>
            <div className="header__container _container">
                <div className="header__logotype-link-buttons">
                    <img alt={'логотип'} className="logotype-link-buttons__logo" src={headerLogo} />
                    <span onClick={() => linkButtonOrgPage('/')} className={pathname === '/' ? "logotype-link-buttons__organizations active" : "logotype-link-buttons__organizations"}>{constants.HEADER.HEADER_MAIN}</span>
                    {authAs === 'admin' || authAs === 'superAdmin' ? <div onClick={showUserButtonList} className={pathname === '/group-users' ? "logotype-link-buttons__users active" : "logotype-link-buttons__users"}>
                        <div className="logotype-link-buttons__users-label-icon">
                            <p className="logotype-link-buttons__users-label">{constants.HEADER.HEADER_USERS}</p>
                            <img className="logotype-link-buttons__users-icon-row" src={headerRowBtn} alt={'иконка-стрелочка'}/>
                        </div>
                        <div className={activeUsersButton ? "logotype-link-buttons__users-select-list" : "logotype-link-buttons__users-select-list hidden"}>
                            <Link to={'/group-users'}>{constants.HEADER.HEADER_GROUP_USERS}</Link>
                            <Link to={'/list-users'}>{constants.HEADER.HEADER_USERS_LIST}</Link>
                        </div>
                    </div> : null}
                    <div onClick={showVotesButtonList} className={pathname === '/votes' ? "logotype-link-buttons__users active" : "logotype-link-buttons__users"}>
                        <div className="logotype-link-buttons__users-label-icon">
                            <p className="logotype-link-buttons__users-label">{constants.HEADER.HEADER_VOTE}</p>
                            <img className="logotype-link-buttons__users-icon-row" src={headerRowBtn} alt={'иконка-стрелочка'}/>
                        </div>
                        <div className={activeVotesButton ? "logotype-link-buttons__users-select-list" : "logotype-link-buttons__users-select-list hidden"}>
                            <Link to={'/list-votes'}>{constants.HEADER.HEADER_LIST_VOTES}</Link>
                            {authAs === 'admin' ? <Link to={'/list-templates'}>{constants.HEADER.HEADER_TEMPLATE_VOTES}</Link> : null}
                        </div>
                    </div>
                    {authAs === 'superAdmin' ? <span onClick={() => linkButtonOrgPage('/organizations')} className={pathname === '/organizations' ? "logotype-link-buttons__organizations active" : "logotype-link-buttons__organizations"}>{constants.HEADER.HEADER_ORG}</span> : null}
                    {authAs === 'admin' || authAs === 'superAdmin' ? <div onClick={showAddButtonList} className="logotype-link-buttons__add-button">
                        <p className="logotype-link-buttons__label-add-button">{constants.HEADER.HEADER_ADD_BTN}</p>
                        <img alt={'стрелочка для кнопки'} className="add-button__row-btn-open-list" src={headerRowBtn} />
                        <div className={activeAddButton ? "logotype-link-buttons__select-list-buttons" : "logotype-link-buttons__select-list-buttons hidden"}>
                            {authAs === 'admin' ? <Link to={'/add-new-vote'}>{constants.HEADER.HEADER_ADD_VOTE}</Link> : null}
                            {authAs === 'admin' ? <Link to={'/add-new-group'}>{constants.HEADER.HEADER_ADD_GROUP_USERS}</Link> : null}
                            {authAs === 'admin' ? <Link to={'/add-new-template'}>{constants.HEADER.HEADER_ADD_TEMPLATE_VOTE}</Link> : null}
                            {authAs === 'superAdmin' ? <Link to={'/add-org-page'}>{constants.HEADER.HEADER_ADD_ORG}</Link> : null}
                        </div>
                    </div>: null}
                </div>
                <div className={pathname === '/profile-user' ? "header__search-setting-myprofile active" : "header__search-setting-myprofile"}>
                    {/*<div className="search-setting-myprofile__search">*/}
                    {/*    <img alt={'иконка поиска'} src={headerSearchIcon} className="search-setting-myprofile__icon-search" />*/}
                    {/*    <p className="search-setting-myprofile__label-search">Поиск</p>*/}
                    {/*</div>*/}
                    {/*<div className="search-setting-myprofile__settings">*/}
                    {/*    <img alt={'иконка настройки'} src={headerSettingIcon} className="search-setting-myprofile__icon-settings"/>*/}
                    {/*</div>*/}
                    <div onClick={showMyProfileModal} className="search-setting-myprofile__myprofile">
                        <img alt='иконка мой профиль' src={headerMyprofileIcon} className="search-setting-myprofile__icon-myprofile" />
                        <p className="search-setting-myprofile__label-myprofile">{userName}</p>
                        <div className={activeMyProfile ? "search-setting-myprofile__myprofile-modal-exit" : "search-setting-myprofile__myprofile-modal-exit hidden"}>
                            <Link to={'/profile-user'}>{constants.HEADER.HEADER_MYPROFILE_MODAL}</Link>
                            <div onClick={handleLogout}>
                                <img alt='иконка выхода' src={headerExitIcon} className="myprofile-modal-exit__icon" />
                                <p>{constants.HEADER.HEADER_MYPROFILE_MODAI_EXIT}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HeaderBurgerMenu
                constants={constants}
                active={burgerMenuActive}
                setActive={setBurgerMenuActive}
                authAs={authAs}
                handleLogout={handleLogout}/>
        </div>
    )
}
export default Header;
