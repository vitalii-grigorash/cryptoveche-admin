import React, {useEffect, useState} from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import DetailsVoteGeneralInfo from "../DetailsVoteGeneralInfo/DetailsVoteGeneralInfo";
import DetailsVoteStatisticsVote from "../DetailsVoteStatisticsVote/DetailsVoteStatisticsVote";
import DetailsVoteVotingObserversCounting from "../DetailsVoteVotingObserversCounting/DetailsVoteVotingObserversCounting";
import DetailsVoteQuestions from "../DetailsVoteQuestions/DetailsVoteQuestions";
import DetailsVoteResults from "../DetailsVoteResults/DetailsVoteResults";
import iconRowBack from "../../img/back-button-icon.svg";
import {Link, useLocation} from "react-router-dom";


const DetailsVote = (props) => {

    const {
        constants,
        authAs
    } = props;

    const [selectMenuItem, setSelectMenuItem] = useState(0);
    const [hideMenuBlockMobile, setHideMeniBlockMobile] = useState(false);
    const [selectMenuComponent, setSelectMenuComponent] = useState('generalInfo');
    const [changeQuestionResult, setChangeQuestionResult] = useState(false);
    const { pathname } = useLocation();
    const [informationMenuItems, setInformationMenuItems] = useState(
        [
                    {nameItem: "Общая информация", iconClassName: "details-vote__icon-general-info"},
                    {nameItem: "Статистика голосования", iconClassName: "details-vote__icon-statistics"},
                    {nameItem: "Голосующие", iconClassName: "details-vote__icon-voting"},
                    {nameItem: "Наблюдатели", iconClassName: "details-vote__icon-observers"},
                    {nameItem: "Счетная коммисия", iconClassName: "details-vote__icon-counting"},
                    {nameItem: changeQuestionResult ? "Ознакомиться с вопросами" : "Результаты", iconClassName: "details-vote__icon-questions"}
                ]);

    const onSelectMenuItems = (i, item) => {
        const getWightBlock = document.getElementById('getWidthMainBlock').clientWidth;
        setSelectMenuItem(i);
        if (getWightBlock < 600) {
            switch (item) {
                case 'Общая информация' :
                    setSelectMenuComponent('generalInfo');
                    setHideMeniBlockMobile(true);
                    break;
                case 'Статистика голосования' :
                    setSelectMenuComponent('statisticsVote');
                    setHideMeniBlockMobile(true);
                    break;
                case 'Голосующие' :
                    setSelectMenuComponent('voting');
                    setHideMeniBlockMobile(true);
                    break;
                case 'Наблюдатели' :
                    setSelectMenuComponent('observers');
                    setHideMeniBlockMobile(true);
                    break;
                case 'Счетная коммисия' :
                    setSelectMenuComponent('counting');
                    setHideMeniBlockMobile(true);
                    break;
                case 'Ознакомиться с вопросами' :
                    setSelectMenuComponent('questions');
                    setHideMeniBlockMobile(true);
                    break;
                case 'Результаты' :
                    setSelectMenuComponent('results');
                    setHideMeniBlockMobile(true);
                    break;
                default: {
                }
            }
        } else {
            switch (item) {
                case 'Общая информация' :
                    setSelectMenuComponent('generalInfo');
                    break;
                case 'Статистика голосования' :
                    setSelectMenuComponent('statisticsVote');
                    break;
                case 'Голосующие' :
                    setSelectMenuComponent('voting');
                    break;
                case 'Наблюдатели' :
                    setSelectMenuComponent('observers');
                    break;
                case 'Счетная коммисия' :
                    setSelectMenuComponent('counting');
                    break
                case 'Ознакомиться с вопросами' :
                    setSelectMenuComponent('questions');
                    break;
                case 'Результаты' :
                    setSelectMenuComponent('results');
                    break;
                default: {
                }
            }
        }
    }

    useEffect(() => {
        const getWightBlock = document.getElementById('getWidthMainBlock').clientWidth;
        if (getWightBlock < 600) {
            setSelectMenuComponent('');
        }
    },[])

    return (
        <div className="details-vote__container _container">
            <GeneralTitleAllPages
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_DETAILS_VOTE}
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_DETAILS_VOTE}/>
            <div  className="details-vote__row-back-votes-mobile">
                <Link className="details-vote__link-row" to={pathname === '/details-vote' ? '/list-votes' : '/details-vote'}>
                    <img src={iconRowBack} alt={constants.GENERAL.ALT_ICON}/>
                    Назад к списку голосований
                </Link>
            </div>
            <div id={'getWidthMainBlock'} className="details-vote__main-block">
                <div className={hideMenuBlockMobile ? "details-vote__information-menu hidden" : "details-vote__information-menu"}>
                    {informationMenuItems.map((el, i) => {
                        return (
                            <div onClick={() => onSelectMenuItems(i, el.nameItem)} key={i} className={selectMenuItem === i ? "details-vote__menu-items active" : "details-vote__menu-items"}>
                                <div className={el.iconClassName}/>
                                <p className="details-vote__menu-label">{el.nameItem}</p>
                            </div>
                        )
                    })}
                </div>
                    {selectMenuComponent === 'generalInfo' ? <DetailsVoteGeneralInfo
                                                            constants={constants} authAs={authAs}/> : null}
                    {selectMenuComponent === 'statisticsVote' ? <DetailsVoteStatisticsVote
                                                            constants={constants}/> : null}
                    {selectMenuComponent === 'voting' ? <DetailsVoteVotingObserversCounting
                                                            constants={constants}
                                                            titleName={'Список голосующих'}
                                                            titleNameMobile={'Голосующие'}
                                                            changeStatusColumn={'voting'}/> : null}
                    {selectMenuComponent === 'observers' ? <DetailsVoteVotingObserversCounting
                                                            constants={constants}
                                                            titleName={'Список наблюдателей'}
                                                            titleNameMobile={'Наблюдатели'}
                                                            changeStatusColumn={'observers'}/> : null}
                    {selectMenuComponent === 'counting' ? <DetailsVoteVotingObserversCounting
                                                            constants={constants}
                                                            titleName={'Счетная комиссия'}
                                                            titleNameMobile={'Наблюдатели'}
                                                            changeStatusColumn={'counting'}/> : null}
                    {selectMenuComponent === 'questions' ? <DetailsVoteQuestions
                                                            constants={constants}/> : null}
                    {selectMenuComponent === 'results' ? <DetailsVoteResults
                                                            constants={constants}/> : null}
                </div>
        </div>
    )
}
export default DetailsVote;