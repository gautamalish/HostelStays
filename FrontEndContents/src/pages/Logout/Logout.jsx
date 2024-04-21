import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import "./logout.scss"
function Logout() {
    const {logout}=useAuth()
  const navigate=useNavigate()
  const homeNavigate=useNavigate()
  // called when logout is clicked
  async function handleLogout(){
    try{
      // calling the firebase logout function
      await logout()
      // navigating to sign in page
      navigate("/")
    }
    // if there is an error,log it in the console
    catch(error){
      console.log(error)
    }
  }
  function handleNoClick(){
    homeNavigate("/home")
  }
  return (
    <div className='logoutModal'>
      <p>Are you sure you want to log out?</p>
      <div className='buttons'>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleNoClick}>Cancel</button>
      </div>
    </div>
  )
}

export default Logout
