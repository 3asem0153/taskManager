import React, {
  useState
} from "react";
import Board from "./board";
import Container from "./container";


const Inputs = ({
  subject, content, saveSub, saveContent, addTask, ifEmpty
}) => {
  const [userId,
    setUserId] = useState("")
  const [formD]ata,
  setFormData] = useState( {
    id: userId,
    sub: "",
    cont: ""
  })

setFormData((prevData)=> {({
  ...prevData, [name]: value,


})})

const handleSubmit = (e) => {
  e.preventDefault();
  fetch("http://localhost:4000/home:id", {
    method: "post",
    headers: {
      "content-type : application/json"
    },
    body: JSON.stringify(fromData)

  }).then(res => res.json()).then(data => console.log(data))

}


return <>


  <form>
    <input type="text" placeholder="task subject" onChange={saveSub} name="sub" value={subject} />
  <textarea placeholder="What are you up to?" onChange={saveContent} name="cont" value={content} />

  <button style={ { margin: "20px auto" }} cla className="grbuttons" onClick={addTask}>submit</button>
  <span className="errMsg">
    {ifEmpty}
  </span>
</form>
</>
}
export default Inputs