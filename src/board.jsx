import React from "react";
import "./board.css"


const Board = ({ children }) => {

    return <div className="board">
        {children}
    </div>
}
export default Board