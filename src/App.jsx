import './App.css'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Signin from './pages/login/Signin'
import { Route,Routes } from 'react-router-dom'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import Home from './pages/home/Home'
import Menu from './pages/meals/Meals'
import Staffs from './pages/staffs/Staffs'
import Tenants from './pages/tenants/Tenants'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { useAuth } from './context/AuthContext'
import Logout from './pages/Logout/Logout'
import React from 'react'
function App() {
  const {currentUser,LogoutOnTabClose}=useAuth()
  const [showLogout,setShowLogout]=React.useState(false)
  LogoutOnTabClose()
  const RequireAuth=({children})=>{
    return currentUser?children:<Navigate to="/"/>
  }

  return (
    <div className='mainContainer'>
      {currentUser && <Navbar/>}
      <div className='contentContainer'>
      {currentUser && <Sidebar setShowLogout={setShowLogout}/>}
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='home' element={<RequireAuth><Home/></RequireAuth>}/>
        <Route path='menu' element={<RequireAuth><Menu/></RequireAuth>}/>
        <Route path='staffs' element={<RequireAuth><Staffs/></RequireAuth>}/>
        <Route path='tenants' element={<RequireAuth><Tenants/></RequireAuth>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
        <Route path='logout' element={<RequireAuth><Logout setShowLogout={setShowLogout}/></RequireAuth>}/>
      </Routes>
      </div>
      </div>
  )
}

export default App
