import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./staffs.scss";
function Staffs() {
  return (
    <div className="staffs">
      <Sidebar />
      <div className="staffsContent">
        <Navbar />
        <div className="staffsMain">
          <h1>Staffs</h1>
        </div>
      </div>
    </div>
  );
}

export default Staffs;
