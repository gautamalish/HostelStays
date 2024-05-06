import React, { useState, useRef, useEffect} from 'react';
import hostel from "../../images/hostel.jpg"
import profile from "../../images/profile.png"
import settings from "../../images/settings.png"
import logout from "../../images/logout.png"
import { IoNotifications } from "react-icons/io5";
import "./navbar.scss"
import { NavLink } from 'react-bootstrap';
function Navbar() {
  const [showPopover, setShowPopover] = useState(false);

  const imgRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imgRef.current && !imgRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [imgRef]);
  return (
    <div className='navContainer'>
      <div className="left">
      </div>
      <div className="right">
      <IoNotifications className='bellIcon'/>
      <img src={hostel} className='hostelImg' alt="Hostel logo" onClick={() => setShowPopover(!showPopover)} />
      {showPopover && (
            <div className="popover">
              <div className="popover-item">
              <img src={profile} className='EditImg' alt="Profile" ></img>Edit Profile</div>
              <div className="popover-item">
              <img src={settings} className='SettImg' alt="settings"></img>Settings</div>
              <div className="popover-item">
              <img src={logout} className='logoutImg' alt="logout"></img>Log Out</div>
            </div>
          )}
      </div>
    </div>
  );
}

export default Navbar;
