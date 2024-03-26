import './App.css'
import { useState } from 'react'
import Signin from './components/signinComponents/Signin'
import { Route,Routes } from 'react-router-dom'
import ForgotPassword from './components/signinComponents/ForgotPassword'
import Home from './components/sidebarComponents/Home'
import Menu from './components/sidebarComponents/Menu'
import Staffs from './components/sidebarComponents/Staffs'
import Tenants from './components/sidebarComponents/Tenants'
import Navbar from './components/frontpageComponents/Navbar'
import Sidebar from './components/frontpageComponents/Sidebar'
import Manager from './components/sidebarComponents/Manager'
import { useAuth } from './context/AuthContext'
function App() {
  const {currentUser}=useAuth()
  return (
    <div className='mainContainer'>
      {currentUser && <Navbar/>}
      <div className='contentContainer'>
      {currentUser && <Sidebar/>}
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='menu' element={<Menu/>}/>
        <Route path='manager' element={<Manager/>}/>
        <Route path='staffs' element={<Staffs/>}/>
        <Route path='tenants' element={<Tenants/>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
      </Routes>
      </div>
      </div>
  )
}

export default App
