import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./staffs.scss";
import DataTable from "../../components/StaffsDataTable/StaffsDataTable";
function Staffs() {
  return (
    <div className="staffs">
      {/* calling the sidebar component */}
      <Sidebar />
      <div className="staffsContent">
        {/* calling the navbar component */}
        <Navbar />
        <div className="staffsMain">
          {/* calling the datatable component */}
          <DataTable/>
        </div>
      </div>
    </div>
  );
}

export default Staffs;
