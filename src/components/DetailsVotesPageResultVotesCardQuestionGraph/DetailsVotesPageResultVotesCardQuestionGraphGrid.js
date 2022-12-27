import React, {useEffect, useState} from "react";
import CardQuestionVerticalGraphGrid from "./CardQuestionVerticalGraph/CardQuestionVerticalGraphGrid";
import CardQuestionGraphNameColumnGrid from "./CardQuestionGraphNameColumn/CardQuestionGraphNameColumnGrid";
import CardQuestionHorizontalGraphGrid from "./CardQuestionHorizontalGraph/CardQuestionHorizontalGraphGrid";

const DetailsVotesPageResultVotesCardQuestionGraphGrid = (props) => {

    const {
        answersTemplateGrid
    } = props;

    const [showGraphTypeVertical, setShowGraphTypeVertical] = useState(true);
    const [showGraphTypeHorizontal, setShowGraphTypeHorizontal] = useState(false);
    const [hideChangePlaceColumns, setHideChangePlaceColumns] = useState(true);
    const [showChangePlaceColumns, setShowChangePlaceColumns] = useState(false);
    const getAllColumn = answersTemplateGrid.map(el => el.columns);
    const getNameColumnWithColor = getAllColumn[0].map(function (item) {
        return {...item, color: randomColorGrid()}
    })
    const resultWithColor = answersTemplateGrid.map(function (item) {
        return {...item, color: randomColorGrid()}
    })

    function randomColorGrid() {
        let x = Math.floor(Math.random() * 256);
        let y = Math.floor(Math.random() * 256);
        let z = Math.floor(Math.random() * 256);
        return "rgb(" + x + "," + y + "," + z + ")";
    }

    useEffect(() => {
        if (answersTemplateGrid.length > 3 || getAllColumn.length > 3) {
            setShowGraphTypeHorizontal(true);
            setShowGraphTypeVertical(false)
            setShowChangePlaceColumns(true)
            setHideChangePlaceColumns(false)
        } else {
            setShowGraphTypeHorizontal(false)
            setShowGraphTypeVertical(true)
            setShowChangePlaceColumns(false)
            setHideChangePlaceColumns(true)
        }
    }, [answersTemplateGrid.length, getAllColumn.length])

    return (
        <div className={'details-votes-page-result-card-graph__wrapper'}>
            {showGraphTypeHorizontal && (
                <CardQuestionHorizontalGraphGrid
                    resultVote={resultWithColor}
                />
            )
            }
            {showGraphTypeVertical && (
                <CardQuestionVerticalGraphGrid
                    resultVote={resultWithColor}
                    getNameColumnColor={getNameColumnWithColor}
                />
            )
            }
            <div className={'details-votes-page-result-card-graph__column-list'}>
                {hideChangePlaceColumns && (
                    getNameColumnWithColor.map((item) => {
                        return (
                            <CardQuestionGraphNameColumnGrid
                                key={item.id}
                                nameColumn={item.value}
                                colorSquare={item.color}/>
                        )
                    })
                )}
                {
                    showChangePlaceColumns && (
                        resultWithColor.map((el => {
                            return (
                                <CardQuestionGraphNameColumnGrid
                                    key={el.id}
                                    nameColumn={el.title}
                                    colorSquare={el.color}
                                />
                            )
                        }))
                    )}
            </div>
        </div>
    )
}
export default DetailsVotesPageResultVotesCardQuestionGraphGrid;