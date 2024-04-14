import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./staffs.scss";
import DataTable from "../../components/StaffsDataTable/StaffsDataTable";
function Staffs() {
  return (
    <div className="staffs">
      <Sidebar />
      <div className="staffsContent">
        <Navbar />
        <div className="staffsMain">
          <DataTable/>
        </div>
      </div>
    </div>
  );
}

export default Staffs;
