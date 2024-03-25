import React from 'react'
import Navbar from '../frontpageComponents/Navbar'
import Sidebar from '../frontpageComponents/Sidebar'
function Staffs() {
  return (
    <div>
    <Navbar/>
      <div className='contentContainer'>
      <Sidebar/>
      <h1>Staffs</h1>
      </div>
    </div>
  )
}

export default Staffs
