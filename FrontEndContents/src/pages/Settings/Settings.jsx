import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import "./settings.scss"
function Settings() {
  return (
    <div className='settings'>
        <Sidebar/>
      <div className="settingsContainer">
        <Navbar/>
        <div className='settingsContents'>
            <h2>Settings</h2>
            <hr style={{width:"60vw"}}/>
            <div className='nameDiv'>
                <label htmlFor="name" style={{fontWeight:"bold"}}>
                    Name:
                </label>
                <input type="text" id='name' placeholder='Eg: Peter Griffin'/>
                <p>Your name is for everyone to see. You can change it at any time.</p>
            </div>
            <div className='currentPasswordDiv'>
                <label htmlFor="password" style={{fontWeight:"bold"}}>Current Password:</label>
                <input type="text" id='password' placeholder='Current Password'/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
