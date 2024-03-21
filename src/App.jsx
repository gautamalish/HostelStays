import './App.css'
import { useState } from 'react'
import Signin from './components/Signin'
import FrontPage from "./components/FrontPage"
import { Route,Routes } from 'react-router-dom'
function App() {
  return (
    <div className='mainContainer'>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='frontpage' element={<FrontPage/>}/>
      </Routes>
    </div>
  )
}

export default App
