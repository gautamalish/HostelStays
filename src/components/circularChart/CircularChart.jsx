import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./circularChart.scss";

function CircularChart({ value, text }) {
  return (
    <div className="circularChart">
      <h1 className="title">{text}</h1>
      <div className="chart">
        <CircularProgressbar value={value} text={`${value}`} />
      </div>
    </div>
  );
}

export default CircularChart;
