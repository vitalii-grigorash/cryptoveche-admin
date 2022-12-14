import React, {useEffect, useState} from "react";
import GeneralTitleAllPages from "../GeneralTitleAllPages/GeneralTitleAllPages";
import DetailsVoteGeneralInfo from "../DetailsVoteGeneralInfo/DetailsVoteGeneralInfo";
import DetailsVoteStatisticsVote from "../DetailsVoteStatisticsVote/DetailsVoteStatisticsVote";
import DetailsVoteVoting from "../DetailsVoteVoting/DetailsVoteVoting";
import DetailsVoteObservers from "../DetailsVoteObservers/DetailsVoteObservers";
import DetailsVoteQuestions from "../DetailsVoteQuestions/DetailsVoteQuestions";

const DetailsVote = (props) => {

    const {
        constants
    } = props;

    const [selectMenuItem, setSelectMenuItem] = useState(0);
    const [selectMenuComponent, setSelectMenuComponent] = useState('generalInfo');

    const informationMenuItems = [
        {nameItem: "Общая информация", iconClassName: "details-vote__icon-general-info"},
        {nameItem: "Статистика голосования", iconClassName: "details-vote__icon-statistics"},
        {nameItem: "Голосующие", iconClassName: "details-vote__icon-voting"},
        {nameItem: "Наблюдатели", iconClassName: "details-vote__icon-observers"},
        {nameItem: "Ознакомиться с вопросами", iconClassName: "details-vote__icon-questions"}
    ]
    const onSelectMenuItems = (i, item) => {
        setSelectMenuItem(i);
        switch (item) {
            case 'Общая информация' :
                setSelectMenuComponent('generalInfo')
                break;
            case 'Статистика голосования' :
                setSelectMenuComponent('statisticsVote')
                break;
            case 'Голосующие' :
                setSelectMenuComponent('voting')
                break;
            case 'Наблюдатели' :
                setSelectMenuComponent('observers')
                break;
            case 'Ознакомиться с вопросами' :
                setSelectMenuComponent('questions')
                break;
            default: {
            }
        }
    }

    const onShowGeneralSettings = () => {
        const getWightBlock = document.getElementById('addNewVoteWight').clientWidth;
        console.log(getWightBlock)
        if (getWightBlock < 600) {
            setSelectMenuComponent('')
            console.log(getWightBlock)
        }
    }

    useEffect(() => {
        onShowGeneralSettings()
    },[])

    return (
        <div className="details-vote__container _container">
            <GeneralTitleAllPages
                titleName={constants.GENERAL_TITLE.GENERAL_TITLE_TITLENAME_DETAILS_VOTE}
                firstLetter={constants.GENERAL_TITLE.GENERAL_TITLE_FIRTSLETTER}
                secondLetter={constants.GENERAL_TITLE.GENERAL_TITLE_SECONDLETTER_DETAILS_VOTE}/>
            <div id={'addNewVoteWight'} className="details-vote__main-block">
                <div className="details-vote__information-menu">
                    {informationMenuItems.map((el, i) => {
                        return (
                            <div onClick={() => onSelectMenuItems(i, el.nameItem)} key={i} className={selectMenuItem === i ? "details-vote__menu-items active" : "details-vote__menu-items"}>
                                <div className={el.iconClassName}/>
                                <p className="details-vote__menu-label">{el.nameItem}</p>
                            </div>
                        )
                    })}
                </div>
                {selectMenuComponent === 'generalInfo' ? <DetailsVoteGeneralInfo constants={constants}/> : null}
                {selectMenuComponent === 'statisticsVote' ? <DetailsVoteStatisticsVote constants={constants}/> : null}
                {selectMenuComponent === 'voting' ? <DetailsVoteVoting constants={constants}/> : null}
                {selectMenuComponent === 'observers' ? <DetailsVoteObservers constants={constants}/> : null}
                {selectMenuComponent === 'questions' ? <DetailsVoteQuestions constants={constants}/> : null}
            </div>

        </div>
    )
}
export default DetailsVote;