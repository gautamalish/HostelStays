import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Logout from "../../pages/Logout/Logout";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom" 
import HamMenu from "../../components/hamburgerMenu/hamMenu";
import "./sidebar.scss";
function HamSidebar({ setShowHamSidebar }) {
  const [clicked,setClicked]=useState(false)
  function handleClick(){
    setShowHamSidebar(prev=>!prev)
  }
  return (
    <div className="hamSidebar">
      <div className="top">
        <button className="crossButton" onClick={handleClick}>X</button>
      </div>
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">MAIN</p>
          <NavLink to="/home" className="navlink">
            <li>
              <DashboardOutlinedIcon className="icon"/>
              <span>Dashboard</span>
            </li>
          </NavLink>
          <p className="title">SERVICE</p>
          <NavLink to="/rooms" className="navlink">
              <li>
                <MeetingRoomIcon className="icon"/>
                <span>Rooms</span>
                </li>
            </NavLink>
          <NavLink to="/menu" className="navlink">
            <li>
              <RestaurantOutlinedIcon className="icon"/>
              <span>Meals</span>
            </li>
          </NavLink>
          <p className="title">PEOPLE</p>
          <NavLink to="/tenants" className="navlink">
            <li>
              <PeopleOutlineOutlinedIcon className="icon"/>
              <span>Tenants</span>
              </li>
          </NavLink>
          <NavLink to="/staffs" className="navlink">
            <li>
            <PersonIcon className="icon"/>
              <span>Staffs</span></li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default HamSidebar;
