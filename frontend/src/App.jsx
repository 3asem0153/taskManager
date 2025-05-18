import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./SignIn"
import Home from './Home';
import SignUp from "./SignUp";


const App = () => {
  return <BrowserRouter>

  <div className="nav"></div>

    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/home/:id' element={<Home />} />
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
  </BrowserRouter>
}

export default App