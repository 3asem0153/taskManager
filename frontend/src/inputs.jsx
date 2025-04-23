import React, {
  useState
} from "react";
import Board from "./board";
import Container from "./container";


const Inputs = ({
  subject, content, saveSub, saveContent, addTask, ifEmpty
}) => {



  return <>
    
       

    <input type="text" placeholder="task subject" onChange={saveSub} value={subject} />
  <textarea placeholder="What are you up to?" onChange={saveContent} value={content} />

  <button style={ { margin: "20px auto" }} cla className="grbuttons" onClick={addTask}>submit</button>
  <span className="errMsg">
    {ifEmpty}
  </span>

</>
}
export default Inputs