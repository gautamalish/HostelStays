import React from 'react'
import Navbar from '../frontpageComponents/Navbar'
import Sidebar from '../frontpageComponents/Sidebar'
function Tenants() {
  return (
    <div>
    <Navbar/>
      <div className='contentContainer'>
      <Sidebar/>
      <h1>Tenants</h1>
      </div>
    </div>
  )
}

export default Tenants
