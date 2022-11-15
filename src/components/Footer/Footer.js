import React, {useState} from "react";
import footerLogo from '../../img/FooterLogo.svg';
import footerRowSelect from '../../img/FooterRowSelect.svg';
import footerLogoMobile from '../../img/FooterLogoMobile.svg';
import {Link} from "react-router-dom";

const Footer = (props) => {

    const {
        handleLangChange,
        constants,
        changeLanguageBtn
    } = props;

    const [activeLangList, setActiveLangList] = useState(false);
    const [activeUsersBtn, setActiveUsesBtn] = useState(false);
    const [activeVotesBtn, setActiveVotesBtn] = useState(false);


    function closeLangList () {
        if (activeLangList === false) {
            setActiveLangList(true)
        } else {
            setActiveLangList(false)
        }
    }

    function showLangList() {
        if (activeLangList === false) {
            setActiveLangList(true)
        } else {
            setActiveLangList(false)
        }
    }

    return (
        <div className="footer">
            <div className="footer__container _container">
                <div className="footer__logotype-mobile">
                    <img alt={'логотип'} src={footerLogoMobile} />
                </div>
                <div className="footer__logotype">
                    <img alt={'логотип'} src={footerLogo} className="footer__logotype-logo"/>
                    <p>©2019-2022.{constants.FOOTER.FOOTER_COPI_INFO_PART1}</p>
                    <p>{constants.FOOTER.FOOTER_COPI_INFO_PART2}</p>
                    <p>{constants.FOOTER.FOOTER_COPI_INFO_PART3}</p>
                    <p>{constants.FOOTER.FOOTER_COPI_INFO_PART4}</p>
                    <p>{constants.FOOTER.FOOTER_COPI_INFO_PART5}</p>
                </div>
                <div className="footer__map-site">
                    <h3 className="footer__map-site-title">{constants.FOOTER.FOOTER_MAP_SITE}</h3>
                    <Link to={'/'}>{constants.FOOTER.FOOTER_MAIN_PAGE}</Link>
                    <div className="map-site__users">
                        <div onClick={() => setActiveUsesBtn(!activeUsersBtn)}  className="map-site__users-icon-block">
                            <Link to={'#'}>{constants.FOOTER.FOOTER_USERS}</Link>
                            <img alt={'стрелка'} src={footerRowSelect} className={activeUsersBtn ? "map-site__users-row active" : "map-site__users-row"}/>
                        </div>
                        <div className={activeUsersBtn ? "map-site__users-drop-down-list active" : "map-site__users-drop-down-list"}>
                            <Link to={'#'}>{constants.FOOTER.FOOTER_GROUP_USERS}</Link>
                            <Link to={'#'}>{constants.FOOTER.FOOTER_LIST_USERS}</Link>
                        </div>
                    </div>
                    <div className="map-site__votes">
                        <div onClick={() => setActiveVotesBtn(!activeVotesBtn)} className="map-site__votes-icon-block">
                            <Link to={'#'}>{constants.FOOTER.FOOTER_VOTES}</Link>
                            <img alt={'стрелка'} src={footerRowSelect} className={activeVotesBtn ? "map-site__votes-row active" : "map-site__votes-row"}/>
                        </div>
                        <div className={activeVotesBtn ? "map-site__votes-drop-down-list active" : "map-site__votes-drop-down-list"}>
                            <Link to={'#'}>{constants.FOOTER.FOOTER_LIST_VOTES}</Link>
                            <Link to={'#'}>{constants.FOOTER.FOOTER_TEMPLATE_VOTES}</Link>
                        </div>
                    </div>
                    <Link to={'#'}>{constants.FOOTER.FOOTER_ORG}</Link>
                    <Link to={'#'}>{constants.FOOTER.FOOTER_MYPROFILE}</Link>
                </div>
                <div className="footer__settings">
                    <h3 className="footer__settings-title">{constants.FOOTER.FOOTER_SETTINGS}</h3>
                    <div className="settings__select-lang">
                        <p>{constants.FOOTER.FOOTER_LANG}:</p>
                        <div className={changeLanguageBtn ? "select-lang__type-lang" : "select-lang__type-lang active"}>
                            <p onClick={showLangList}>{changeLanguageBtn ? `${constants.FOOTER.FOOTER_SELECT_LANG_RU}` : `${constants.FOOTER.FOOTER_SELECT_LANG_EN}`}</p>
                            <div onClick={closeLangList} className={activeLangList ? "type-lang__list active" : "type-lang__list"}>
                                <p onClick={() => handleLangChange('ru')} className={changeLanguageBtn ? "type-lang__ru" : "type-lang__ru active"}>{constants.FOOTER.FOOTER_SELECT_LANG_RU}</p>
                                <p onClick={() => handleLangChange('en')} className={changeLanguageBtn ? "type-lang__en active" : "type-lang__en"}>{constants.FOOTER.FOOTER_SELECT_LANG_EN}</p>
                            </div>
                        </div>
                        <img alt={'стрелка'} src={footerRowSelect} className={"select-lang__row"}/>
                    </div>
                    {/*<div className="settings__select-fonts">*/}
                    {/*    <p>{constants.FOOTER.FOOTER_SIZE_FONT}:</p>*/}
                    {/*    <div className="select-fonts__type-font">*/}
                    {/*        <p>{constants.FOOTER.FOOTER_SELECT_SIZE}</p>*/}
                    {/*    </div>*/}
                    {/*    <img alt={'стрелка'} src={footerRowSelect} className={"select-fonts__row"}/>*/}
                    {/*</div>*/}
                    {/*<div className="settings__select-timezone">*/}
                    {/*    <p>{constants.FOOTER.FOOTER_TIME_ZONE}:</p>*/}
                    {/*    <div className="select-timezone__type-timezone">*/}
                    {/*        <p>{constants.FOOTER.FOOTER_SELECT_TIME_ZONE}</p>*/}
                    {/*    </div>*/}
                    {/*     <img alt={'стрелка'} src={footerRowSelect} className={"select-timezone__row"}/>  */}
                    {/*</div>*/}
                </div>
                <div className="footer__support">
                    <h3 className="footer__support-title">{constants.FOOTER.FOOTER_SUPPORT}</h3>
                    <a href='https://dltc.spbu.ru/confidentiality' target={'_blank'} rel={'noopener noreferrer'}>{constants.FOOTER.FOOTER_POLITIC}</a>
                    <a href='mailto:support@dltc.spbu.ru'>{constants.FOOTER.FOOTER_MAIL_SUPPORT}</a>
                </div>
            </div>
        </div>
    )
}
export default Footer;