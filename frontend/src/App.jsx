import React, {
  useState,
  useEffect
} from 'react'
import './App.css'
import Container from "./container"
import Inputs from "./inputs"
import Board from './board'
import Minitask from './miniTask'
import Edit from './edit'

const App = () => {

  // inputs
  const [tasks,
    setTasks] = useState([]);
  const [inSubject,
    setinSubject] = useState("");
  const [inContent,
    setinContent] = useState("");
  const saveSub = (event) => {
    setinSubject(event.target.value)
  };
  const saveContent = (event) => {
    setinContent(event.target.value)
  };
  const [miniTaskClicked,
    setMiniTaskClicked] = useState(false);
  const [edId,
    setEdId] = useState(undefined);
  const [ifEmptyMsg,
    setIfEmptyMsg] = useState("");






  // container
  const [show,
    setShow] = useState(false);
  const [conclass,
    setConClass] = useState("")
  const showCont = () => {
    setMiniTaskClicked(false)
    setShow(true)
    setinSubject("");
    setinContent("")
    setConClass("container")
  }


  const emptyErr = ()=>inSubject ? addTask(): setIfEmptyMsg("subject is required");


  const closeAdd = () => {
    setConClass("container-closed");
    setTimeout(() => {
      setShow(false);
    }, 500);
  }

  const closeEdit = () => {
    setConClass("container-closed");
    setTimeout(() => {
      setMiniTaskClicked(false);
    }, 500);


  }
  const taskClick = (indSub, indCont, id) => {
    setMiniTaskClicked(!miniTaskClicked);
    setShow(false)
    setinSubject(indSub);
    setinContent(indCont);
    setEdId(id)
    setConClass("container")

  };

  const addTask = () => {

    const newTask = {
      id: Date.now(),
      subject: inSubject,
      content: inContent,
      edited: false,
      transit: "fadeOut",
      time: new Date().toLocaleTimeString()
    }

    setTasks((prevTasks) => [...prevTasks, newTask]);

    setConClass("container-closed")
    setinSubject("");
    setinContent("");
    setTimeout(() => {
      setTasks((prevTasks) => prevTasks.map((task) =>
        task.id === newTask.id ? {
          ...task, transit: "fadeIn"
        }: task
      )
      )
      setShow(false);
    }, 500);



  }


  const editTask = () => {
    setTasks((prevTasks) => {

      const updated = prevTasks.filter((task) => task.id !== edId);
      return [...updated, {
        id: edId, subject: inSubject, content: inContent, edited: false
      }]
    });
    setinSubject("");
    setinContent("");
    setEdId(undefined)
    setConClass("container-closed")
    setTimeout(() => {
      setMiniTaskClicked(false)
    }, 500);

  }
  const dltTask = () => {

    setConClass("container-closed");
    setinSubject("");
    setinContent("");
    setEdId(undefined)
    setTasks((prevTasks) => prevTasks.map((task) => task.id === edId ? {
      ...task, transit: "fadeOut"
    }: task));
    setTimeout(() => {
      setTasks((prevTasks) => {
        setMiniTaskClicked(false)
        const updated = prevTasks.filter((task) => task.id !== edId);
        prevTasks.map((task) => task.id === edId ? {
          ...task, transit: "fadeOut"
        }: task);
        return [...updated]
      })


    }, 400);



  }

  const names = (...others)=> `[${others} => Donr]`
console.log(names("osama","mohamed"))




  return <>

    <button onClick={showCont}> add task </button>
    {show ? <Container conclass={conclass} action={closeAdd} content={<Inputs addTask={emptyErr} subject={inSubject} content={inContent} saveSub={saveSub} saveContent={saveContent} ifEmpty={ifEmptyMsg} />} />: null}
    <Board>{tasks.map((task) =>
      <Minitask
        key={task.id}
        click={() => taskClick(task.subject, task.content, task.id)}
        subject={task.subject}
        content={task.content}
        transit={task.transit}
        time={task.time}
        />

    )}

    </Board>
    {miniTaskClicked ? <Container conclass={conclass} action={closeEdit} content=<Edit editTask={editTask} subject={inSubject} content={inContent} saveSub={saveSub} saveContent={saveContent} deleteTask={dltTask} /> />: null}
  </>
}
export default App