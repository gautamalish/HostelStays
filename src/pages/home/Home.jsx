import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout";
import "./home.scss";
import CircularChart from "../../components/circularChart/CircularChart";
import BarChart from "../../components/BarChart/BarChart";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContent">
        <Navbar />
        <div className="homeMain">
          <div className="top"></div>
          <div className="bottom">
            <div className="circularCharts">
              <CircularChart value={40} text="Total Students" />
              <CircularChart value={60} text="Total Room" />
              <CircularChart value={20} text="Available Room" />
            </div>
            {/* Render the BarChart component here */}
            <div className="barChartContainer">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
