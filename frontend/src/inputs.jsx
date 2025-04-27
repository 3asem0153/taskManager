import React, {
  useState
} from "react";
import Board from "./board";
import Container from "./container";


const Inputs = ({
  subject, content, saveSub, saveContent, addTask, ifEmpty, onSubmit
}) => {





  return <>


    <form onSubmit={onSubmit}>
      <input type="text" placeholder="task subject" onChange={saveSub} name="sub" value={subject} />
      <textarea placeholder="What are you up to?" onChange={saveContent} name="cont" value={content} />
      <button style={{ margin: "20px auto" }} className="grbuttons" onClick={addTask}>submit</button>
      <span className="errMsg">
        {ifEmpty}
      </span>
    </form>
  </>
}
export default Inputs