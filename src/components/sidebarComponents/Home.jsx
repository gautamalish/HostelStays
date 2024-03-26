import React from 'react'
import Navbar from '../frontpageComponents/Navbar'
import Sidebar from '../frontpageComponents/Sidebar'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
function Home() {
  const {logout}=useAuth()
  const navigate=useNavigate()
  async function handleLogout(){
    try{
      await logout()
      navigate("/")
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className='homeContainer'>
      <h1>Home</h1>
      <div>
      <button onClick={handleLogout}>Logout</button>
      </div>
      </div>
  )
}

export default Home
