import React, {useEffect, useState} from "react";
import burgerMenuLogo from "../../img/HeaderBurgerMenu_logo.svg";
import burgerMenuIconRow from '../../img/HeaderRowButton.svg';
// import burger_menu_icon_search from '../../img/HeaderBurgerMenu_icon_search.svg';
import { Link } from "react-router-dom";

const HeaderBurgerMenu = ({ active, setActive, handleLogout, constants }) => {

    const [activeAddOrg, setActiveAddOrg] = useState(false);

    function showAddOrg() {
        if (activeAddOrg === false) {
            setActiveAddOrg(true)
        } else {
            setActiveAddOrg(false)
        }
    }

    useOnClickOutsideModal(active, () => setActive(false));

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
        <div className={active ? 'burger-menu active' : 'burger-menu'} onClick={() => setActive(false)}>
            {/*<div className='blur' />*/}
            <div className={active ? 'burger-menu__content active' : 'burger-menu__content'} onClick={e => e.stopPropagation()}>
                <div className='burger-menu__logotype-block'>
                    <img alt={'Logo'} src={burgerMenuLogo} />
                    {/* <div><span>РУС</span><span>ENG</span></div> */}
                </div>
                <div className='burger-menu__link-page'>
                    <Link to={'/'} onClick={() => setActive(false)}>{constants.HEADER.HEADER_BURGER_ORG}</Link>
                    {/*<Link to={'/votes-page'} onClick={() => setActive(false)}>Голосования</Link>*/}
                    {/*<Link to={'/my-profile'} onClick={() => setActive(false)}>Мой профиль</Link>*/}
                </div>
                <div className="burger-menu__add-button">
                    <div onClick={showAddOrg} className="burger-menu__add-button-label-row">
                        <p>{constants.HEADER.HEADER_BURGER_ADD_BTN}</p><img alt={'иконка стрелочка'} src={burgerMenuIconRow} className={activeAddOrg ? "burger-menu__add-button-row active" : "burger-menu__add-button-row"}/>
                    </div>
                    <p className={activeAddOrg ? "burger-menu__add-button-org active" : "burger-menu__add-button-org"}>{constants.HEADER.HEADER_BURGER_ADD_ORG}</p>
                </div>
                {/* <div className={'burger-menu__toggle-font'}>
                        <span>Увеличить шрифт</span>
                        <label className={'toggle-font__button'}>
                            <input type={"checkbox"}/>
                            <span className={'toggle-font__slider'}/>
                        </label>
                    </div> */}
                <div className='burger-menu__politic-support'>
                    <span><a href="https://dltc.spbu.ru/confidentiality" target="_blank" rel="noopener noreferrer">{constants.HEADER.HEADER_BURGER_POLITIC}</a></span>
                    <a href="mailto:support@dltc.spbu.ru">support@dltc.spbu.ru</a>
                </div>
                <div className='burger-menu__search-form-logo'>
                    <span>© KRIPTOVECHE</span>
                    {/* <img alt={'icon_search'} src={burger_menu_icon_search}/>
                        <input placeholder={'Поиск'} type={'text'}/> */}
                    <p className="burger-menu__logout-button" onClick={handleLogout}>{constants.HEADER.HEADER_BURGER_EXIT}</p>
                </div>
            </div>
        </div>
    )

}
export default HeaderBurgerMenu;