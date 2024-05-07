import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import "./logout.scss"
import { useNewAuth } from '../../context/AnotherContext'
function Logout() {
  const {logoutDisplay,setLogoutDisplay}=useNewAuth();
    const {logout}=useAuth()
  const navigate=useNavigate()
  const homeNavigate=useNavigate()
  // called when logout is clicked
  async function handleLogout(){
    try{
      // calling the firebase logout function
      setLogoutDisplay(false)
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
    setLogoutDisplay(false)
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
