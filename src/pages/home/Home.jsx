import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Logout from '../Logout/Logout'
import "./home.css"
function Home() {
  return (
    <div className='homeContainer'>
      <h1>Home</h1>
    </div>
  )
}

export default Home
