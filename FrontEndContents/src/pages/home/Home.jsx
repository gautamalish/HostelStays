import React, { useState } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import FeaturedChart from "../../components/featuredChart/FeaturedChart";
import Widget from "../../components/widgets/Widgets";
import Chart from "../../components/chart/Chart";
import Notify from "../../components/notify/Notify";
import { ToastContainer } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";
import HamMenu from "../../components/hamburgerMenu/hamMenu";
import HamSidebar from "../../components/sidebar copy/HamSidebar";
function Home({isWideScreen,setShowHamIcon,showHamIcon,setShowHamSidebar,showHamSidebar}) {
  const [showNotify, setShowNotify] = useState(false); // State to manage visibility of Notify

  // Function to toggle visibility of Notify
  function toggleNotify() {
    setShowNotify((prevNotify)=>!prevNotify);
  }

  return (
    <div className="home">
      {isWideScreen && <Sidebar />}
      { !isWideScreen && showHamIcon && 
        <HamMenu setShowHamSidebar={setShowHamSidebar}/>
      }
      {!isWideScreen && showHamIcon && showHamSidebar && <HamSidebar setShowHamSidebar={setShowHamSidebar}/>}
      <div className="homeContainer">
        <Navbar />
        <div className="homeRight">
          <button className="notifyBut" onClick={toggleNotify}>
            Notify
          </button>
        </div>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <FeaturedChart />
          <Chart aspect={2 / 1} title="Last 3 Months (Tenants)" />
        </div>
      </div>
      {/* Render Notify component as overlay in center */}
      {showNotify && <Notify />}
      <ToastContainer/>
    </div>
  );
}

export default Home;
