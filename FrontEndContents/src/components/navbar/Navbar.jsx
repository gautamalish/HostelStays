import React, { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import hostel from "../../images/hostel.jpg";

import "./navbar.scss";
import { useNewAuth } from "../../context/AnotherContext";
import { NavLink } from "react-router-dom";

function Navbar({ toggleNotify }) {
  // Pass toggleNotify function as prop
  const [showPopover, setShowPopover] = useState(false);
  const { setLogoutDisplay } = useNewAuth();
  const imgRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imgRef.current && !imgRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [imgRef]);

  function toggleLogout() {
    setLogoutDisplay(true);
  }

  return (
    <div className="navContainer">
      <div className="left"></div>
      <div className="right">
        <button className="notifyButton" onClick={toggleNotify}>
          Notify
        </button>{" "}
        {/* Add onClick handler to toggleNotify */}
        <IoNotifications className="bellIcon" />
        <img
          src={hostel}
          className="hostelImg"
          alt="Hostel logo"
          onClick={() => setShowPopover(!showPopover)}
          ref={imgRef}
        />
        {showPopover && (
          <div className="popover">
            <div className="popover-item">
              <CgProfile className="EditImg" color="#7451f8" />
              Edit Profile
            </div>
            <NavLink
              to="/settings"
              style={{ color: "black", textDecoration: "none" }}
            >
              <div className="popover-item">
                <IoMdSettings className="SettImg" color="#7451f8" />
                Settings
              </div>
            </NavLink>
            <div className="popover-item" onClick={toggleLogout}>
              <MdLogout className="logoutImg" color="#7451f8" />
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
