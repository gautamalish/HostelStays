import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import "./settings.scss"
function Settings() {
  const [file,setFile]=useState("")
  return (
    <div className='settings'>
        <Sidebar/>
      <div className="settingsContainer">
        <Navbar/>
        <div className='settingsContents'>
        <h2>Settings</h2>
        <hr style={{width:"62vw"}}/>
        <div className='userInputs'>
          <div className="left">
            <div className='nameDiv'>
                <label htmlFor="name" style={{fontWeight:"bold"}}>
                    Name:
                </label>
                <input type="text" id='name' placeholder='Eg: Peter Griffin'/>
                <p>Your name is for everyone to see. You can change it at any time.</p>
            </div>
            <div className='currentPasswordDiv'>
                <label htmlFor="password" style={{fontWeight:"bold"}}>Current Password:</label>
                <input type="text" id='password' className='password' placeholder='Current Password'/>
            </div>
            <div className="newPasswordDiv">
              <label htmlFor="newPassword" style={{fontWeight:"bold"}}>New Password:</label>
              <input type="text" id='newPassword' className='password' placeholder='New Password'/>
            </div>
            <div className='countryDiv'>
              <label htmlFor="country" style={{fontWeight:"bold"}}>Country:</label>
              <input type="text" id='country' placeholder='Country'/>
            </div>
            <div className='addressDiv'>
              <label htmlFor="address" style={{fontWeight:"bold"}}>Address:</label>
              <input type="text" id='address' placeholder='Address'/>
            </div>
            <div className='submitDiv'>
                <button className='submitBtn'>Submit</button>
            </div>
          </div>
          <div className="right">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              className="profileImg"
              alt="No image icon"
            />
            <div className='fileInputDiv'>
              <label htmlFor="fileInput" className='editLabel'>Edit</label>
              <input type="file" className='fileInput' id='fileInput' style={{display:"none"}}/>
            </div>
            {/* {error && <Alert variant="danger" className="alert">{error}</Alert>} */}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
