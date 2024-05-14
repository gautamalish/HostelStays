import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Uprofile.scss";

function Uprofile() {
  return (
    <div className="uprofile">
      <Sidebar />
      <div className="uprofileContainer">
        <Navbar />
        <div className="uprofileContents">
          <h1>Profile</h1>
          <div className="profile">
            <img src="" className="profileImg" alt="Profile icon"/>
          </div>
          <div className='box'>
            <label htmlFor="roomImage">Full Name: </label>
            <input type="text" placeholder='Fullname' />
          </div>
          <div className='box'>
            <label htmlFor="roomImage">Username: </label>
            <input type="text" placeholder='Username' />
          </div>
          <div className='box'>
            <label htmlFor="roomImage">Email: </label>
            <input className='box-email' type="text" placeholder='Email' />
            <p>This is your primary email address.</p>
          </div>
          <div className='box'>
          <label htmlFor="roomImage">Address: </label>
            <input className='box-address' type="text" placeholder='Address' />
          </div>
          <div className='box'>
            <label htmlFor="roomImage">Phone Number: </label>
            <input type="text" placeholder='Phone Number' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Uprofile;
