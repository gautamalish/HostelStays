import './App.scss'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Signin from './pages/login/Signin'
import { Route,Routes } from 'react-router-dom'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import Home from './pages/home/Home'
import Menu from './pages/meals/Meals'
import Rooms from './pages/Rooms/Rooms'
import Staffs from './pages/staffs/Staffs'
import Tenants from './pages/tenants/Tenants'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { useAuth } from './context/AuthContext'
import Logout from './pages/Logout/Logout'
import React from 'react'
import New from './pages/AddNew/AddNewResident'
import { productInputs, userInputs } from './formSource'
function App() {
  const {currentUser}=useAuth()
  const RequireAuth=({children})=>{
    return currentUser?children:<Navigate to="/"/>
  }

  return (
    <div className='mainContainer'>
      <Routes>
        <Route path='/'>
          <Route index element={<Signin/>}/>
        <Route path='home' element={<RequireAuth><Home/></RequireAuth>}/>
        <Route path='rooms' element={<RequireAuth><Rooms/></RequireAuth>}/>
        <Route path='menu' element={<RequireAuth><Menu/></RequireAuth>}/>
        <Route path='staffs' element={<RequireAuth><Staffs/></RequireAuth>}/>
        <Route path='new' element={<RequireAuth><New inputs={userInputs} title="Add New User"/></RequireAuth>}/>
        <Route path='tenants' element={<RequireAuth><Tenants/></RequireAuth>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
        <Route path='logout' element={<RequireAuth><Logout/></RequireAuth>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
