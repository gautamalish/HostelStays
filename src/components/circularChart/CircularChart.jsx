import React from 'react'
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
function CircularChart() {
  return (
    <div className='circularChart'>
      <CircularProgressbar value={70} text="70%"/>
    </div>
  )
}

export default CircularChart
