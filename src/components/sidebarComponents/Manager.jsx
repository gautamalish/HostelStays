import React from 'react'
import Navbar from '../frontpageComponents/Navbar'
import Sidebar from '../frontpageComponents/Sidebar'
function Manager() {
  return (
    <div>
      <Navbar/>
      <div className='contentContainer'>
      <Sidebar/>
      <h1>Manager</h1>
      </div>
    </div>
  )
}

export default Manager
