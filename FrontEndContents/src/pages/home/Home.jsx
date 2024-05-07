import React, { useState } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import FeaturedChart from "../../components/featuredChart/FeaturedChart";
import Widget from "../../components/widgets/Widgets";
import Chart from "../../components/chart/Chart";
import Notify from "../../components/notify/Notify"; // Import Notify component

function Home() {
  const [showNotify, setShowNotify] = useState(false); // State to manage visibility of Notify

  // Function to toggle visibility of Notify
  function toggleNotify() {
    setShowNotify(!showNotify);
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar toggleNotify={toggleNotify} />{" "}
        {/* Pass toggleNotify function as prop */}
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
    </div>
  );
}

export default Home;
