import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout";
import "./home.scss";
import CircularChart from "../../components/circularChart/CircularChart";
function Home() {
  return (
    <div className="home">
        <Sidebar/>
      <div className="homeContent">
        <Navbar />
        <div className="homeMain">
        <div className="bottom">
          <CircularChart/>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
