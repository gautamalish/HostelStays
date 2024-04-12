import React from "react";
import hostel from "../../images/hostel.jpg";
import { IoNotifications } from "react-icons/io5";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

function Navbar() {
  return (
    <div className="navContainer">
      <div className="left"></div>
      <div className="right">
        <IoNotifications className="bellIcon" />
        <img src={hostel} className="hostelImg" alt="Hostel logo" />
      </div>
    </div>
  );
}

export default Navbar;
