import React from 'react'
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import "./circularChart.scss"
function CircularChart() {
  return (
    <div className='circularChart'>
        <h1 className="title">Total Students</h1>
        <div className="chart">
        <CircularProgressbar value={70} text="70%" strokeWidth={5}/>
        </div>
      
    </div>
  )
}

export default CircularChart
