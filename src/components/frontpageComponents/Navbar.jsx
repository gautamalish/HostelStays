import React from 'react'
import hostel from "../../images/hostel.jpg"
import { IoNotifications } from "react-icons/io5";
function Navbar() {
  return (
    <div className='navContainer'>
      <IoNotifications className='bellIcon'/>
      <img src={hostel} className='hostelImg' alt="Hostel logo" />
    </div>
  )
}

export default Navbar
