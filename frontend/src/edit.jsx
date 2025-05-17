import React, {
  useState
} from "react";
import Board from "./board";
import Container from "./container";


const Edit = ({
  subject, content, saveSub, saveContent, editTask, deleteTask
}) => {


const handleEdits = (e)=>{
  e.preventDefault();
  console.log("handle edits triggered")
  editTask()
};
const handleDeletes = (e)=>{
  e.preventDefault();
    console.log("handle deletes triggered");
  deleteTask()
};
  return <>
<form>
    <input type="text" placeholder="task subject" onChange={saveSub} value={subject} />
  <textarea placeholder="What are you up to?" onChange={saveContent} value={content} />

  <div className="buttons">
    <button type="button" style={ { margin: "20px auto" }} onClick={handleEdits}>save</button>
    <button type="button" className="delete" onClick={handleDeletes}>Delete</button>
  </div>
  </form>
</>
}
export default Edit