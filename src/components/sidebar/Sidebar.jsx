import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import Logout from '../../pages/Logout/Logout'
import "./sidebar.css"
function Sidebar({setShowLogout}) {
  return (
    <div className='sidebarContainer'>
      <ul>
        <NavLink to="/home" className='sidebarTitle'><h1 >HostelStays</h1></NavLink>
        <NavLink to="/home" className="navlink"><li >Home</li></NavLink>
        <NavLink to="/manager" className="navlink"><li>Managers</li></NavLink>
        <NavLink to="/menu" className="navlink"><li>Menu</li></NavLink>
        <NavLink to="/tenants" className="navlink"><li>Tenants</li></NavLink>
        <NavLink to="/staffs" className="navlink"><li>Staffs</li></NavLink>
        <NavLink to="/logout" className='navlink'><li onClick={()=>setShowLogout(true)}>Logout</li></NavLink>
      </ul>
      
    </div>
  )
}

export default Sidebar
