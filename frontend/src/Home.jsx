import React, {
  useState,
  useEffect
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import './Home.css'
import Container from "./container"
import Inputs from "./inputs"
import Board from './board'
import Minitask from './miniTask'
import Edit from './edit';
import LogOut from './logout';

const Home = () => {
const [authorized,setAuthorized]=useState(false);
  const navigate = useNavigate();
  const {
    id
  } = useParams();


  const [inSubject,
    setinSubject] = useState("");
  const [inContent,
    setinContent] = useState("");



  const [miniTaskClicked,
    setMiniTaskClicked] = useState(false);
  const [edId,
    setEdId] = useState(undefined);
  const [ifEmptyMsg,
    setIfEmptyMsg] = useState("");

  const [miniTaskData,
    setMiniTaskData] = useState();




  // container
  const [show,
    setShow] = useState(false);
  const [conclass,
    setConClass] = useState("")





  const [taskFormData,
    setTaskFormData] = useState({
      id: id,
      inid: "",
      sub: "",
      cont: "",
    })

    const logOut = async ()=>{
      try{
      const res = await fetch("http://localhost:4000/logout",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        credentials:'include'

      });
      if(!res.ok){throw new Error ("log out failed") }
      const data = await res.json();
      console.log(data);
      navigate('/')
    }catch(err){
      console.log(`couldn't log out ${err}`)
    }
    }

    const [accessT,setAccessT]=useState(null);
    fetch('http://localhost:4000/refresh',{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      credentials:'include'
      

    }).then((res)=>res.json()).then((data)=>{setAccessT(data.accessToken)});
    
  useEffect( () => {
    if(!accessT)return;
    setAuthorized(true);
    fetch(`http://localhost:4000/home/${id}`, {
      headers: {
        "authorization":`Bearer ${accessT}`,
        "content-type": "application/json"
      }
    }).then((res) => res.json()).then((data) => {
      console.log(data.tasks);
      console.log(accessT);
      setMiniTaskData(data.tasks)
    }).catch((Error) => console.log(`Error:${Error}`))
  },[accessT,edId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addedData = {
      ...taskFormData,
      inid:Date.now()
    }
    setTaskFormData(addedData)

    try {
      const postRes = await fetch(`http://localhost:4000/home/${id}`, {
        method: "POST",
        headers: {
          "authorization":`Bearer ${accessT}`,
          "content-type": "application/json"
        },
        body: JSON.stringify(addedData)
      });
      if (!postRes.ok) throw new Error("failed to add Task");
      const data = await postRes.json();
      console.log(data.tasks);
      setMiniTaskData(data.tasks)
    }
    catch (err) { console.log(`Error:${err}`) }
  }



  const saveSub = (event) => {
    setinSubject(event.target.value);

    setTaskFormData((prev) => ({
      ...prev, [event.target.name]: event.target.value
    }))
  };
  const saveContent = (event) => {
    setinContent(event.target.value);
    setTaskFormData((prev) => ({
      ...prev, [event.target.name]: event.target.value
    }));
  }


  const showCont = () => {
    setMiniTaskClicked(false)
    setShow(true)
    setinSubject("");
    setinContent("")
    setConClass("container")
  }


  const emptyErr = () => inSubject ? addTask() : setIfEmptyMsg("subject is required");


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



    setConClass("container-closed")
    setinSubject("");
    setinContent("");
    setTimeout(() => {

      setShow(false);
    }, 500);



  }

  const inid = {inid:edId};
  
  
  const editTask = async () => {
    console.log(edId)
    const editedData={
      sub:inSubject,
      cont:inContent,
      inid:edId
    }
  
    try {
      const res = await fetch(`http://localhost:4000/home/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "authorization":`Bearer ${accessT}`
        },
        body: JSON.stringify(editedData)
      });
      const data = await res.json();
      console.log("fetch edits triggered");
      setMiniTaskClicked(false);
      setConClass("container-closed");
      setinSubject("");
      setinContent("");
      setEdId(undefined);
    }
    catch (err) { console.log(`couldn't fetch edits ${err}`) }
  }

  // setTasks((prevTasks) => {

  //   const updated = prevTasks.filter((task) => task.id !== edId);
  //   return [...updated, {
  //     id: edId, subject: inSubject, content: inContent, edited: false
  //   }]
  // });
  // setinSubject("");
  // setinContent("");
  // setEdId(undefined)
  // setConClass("container-closed")
  // setTimeout(() => {
  //   setMiniTaskClicked(false)
  // }, 500);


  
  const dltTask = async () => {
    console.log(edId)
    try {
  const res = await fetch(`http://localhost:4000/home/${id}`,{
    method :"DELETE",
    headers :{
        'authorization':`Bearer ${accessT}`,
        "content-type":"application/json"} ,
      credentials:'include',
      body:JSON.stringify({inid:edId}) 
    });
    const data = await res.json();
    console.log(`data : ${data}`);
    console.log('fetch delete triggered');
    setConClass("container-closed");
    setinSubject("");
    setinContent("");
    setEdId(undefined);
    setMiniTaskClicked(false);}
    catch(err){
      console.log(`couldn't fetch ${err}`)
    }
  }  


    // setTasks((prevTasks) => prevTasks.map((task) => task.id === edId ? {
    //   ...task, transit: "fadeOut"
    // }: task));
    // setTimeout(() => {
    //   setTasks((prevTasks) => {
    //     setMiniTaskClicked(false)
    //     const updated = prevTasks.filter((task) => task.id !== edId);
    //     prevTasks.map((task) => task.id === edId ? {
    //       ...task, transit: "fadeOut"
    //     }: task);
    //     return [...updated]
    //   })


    // }, 400);



  




  return <>
    {accessT ? 
    <div>
      <button onClick={showCont}> add task </button>
      {show ? <Container closec="closeButton" conclass={conclass} action={closeAdd} content={<Inputs addTask={emptyErr} subject={inSubject} content={inContent} saveSub={saveSub} saveContent={saveContent} onSubmit={handleSubmit} ifEmpty={ifEmptyMsg} /> } /> : null}
     
      <Board>{miniTaskData ? miniTaskData.map((task) =>
      <Minitask
        key={task.inid}
        click={() => taskClick(task.sub, task.cont, task.inid)}
        subject={task.sub}
        content={task.cont}
        transit={task.transit}
        time={new Date(task.inid).toLocaleTimeString()}
      />
     ) : null}
     </Board>

      {miniTaskClicked ? <Container closec="closeButton" conclass={conclass} action={closeEdit} content={<Edit editTask={editTask} subject={inSubject} content={inContent} saveSub={saveSub} saveContent={saveContent} deleteTask={dltTask} />} /> : null}
      <LogOut fetch={logOut} />
  </div>
  : <p>log in please</p>   }

  </>

}
export default Home;