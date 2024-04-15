import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar' 
import "./meals.scss";
import { db } from "../../context/firebase";
import { doc, addDoc, collection, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

function Meals() {
  const [day, setDay] = useState("");
  const [breakfastv, setBreakfastv] = useState("");
  const [lunchv, setLunchv] = useState("");
  const [dinnerv, setDinnerv] = useState("");
  const [breakfastn, setBreakfastn] = useState("");
  const [lunchn, setLunchn] = useState("");
  const [dinnern, setDinnern] = useState("");
  const [fetchData, setFetchData] = useState([]);
  const [id, setId] = useState("");

  const dbref = collection(db, "MEALS");

  const add = async () => {
    const adddata = await addDoc(dbref, { Day: day, BreakfastV: breakfastv, LunchV: lunchv, DinnerV: dinnerv, BreakfastN: breakfastn, LunchN: lunchn, DinnerN: dinnern });
    if (adddata) {
      alert("Data Added Successfully");
      window.location.reload();
    } else {
      alert("Error occurred while adding data");
    }
  };

  const fetchDataFromDB = async () => {
    try {
      const snapshot = await getDocs(dbref);
      const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFetchData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataFromDB();
  }, []); 

  const passData = async (id) =>{
    const matchId = fetchData.find((item) =>{
      return item.id === id
    })
    setDay(matchId.Day)
    setBreakfastv(matchId.BreakfastV)
    setLunchv(matchId.LunchV)
    setDinnerv(matchId.DinnerV)
    setBreakfastn(matchId.BreakfastN)
    setLunchn(matchId.LunchN)
    setDinnern(matchId.DinnerN)
    setId(matchId.id)
  }

  const update = async () =>{
    try {
      if(!id){
        throw new Error("Document ID is empty or undefined.");
      }
      const updateref = doc(dbref, id)
      await updateDoc(updateref, {Day: day, BreakfastV: breakfastv, LunchV: lunchv, DinnerV: dinnerv, BreakfastN: breakfastn, LunchN: lunchn, DinnerN: dinnern })
      alert("Update successfully.")
      window.location.reload();
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Failed to update room: " + error.message);
    }
  };

  return (
    <>
      <div className='meals'>
        <Sidebar/>
        <div className="mealscontext">
          <Navbar/>
          <div className='meals-container'>
            <h2>Add / Update Meals</h2>
            <div className='days-list'>
              <label>
                <strong>Day: </strong>
                <select name="days" className='dayname' value={day} onChange={(e) => setDay(e.target.value || "")}>
                  <option value="">Select Day</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </label>
            </div>
            <h4>Vegetarian</h4>
            <div className='box'>
              <input type="text" placeholder='Breakfast' autoComplete='Off' value={breakfastv} onChange={(e) => setBreakfastv(e.target.value)} />
            </div>

            <div className='box'>
              <input type="text" placeholder='Lunch' autoComplete='Off' value={lunchv} onChange={(e) => setLunchv(e.target.value)} />
            </div>

            <div className='box'>
              <input type="text" placeholder='Dinner' autoComplete='Off' value={dinnerv} onChange={(e) => setDinnerv(e.target.value)} />
            </div>

            <h4>Non-Vegetarian</h4>

            <div className='box'>
              <input type="text" placeholder='Breakfast' autoComplete='Off' value={breakfastn} onChange={(e) => setBreakfastn(e.target.value)} />
            </div>

            <div className='box'>
              <input type="text" placeholder='Lunch' autoComplete='Off' value={lunchn} onChange={(e) => setLunchn(e.target.value)} />
            </div>

            <div className='box'>
              <input type="text" placeholder='Dinner' autoComplete='Off' value={dinnern} onChange={(e) => setDinnern(e.target.value)} />
            </div>

            <button onClick={add}>Add</button>
            <button onClick={update}>Update</button>
          </div>

          <div className='database'>
            <h3>Weekly Meals Plan</h3>
            <div className='container'>
              {fetchData.map(item => (
                <div key={item.id} className='list'>
                  <h3>{item.Day}</h3>
                  <h4>Vegetarian</h4>
                  <h5>Breakfast: {item.BreakfastV}</h5>
                  <h5>Lunch: {item.LunchV}</h5>
                  <h5>Dinner: {item.DinnerV}</h5>
                  <h4>Non-Vegetarian</h4>
                  <h5>Breakfast: {item.BreakfastN}</h5>
                  <h5>Lunch: {item.LunchN}</h5>
                  <h5>Dinner: {item.DinnerN}</h5>
                  <button onClick={() => passData(item.id)}>Edit</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Meals;