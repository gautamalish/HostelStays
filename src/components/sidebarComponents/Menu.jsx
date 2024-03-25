import React from 'react'
import Navbar from '../frontpageComponents/Navbar'
import Sidebar from '../frontpageComponents/Sidebar'

function Menu() {
  return (
    <div>
      <Navbar/>
      <div className='contentContainer'>
      <Sidebar/>
      <h1>Menu</h1>
      </div>
    </div>
  )
}

export default Menu
