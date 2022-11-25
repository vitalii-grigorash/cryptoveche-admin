import React, {useEffect, useState} from "react";
import burgerMenuLogo from "../../img/HeaderBurgerMenu_logo.svg";
import burgerMenuIconRow from '../../img/HeaderRowButton.svg';
// import burger_menu_icon_search from '../../img/HeaderBurgerMenu_icon_search.svg';
import {Link, useNavigate} from "react-router-dom";

const HeaderBurgerMenu = (props) => {

    const {
        active,
        setActive,
        handleLogout,
        constants,
        authAs
    } = props;

    const [activeAddBtn, setActiveAddBtn] = useState(false);
    const [activeUsersBtn, setActiveUsersBtn] = useState(false);
    const [activeVotesBtn, setActiveVotesBtn] = useState(false);
    const linkPage = useNavigate();

    useEffect(() => {
        if (active === true) {
            setActiveAddBtn(false)
            setActiveUsersBtn(false)
            setActiveVotesBtn(false)
        }
    }, [active])

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
                    <Link to={'/'} onClick={() => setActive(false)}>{constants.HEADER.HEADER_MAIN}</Link>
                    {authAs === 'superAdmin' ? <Link to={'/organizations'} onClick={() => setActive(false)}>{constants.HEADER.HEADER_BURGER_ORG}</Link> : null}
                </div>
                {authAs === 'admin' || authAs === 'superAdmin' ? <div className="burger-menu__users-button">
                    <div onClick={() => setActiveUsersBtn(!activeUsersBtn)} className="burger-menu__users-button-label-row">
                        <p>{constants.HEADER.HEADER_USERS}</p>
                        <img alt={'иконка стрелочка'} src={burgerMenuIconRow} className={activeUsersBtn ? "burger-menu__users-button-row active" : "burger-menu__users-button-row"}/>
                    </div>
                    <div className={activeUsersBtn ? "burger-menu__users-button-drop-down-list active" : "burger-menu__users-button-drop-down-list"}>
                        <Link to={'/group-users'}>{constants.HEADER.HEADER_GROUP_USERS}</Link>
                        <Link to={'/list-users'}>{constants.HEADER.HEADER_USERS_LIST}</Link>
                    </div>
                </div> : null}
                <div className="burger-menu__votes-button">
                    <div onClick={() => setActiveVotesBtn(!activeVotesBtn)} className="burger-menu__votes-button-label-row">
                        <p>{constants.HEADER.HEADER_VOTE}</p>
                        <img alt={'иконка стрелочка'} src={burgerMenuIconRow} className={activeVotesBtn ? "burger-menu__votes-button-row active" : "burger-menu__votes-button-row"}/>
                    </div>
                    <div className={activeVotesBtn ? "burger-menu__votes-button-drop-down-list active" : "burger-menu__votes-button-drop-down-list"}>
                        <Link to={'/list-votes'}>{constants.HEADER.HEADER_LIST_VOTES}</Link>
                        {authAs === 'admin' ? <Link to={'#'}>{constants.HEADER.HEADER_TEMPLATE_VOTES}</Link> : null}
                    </div>
                </div>
                {authAs === 'admin' || authAs === 'superAdmin' ? <div className="burger-menu__add-button">
                    <div onClick={() => setActiveAddBtn(!activeAddBtn)} className="burger-menu__add-button-label-row">
                        <p>{constants.HEADER.HEADER_BURGER_ADD_BTN}</p>
                        <img alt={'иконка стрелочка'} src={burgerMenuIconRow} className={activeAddBtn ? "burger-menu__add-button-row active" : "burger-menu__add-button-row"}/>
                    </div>
                    <div className={activeAddBtn ? "burger-menu__add-button-drop-down-list active" : "burger-menu__add-button-drop-down-list"}>
                        {authAs === 'admin' ? <Link to={'/add-new-vote'}>{constants.HEADER.HEADER_ADD_VOTE}</Link> : null}
                        {authAs === 'admin' ? <Link to={'#'}>{constants.HEADER.HEADER_ADD_GROUP_USERS}</Link> : null}
                        {authAs === 'admin' ? <Link to={'#'}>{constants.HEADER.HEADER_ADD_TEMPLATE_VOTE}</Link> : null}
                        {authAs === 'superAdmin' ? <Link to={'/add-org-page'} onClick={() => setActive(false)}>{constants.HEADER.HEADER_BURGER_ADD_ORG}</Link> : null}
                    </div>
                </div> : null}
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