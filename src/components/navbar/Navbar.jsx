import React from 'react'
import hostel from "../../images/hostel.jpg"
import { IoNotifications } from "react-icons/io5";
import "./navbar.scss"
import { NavLink } from 'react-bootstrap';
function Navbar() {
  return (
    <div className='navContainer'>
      <div className="left">
      </div>
      <div className="right">
      <IoNotifications className='bellIcon'/>
      <img src={hostel} className='hostelImg' alt="Hostel logo" />
      </div>
    </div>
  )
}

export default Navbar
