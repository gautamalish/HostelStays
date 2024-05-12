import React from 'react'
import "./userDashboard.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Nav } from 'react-bootstrap'
function UserDashboard() {
  return (
    <div className='userDashboard'>
      <Sidebar/>
      <div className='userDashboardContents'>
          <Navbar/>
          userDashboard
      </div>
    </div>
  )
}

export default UserDashboard
