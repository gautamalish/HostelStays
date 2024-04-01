import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./meals.scss"
function Meals() {
  return (
    <div className='meals'>
      <Sidebar/>
      <div className="mealsContent">
        <Navbar/>
        <h1>Meals</h1>
      </div>
    </div>
  )
}

export default Meals
