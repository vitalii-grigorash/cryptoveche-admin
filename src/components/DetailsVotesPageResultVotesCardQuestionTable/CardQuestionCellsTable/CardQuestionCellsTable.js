import React from "react";

const CardQuestionCellsTable = (props) => {

    const {
        varinantAnswer,
        result
    } = props;

    return (
        <>
            <tr>
                <td>{varinantAnswer}</td>
                <td>{result}</td>
            </tr>
        </>
    )
}

export default CardQuestionCellsTable;