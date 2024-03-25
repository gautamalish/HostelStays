import React from 'react'
import Navbar from '../frontpageComponents/Navbar'
import Sidebar from '../frontpageComponents/Sidebar'

function Home() {
  return (
    <div className='homeContainer'>
        <Navbar/>
      <div className='contentContainer'>
      <Sidebar/>
      <h1>Home</h1>
      </div>
    </div>
  )
}

export default Home
