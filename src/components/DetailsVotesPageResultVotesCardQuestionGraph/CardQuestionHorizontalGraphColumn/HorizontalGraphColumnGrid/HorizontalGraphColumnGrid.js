import React, {useEffect, useRef, useState} from "react";

const HorizontalGraphColumnGrid = (props) => {

    const {
        resultValue,
        nameColumns,
        colorColumns
    } = props;

    const [hideSpanPercent, setHideSpanPercent] = useState(false);
    const textSvgRef = useRef(null)

    let widthRectColumn = resultValue;

    function movingTextOneColumn(x) {
        let sum;
        if (x > 350) {
            sum = x - 150;
        } else {
            sum = x;
        } return sum;
    }

    useEffect(() => {
        movingTextOneColumn(widthRectColumn)
        if(widthRectColumn > 450) {
            setHideSpanPercent(true)
            textSvgRef.current.style.display = 'none'
        } else {
            setHideSpanPercent(false)
            textSvgRef.current.style.display = 'initial'
        }
    }, [widthRectColumn])

    return (
        <>
            <svg className={'card-question-horizontal-graph-column-grid__column-svg'}>
                <g>
                    <rect width={widthRectColumn + 1} height={'28'} fill={colorColumns}/>
                    <text ref={textSvgRef} x={movingTextOneColumn(widthRectColumn) + 12} y={'55%'} fontSize={12} fill={'rgba(54, 59, 77, 0.9)'}>{nameColumns} - {widthRectColumn}  ({((widthRectColumn / 600) * 100).toFixed(1)}%)</text>
                </g>
            </svg>
            <span className={hideSpanPercent ? 'card-question-horizontal-graph-column-grid__columns-text-percent active' : 'card-question-horizontal-graph-column-grid__columns-text-percent'}>
                    <span className={'grid__columns-text-percent'}>{nameColumns}</span> - {widthRectColumn}  ({((widthRectColumn / 600) * 100).toFixed(1)}%)
                </span>
        </>
    )
}
export default HorizontalGraphColumnGrid;