import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./meals.scss"
import {db } from "../../context/firebase"
function Meals() {
  return (
    <div className='meals'>
      <Sidebar/>
      <div className="mealscontext">
        <Navbar/>
        <div className='meals-container'>
          <h2>Add / Update Meals</h2>
          <div className='days-list'>
            <label>
              Day: 
            <select name="days" className='dayname'>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Firday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </label>
        </div>
        <h4>Vegeterian</h4>
        <div className='box'>
          <input type="text" placeholder='Breakfast' autoComplete='Off'/>
        </div>
        <div className='box'>
          <input type="text" placeholder='Lunch' autoComplete='Off'/>
        </div>
        <div className='box'>
          <input type="text" placeholder='Dinner' autoComplete='Off'/>
        </div>
        <h4>Non - Vegeterian</h4>
        <div className='box'>
          <input type="text" placeholder='Breakfast' autoComplete='Off'/>
        </div>
        <div className='box'>
          <input type="text" placeholder='Lunch' autoComplete='Off'/>
        </div>
        <div className='box'>
          <input type="text" placeholder='Dinner' autoComplete='Off'/>
        </div>
        <button>Add</button>
        <button>Update</button>
      </div>
      </div>
    </div>
  )
}

export default Meals
