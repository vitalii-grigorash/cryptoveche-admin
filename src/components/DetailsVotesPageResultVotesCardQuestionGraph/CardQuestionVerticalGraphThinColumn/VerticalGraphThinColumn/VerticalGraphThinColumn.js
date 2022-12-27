import React from "react";

const VerticalGraphThinColumn = (props) => {

    const {
        result,
        colorColumns
    } = props;

    return (
        <>
            <svg className={'card-question-vertical-graph-thin-column__column-svg'}>
                <rect width={'28'} height={result + 1} fill={colorColumns} opacity={0.8}/>
            </svg>
        </>
    )
}
export default VerticalGraphThinColumn;