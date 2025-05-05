import React, {
  useState
} from "react";
import Board from "./board";
import Container from "./container";


const Edit = ({
  subject, content, saveSub, saveContent, editTask, deleteTask
}) => {



  return <>
<form>
    <input type="text" placeholder="task subject" onChange={saveSub} value={subject} />
  <textarea placeholder="What are you up to?" onChange={saveContent} value={content} />

  <div className="buttons">
    <button style={ { margin: "20px auto" }} onClick={editTask}>save</button>
    <button className="delete" onClick={deleteTask}>Delete</button>
  </div>
  </form>
</>
}
export default Edit