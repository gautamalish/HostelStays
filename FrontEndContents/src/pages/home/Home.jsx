import React from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import FeaturedChart from "../../components/featuredChart/FeaturedChart";
import Widget from "../../components/widgets/Widgets";
import Chart from "../../components/chart/Chart";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
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
    </div>
  );
}

export default Home;
