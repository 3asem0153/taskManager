import React from "react"
import "./board.css"

const Minitask = ({ subject, content, click, transit, time }) => {
    return <div className={`minitask ${transit}`} onClick={click}>
        <h2 className="miniSub">{subject}</h2>
        <p>{content.length < 200 ? content : content.slice(0, 300) + "..."}</p>
        <p className="time">{time}</p>
    </div>
}
export default Minitask
