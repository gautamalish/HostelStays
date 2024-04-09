// BarChart.jsx

import React from "react";
import "./BarChart.scss";

function BarChart() {
  // Dummy data for the bar chart
  const data = [
    { label: "Category 1", value: 30 },
    { label: "Category 2", value: 50 },
    { label: "Category 3", value: 70 },
    { label: "Category 4", value: 40 },
    { label: "Category 5", value: 60 },
  ];

  // Calculate the maximum value for scaling
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="barChart">
      {data.map((item, index) => (
        <div key={index} className="barContainer">
          <div className="barLabel">{item.label}</div>
          <div className="bar">
            <div
              className="barFill"
              style={{ height: `${(item.value / maxValue) * 100}px` }}
            ></div>
          </div>
          <div className="barValue">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

export default BarChart;
