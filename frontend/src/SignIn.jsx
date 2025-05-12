import React,{useState} from "react";
import Container from "./container";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
const navigate = useNavigate()
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const handleChange = (e)=>{
    setFormData((prev)=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }
  const handleLogIn = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/",{
      method:"post",
      headers:{
        "content-type":"application/json"},
        credentials:'include',
      body:JSON.stringify(formData)
    });
    const data = await res.json();
    if (res.ok){
  navigate(`/home/${data.id}`)
    }
  }


  const form = <form onSubmit={handleLogIn}>
    <h2>Sign in </h2>
    <label>
      Email address :
      <input name="email" value={formData.email} onChange={handleChange}/>
    </label>
    <br />
    <label >
      Password:
      <input name="password" value={formData.password} onChange={handleChange}/>
    </label>
    <button type="submit">Submit</button>
    <h5>don't have an account?  <a href="./sign-up">create account</a></h5>

  </form>
  return <>
    <Container closec="hidden" conclass="container" action={() => { }} content={form} />
  </>
}

export default SignIn;