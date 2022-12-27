import React, {useEffect, useRef, useState} from "react";

const CardQuestionHorizontalGraphColumnRowInvalidBallots = (props) => {

    const {
        numInvalid
    } = props;

    const [hideSpanPercent, setHideSpanPercent] = useState(false);
    const textSvgRef = useRef(null)

    let widthRectColumn = numInvalid
    function movingTextOneColumn(x) {
        let sum;
        if (x > 390) {
            sum = x - 92;
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
        <div className={'card-question-horizontal-graph-column-row__columns'}>
            <svg className={'card-question-horizontal-graph-column-row__column-svg'}>
                <g>
                    <rect width={widthRectColumn + 2} height={'28'} fill={'#9FA1A8'}/>
                    <text ref={textSvgRef} x={movingTextOneColumn(widthRectColumn) + 10} y={'35%'} fontSize={14} fill={'rgba(54, 59, 77, 0.9)'}>{widthRectColumn} ({((widthRectColumn / 600) * 100).toFixed(1)}%)</text>
                </g>
            </svg>
            <span className={hideSpanPercent ? 'card-question-horizontal-graph-column-row__columns-text-percent active' : 'card-question-horizontal-graph-column-row__columns-text-percent'}>
                {widthRectColumn} ({((widthRectColumn / 600) * 100).toFixed(1)}%)
            </span>
        </div>
    )
}
export default CardQuestionHorizontalGraphColumnRowInvalidBallots;