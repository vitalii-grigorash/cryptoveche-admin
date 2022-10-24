import React, {useState, useEffect} from "react";
import headerLogo from '../../img/HeaderLogo.svg';
import headerRowBtn from '../../img/HeaderRowButton.svg';
import headerMyprofileIcon from '../../img/HeaderMyprofileIcon.svg';
import headerSettingIcon from '../../img/HeaderSettingIcon.svg';
import headerSearchIcon from '../../img/HeaderSearchIcon.svg';
import headerSearchIconMobile from '../../img/HeaderSeachIconMobile.svg';
import headerExitIcon from '../../img/HeaderExitIcon.svg';
import {Link, useLocation} from "react-router-dom";
import HeaderBurgerMenu from "../HeaderBurgerMenu/HeaderBurgerMenu";


const Header = () => {

    const [activeAddButton, setActiveAddButton] = useState(false);
    const [activeMyProfile, setActiveMyProfile] = useState(false);
    const [burgerMenuActive, setBurgerMenuActive] = useState(false);
    const { pathname } = useLocation();


    function showAddButtonList() {
        setActiveAddButton(true)
    }

    function showMyProfileModal() {
        setActiveMyProfile(true)
    }
    useOnClickOutsideModal(activeAddButton, () => setActiveAddButton(false));
    useOnClickOutsideModal(activeMyProfile, () => setActiveMyProfile(false));

    function useOnClickOutsideModal(active, handler) {
        useEffect(() => {
            const listener = (e) => {
                if (!active) {
                    return;
                }
                handler(e);
            };
            document.addEventListener('click', listener);
            return function () {
                document.removeEventListener('click', listener);
            };
        }, [active, handler])
    }

    return (
        <div className="header">
            {/*/------Меню бургер для мобильной версии----------------------------------------------------------------------------*/}
            <div className={'header-burger-menu'}>
                <nav>
                    <div className={'header-burger-menu__button'} onClick={() => setBurgerMenuActive(true)}>
                        <span />
                    </div>
                </nav>
                <img alt={'иконка поиска'} src={headerSearchIconMobile}/>
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
                    <span className={pathname === '/' ? "logotype-link-buttons__organizations active" : "logotype-link-buttons__organizations"}>Организации</span>
                    <div onClick={showAddButtonList} className="logotype-link-buttons__add-button">
                        <p className="logotype-link-buttons__label-add-button">Добавить</p>
                        <img alt={'стрелочка для кнопки'} className="add-button__row-btn-open-list" src={headerRowBtn}/>
                        <div className={activeAddButton ? "logotype-link-buttons__select-list-buttons" : "logotype-link-buttons__select-list-buttons hidden"}>
                            {/*<Link to={'#'}>Голосование</Link>*/}
                            {/*<Link to={'#'}>Группу пользователей</Link>*/}
                            {/*<Link to={'#'}>Шаблон голосования</Link>*/}
                            <Link to={'/auth'}>Организацию</Link>
                        </div>
                    </div>
                </div>
                <div className="header__search-setting-myprofile">
                    {/*<div className="search-setting-myprofile__search">*/}
                    {/*    <img alt={'иконка поиска'} src={headerSearchIcon} className="search-setting-myprofile__icon-search" />*/}
                    {/*    <p className="search-setting-myprofile__label-search">Поиск</p>*/}
                    {/*</div>*/}
                    {/*<div className="search-setting-myprofile__settings">*/}
                    {/*    <img alt={'иконка настройки'} src={headerSettingIcon} className="search-setting-myprofile__icon-settings"/>*/}
                    {/*</div>*/}
                    <div onClick={showMyProfileModal} className="search-setting-myprofile__myprofile">
                        <img alt={'иконка мой профиль'} src={headerMyprofileIcon} className="search-setting-myprofile__icon-myprofile"/>
                        <p className="search-setting-myprofile__label-myprofile">Иванов И.И</p>
                        <div className={activeMyProfile ? "search-setting-myprofile__myprofile-modal-exit" : "search-setting-myprofile__myprofile-modal-exit hidden"}>
                            <Link to={'#'}>Мой профиль</Link>
                            <Link to={'#'}><img alt={'иконка выхода'} src={headerExitIcon} className="myprofile-modal-exit__icon"/>Выйти</Link>
                        </div>
                    </div>
                </div>
            </div>
            <HeaderBurgerMenu active={burgerMenuActive} setActive={setBurgerMenuActive}/>
        </div>
    )
}
export default Header;
