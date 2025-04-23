import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignUp from "./SignUp"
import Home from './Home';

  const App = () => {
    return<BrowserRouter>
    <Routes>
    <Route path='/' element={<SignUp />} />
    <Route path='/home' element={<Home />} />
    </Routes>
    </BrowserRouter>
}

    export default App