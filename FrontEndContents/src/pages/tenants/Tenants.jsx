import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./tenants.scss"
import DataTable from '../../components/datatable/ResidentsDataTable'

function Tenants() {
  return (
    <div className='tenants'>
      {/* calling the sidebar component */}
      <Sidebar/>
      <div className="tenantsContent">
        <Navbar/>
        <div className='tenantsMain'>
          {/* calling the dataTable component */}
            <DataTable/>
        </div>
      </div>
    </div>
  )
}

export default Tenants
