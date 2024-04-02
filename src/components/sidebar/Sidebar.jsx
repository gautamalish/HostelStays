import React from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Logout from "../../pages/Logout/Logout";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "./sidebar.scss";
function Sidebar({ setShowLogout }) {
  return (
    <div className="sidebar">
      <div className="top">
        <NavLink to="/home" className="logo">
          <h1>HostelStays</h1>
        </NavLink>
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
          <p className="title">MENU</p>
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
              <span>Residents</span>
              </li>
          </NavLink>
          <NavLink to="/staffs" className="navlink">
            <li>
            <PersonIcon className="icon"/>
              <span>Staffs</span></li>
          </NavLink>
          <p className="title">EXIT</p>
          <NavLink to="/logout" className="navlink">
            <li>
              <ExitToAppIcon className="icon"/>
              <span>Logout</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
