import React, {useEffect, useRef, useState} from "react";
import footerLogo from '../../img/FooterLogo.svg';
import footerRowSelect from '../../img/FooterRowSelect.svg';

const Footer = (props) => {

    const {
        handleLangChange,
        constants,
        changeLanguageBtn
    } = props;

    const [activeLangList, setActiveLangList] = useState(false);


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
                    {/*<p>{constants.FOOTER.FOOTER_MAIN_PAGE}</p>*/}
                    {/*<div className="map-site__votes">*/}
                    {/*    <p>{constants.FOOTER.FOOTER_VOTES}</p>*/}
                    {/*    <img alt={'стрелка'} src={footerRowSelect} className="map-site__votes-row"/>*/}
                    {/*</div>*/}
                    {/*<div className="map-site__users">*/}
                    {/*    <p>{constants.FOOTER.FOOTER_USERS}</p>*/}
                    {/*    <img alt={'стрелка'} src={footerRowSelect} className="map-site__users-row"/>*/}
                    {/*</div>*/}
                    <p>{constants.FOOTER.FOOTER_ORG}</p>
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
                    <div className="settings__select-fonts">
                        <p>{constants.FOOTER.FOOTER_SIZE_FONT}:</p>
                        <div className="select-fonts__type-font">
                            <p>{constants.FOOTER.FOOTER_SELECT_SIZE}</p>
                        </div>
                        <img alt={'стрелка'} src={footerRowSelect} className={"select-lang__row"}/>
                    </div>
                    <div>
                        <p>{constants.FOOTER.FOOTER_TIME_ZONE}:</p>
                        <div>
                            <p>{constants.FOOTER.FOOTER_SELECT_TIME_ZONE}</p>
                        </div>
                    </div>
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