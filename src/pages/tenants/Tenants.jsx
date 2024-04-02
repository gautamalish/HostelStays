import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./tenants.scss"
import DataTable from '../../components/datatable/ResidentsDataTable'

function Tenants() {
  return (
    <div className='tenants'>
      <Sidebar/>
      <div className="tenantsContent">
        <Navbar/>
        <div className='tenantsMain'>
            <DataTable/>
        </div>
      </div>
    </div>
  )
}

export default Tenants
