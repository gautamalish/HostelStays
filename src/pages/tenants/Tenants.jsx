import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./tenants.scss"
function Tenants() {
  return (
    <div className='tenants'>
      <Sidebar/>
      <div className="tenantsContent">
        <Navbar/>
        <div>
          <h1>Tenants</h1>
        </div>
      </div>
    </div>
  )
}

export default Tenants
