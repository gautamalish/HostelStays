import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import "./logout.scss"
function Logout() {
    const {logout}=useAuth()
  const navigate=useNavigate()
  const homeNavigate=useNavigate()
  async function handleLogout(){
    try{
      await logout()
      navigate("/")
    }
    catch(error){
      console.log(error)
    }
  }
  function handleNoClick(){
    homeNavigate("/home")
  }
  return (
    <div className='logoutModal'>
      <p>Do you wish to logout?</p>
      <div className='buttons'>
        <button onClick={handleLogout}>Yes</button>
        <button onClick={handleNoClick}>No</button>
      </div>
    </div>
  )
}

export default Logout
