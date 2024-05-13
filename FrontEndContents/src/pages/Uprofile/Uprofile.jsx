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
        </div>
      </div>
    </div>
  );
}

export default Uprofile;
