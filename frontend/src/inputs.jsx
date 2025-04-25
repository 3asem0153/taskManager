import React, {
  useState
} from "react";
import Board from "./board";
import Container from "./container";


const Inputs = ({
  subject, content, saveSub, saveContent, addTask, ifEmpty
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/home:id")

  }


  return <>


    <form>
      <input type="text" placeholder="task subject" onChange={saveSub} value={subject} />
      <textarea placeholder="What are you up to?" onChange={saveContent} value={content} />

      <button style={{ margin: "20px auto" }} cla className="grbuttons" onClick={addTask}>submit</button>
      <span className="errMsg">
        {ifEmpty}
      </span>
    </form>
  </>
}
export default Inputs