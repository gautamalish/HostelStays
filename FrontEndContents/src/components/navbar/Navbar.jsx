import React, { useState, useRef, useEffect } from "react";
import hostel from "../../images/hostel.jpg";
import profile from "../../images/profile.png";
import { CgProfile } from "react-icons/cg";
import logout from "../../images/logout.png"; 
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import "./navbar.scss";
import { useNewAuth } from "../../context/AnotherContext";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [showPopover, setShowPopover] = useState(false);
  const { logoutDisplay, setLogoutDisplay } = useNewAuth();
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
      <div className="right">
        <img
          src={hostel}
          className="hostelImg"
          alt="Hostel logo"
          onClick={() => setShowPopover(!showPopover)}
        />
        {showPopover && (
          <div className="popover">

            <NavLink
              to="/Uprofile"
              style={{ color: "black", textDecoration: "none" }}
            >
              <div className="popover-item">
                <CgProfile className="EditImg" color="#7451f8" />
                Profile
              </div>
            </NavLink>

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
