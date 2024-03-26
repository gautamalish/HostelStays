import React from 'react'
import Navbar from '../frontpageComponents/Navbar'
import Sidebar from '../frontpageComponents/Sidebar'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Logout from '../Logout'
function Home() {
  return (
    <div className='homeContainer'>
      <h1>Home</h1>
    </div>
  )
}

export default Home
