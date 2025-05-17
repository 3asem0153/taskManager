import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./SignIn"
import Home from './Home';
import SignUp from "./SignUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return <BrowserRouter>
 {/* <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success" type="button">Search</button>
       <button className="btn btn-outline-success" type="button">Dark Mode</button>
    </form>
  </div>
</nav> */}
<nav className="nav">

</nav>
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/home/:id' element={<Home />} />
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
  </BrowserRouter>
}

export default App