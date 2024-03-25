import './App.css'
import { useState } from 'react'
import Signin from './components/signinComponents/Signin'
import FrontPage from "./components/frontpageComponents/FrontPage"
import { Route,Routes } from 'react-router-dom'
import ForgotPassword from './components/signinComponents/ForgotPassword'
function App() {
  return (
    <div className='mainContainer'>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='frontpage' element={<FrontPage/>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
      </Routes>
    </div>
  )
}

export default App
