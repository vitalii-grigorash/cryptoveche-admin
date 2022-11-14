import React, { useState } from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import iconProfilePhoto from '../../img/ProfileUserPersonalDataIcon.svg';
import iconTime from '../../img/ProfilelUserIconTime.svg';
import optionRow from '../../img/Auth_icon_row_select_role.svg';
import timeZone from '../../utils/TimeZoneData/TimeZoneRu.json';
import hideIconPass from '../../img/Auth_show_pass_icon.svg';
// import showIconPass from '../../img/Auth_hidden_pass.svg';
import iconStarSecretary from '../../img/ProfileUserIconStar.svg';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ProfileUser = (props) => {

    const {
        constants
    } = props;

    const currentUser = React.useContext(CurrentUserContext);
    const [editDataUser, setEditDataUser] = useState(false);
    const [timeZoneLocation, setTimeZoneLocation] = useState('(UTC+3) Россия - Москва - московское время');
    const [timeZoneValue, setTimeZoneValue] = useState(3);
    const [isTimeZoneOptionsOpen, setTimeZoneOptionsOpen] = useState(false);

    console.log(currentUser.authAs);

    function onSelectTimeZoneClick(location) {
        setTimeZoneValue(location.VALUE);
        setTimeZoneLocation(location.LABEL);
    }

    function handleTimeZoneOptionsOpen() {
        if (isTimeZoneOptionsOpen) {
            setTimeZoneOptionsOpen(false);
        } else {
            setTimeZoneOptionsOpen(true);
        }
    }

    return (
        <div className="container__profile-user _container">
            <GeneralTitleAllPages
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_GROUP_USERS}
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_PROFILE}
            />
            <div className="profile-user">
                <div className="profile-user__personal-data-user">
                    <img alt={'иконка'} src={iconProfilePhoto} className="personal-data-user__icon-photo" />
                    <div className={editDataUser ? "personal-data-user__main-data-user active" : "personal-data-user__main-data-user"}>
                        <p className="main-data-user__username">{currentUser.last_name} {currentUser.first_name} {currentUser.second_name}</p>
                        <p className="main-data-user__email">{currentUser.email}</p>
                        <div className="main-data-user__timezone">
                            <img alt={'иконка часы'} src={iconTime} className="main-data-user__timezone-icon" />
                            <p className="main-data-user__timezone-current">(UTC+3) Россия - Москва</p>
                        </div>
                        <button onClick={() => setEditDataUser(!editDataUser)} className="main-data-user__edit-button">{constants.PROFILE_USER.PROFILE_USER_EDIT_BTN}</button>
                    </div>
                    <div className={editDataUser ? "personal-data-user__edit-main-data-user active" : "personal-data-user__edit-main-data-user"}>
                        <p className="edit-main-data-user__email">{currentUser.email}</p>
                        <p className="edit-main-data-user__title-change-data">{constants.PROFILE_USER.PROFILE_USER_CHANGE_PERSONAL_DATA}</p>
                        <div className="edit-main-data-user__surname">
                            <label className="edit-main-data-user__surname-label">{constants.PROFILE_USER.PROFILE_USER_SURNAME}</label>
                            <input className="edit-main-data-user__surname-field-input" />
                        </div>
                        <div className="edit-main-data-user__name">
                            <label className="edit-main-data-user__name-label">{constants.PROFILE_USER.PROFILE_USER_NAME}</label>
                            <input className="edit-main-data-user__name-field-input" />
                        </div>
                        <div className="edit-main-data-user__middle-name">
                            <label className="edit-main-data-user__middle-name-label">{constants.PROFILE_USER.PROFILE_USER_MIDDLE_NAME}</label>
                            <input className="edit-main-data-user__middle-name-field-input" />
                        </div>
                        <div className='edit-main-data-user__time-zone-main-container'>
                            <p className="edit-main-data-user__time-zone-heading">{constants.PROFILE_USER.PROFILE_USER_CHANGE_TIMEZONE}<span className="reg-main-block__red-star-heading_span">*</span></p>
                            <div className="edit-main-data-user__time-zone-select-container" onClick={handleTimeZoneOptionsOpen}>
                                <p className="edit-main-data-user__time-zone-select-value">{timeZoneLocation}</p>
                                <img className="edit-main-data-user__time-zone-select-arrow" src={optionRow} alt="Стрелочка открытия меню" />
                                {isTimeZoneOptionsOpen && (
                                    <div className="edit-main-data-user__time-zone-options-container">
                                        {timeZone.map((location, index) => (
                                            <p className="edit-main-data-user__time-zone-option" key={index} onClick={() => onSelectTimeZoneClick(location)}>{location.LABEL}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <span className="edit-main-data-user__time-zone-main-container__error-message">{constants.REG.REG_ERROR_TIMEZONE}</span>
                        </div>
                        <p className="edit-main-data-user__title-change-pass">{constants.PROFILE_USER.PROFILE_USER_CHANGE_PASS}</p>
                        <div className="edit-main-data-user__pass">
                            <label className="edit-main-data-user__pass-label">{constants.PROFILE_USER.PROFILE_USER_PASS}</label>
                            <input type={'password'} className="edit-main-data-user__pass-input" />
                            <img src={hideIconPass} alt={'иконка скрыть/показать пароль'} className="edit-main-data-user__pass-icon-show" />
                        </div>
                        <div className="edit-main-data-user__new-pass">
                            <label className="edit-main-data-user__new-pass-label">{constants.PROFILE_USER.PROFILE_USER_NEW_PASS}</label>
                            <input type={'password'} className="edit-main-data-user__new-pass-input" />
                            <img src={hideIconPass} alt={'иконка скрыть/показать пароль'} className="edit-main-data-user__new-pass-icon-show" />
                        </div>
                        <div className="edit-main-data-user__repeat-pass">
                            <label className="edit-main-data-user__repeat-pass-label">{constants.PROFILE_USER.PROFILE_USER_REPEAT_PASS}</label>
                            <input type={'password'} className="edit-main-data-user__repeat-pass-input" />
                            <img src={hideIconPass} alt={'иконка скрыть/показать пароль'} className="edit-main-data-user__repeat-pass-icon-show" />
                        </div>
                        <button className="edit-main-data-user__button-save" onClick={() => setEditDataUser(!editDataUser)}>{constants.PROFILE_USER.PROFILE_USER_SAVE_BTN}</button>
                    </div>
                </div>
                <div className="profile-user__organizations-groups-users-votes">
                    <div>
                        <p>{constants.PROFILE_USER.PROFILE_USER_ORG_GROUP_USERS}</p>
                    </div>
                    <div>
                        <div>
                            <h3>Санкт-Петербургский государственный университет</h3>
                            <img src={iconStarSecretary} alt={'иконка звезда'} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUser;
