import React from "react"
import "./board.css"

const Minitask = ({ subject, content, click, transit, time }) => {
    return <div className={`minitask ${transit}`} onClick={click}>
        <p className="miniSub">{subject}</p>
        <p className="minicont">{content.length < 200 ? content : content.slice(0, 200) + "..."}</p>
        <p className="time">{time}</p>
    </div>
}
export default Minitask
