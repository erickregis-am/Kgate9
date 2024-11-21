'use client'

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Monitor from "./pages/Monitor";
import Entrance from "./pages/Entrance";
import Home from "./pages/Home";


export default function App(){
    return(
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Entrance/>}/>
                <Route path="login" element={<Login />}/>
                <Route path="monitor" element={<Monitor/>}/>
                <Route path="home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}