import React, {
  useState
} from "react";
import "./container.css"

const Container = ({
  conclass, content, action, closec
}) => {

  return <div className={conclass}>

    <div className="closeButton">
      <button className={closec} onClick={action}>x</button>
    </div>
    {content}

  </div>
}



export default Container