import React, {
  useState
} from "react";
import "./container.css"

const Container = ({
  conclass, content, action
}) => {
  return <div className={conclass}>
    <div className="closec">
      <button onClick={action} className="closeButton">x</button>
    </div>
    {content}

  </div>
}



export default Container