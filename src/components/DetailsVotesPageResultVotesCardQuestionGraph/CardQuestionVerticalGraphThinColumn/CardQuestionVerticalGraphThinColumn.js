import React from "react";
import VerticalGraphThinColumn from "./VerticalGraphThinColumn/VerticalGraphThinColumn";

const CardQuestionVerticalGraphThinColumn = (props) => {

    const {
        nameAnswer,
        result,
        colorColumn
    } = props;

    const newColumnsObj = result.map((elem, i) => ({
        value: elem,
        color: colorColumn[i % colorColumn.length],
    }))

    return (
        <div className={'card-question-vertical-graph-thin-column__wrapper'}>
            <div className={'card-question-vertical-graph-thin-column__columns'}>
                {
                    newColumnsObj.map((el, i) => {
                        return (
                            <VerticalGraphThinColumn
                                key={i}
                                result={el.value.favor}
                                colorColumns={el.color}
                            />
                        )
                    })
                }
            </div>
            <div className={'card-question-vertical-graph-thin-column__name-column'}>{nameAnswer}</div>
        </div>
    )
}
export default CardQuestionVerticalGraphThinColumn;