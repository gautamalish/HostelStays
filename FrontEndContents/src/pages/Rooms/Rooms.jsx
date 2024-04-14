import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Crud from './crud'
import "./Rooms.scss"

function Rooms() {
  return (
    <div className='rooms'>
      <Sidebar/>
      <div className="roomsContent">
        <Navbar/>
        <div className='roomsMain'>
           <Crud/>
        </div>
      </div>
    </div>
  )
}

export default Rooms