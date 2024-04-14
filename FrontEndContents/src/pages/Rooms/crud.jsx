import React, { useEffect, useState } from 'react'
import { db } from '../../context/firebase'
import './crud.css'
import {doc, addDoc, collection, updateDoc, deleteDoc, getDocs} from 'firebase/firestore'

const Crud = () => {
    const [room, setRoom] = useState()
    const [status, setStatus] = useState()
    const [occby, setOccby] = useState()
    const [fetchData, setFetchData] = useState([])
    const [id, setId] = useState()

    //creating databaseref
    const dbref = collection(db, "Room")

    //storing data to database
    const add = async () =>
    {
        const adddata = await addDoc(dbref, {Room: room, Status: status, Occupied: occby})
        if(adddata)
        {
            alert("Data Added Sucessfully")
            window.location.reload()
        }else{
            alert("Error occured while addingg data")
        }
    }

    //fetching the data from database

    const fetch = async ()=>
    {
        const snapshot = await getDocs(dbref)
        const fetchdata = snapshot.docs.map((doc => ({id: doc.id, ...doc.data()})))
        setFetchData(fetchdata)
        console.log(fetchdata)
    }

    useEffect(() => 
    {
        fetch()
    },[])

    //pass update the data

    const passData = async (id) => {
        console.log("ID passed to passData:", id);
        const matchId = fetchData.find(data => data.id === id);
        console.log("matchId:", matchId);
        if (matchId) {
            setRoom(matchId.Room);
            setStatus(matchId.Status);
            setOccby(matchId.Occupied);
            setId(matchId.id);
        } else {
            console.error("Document not found with ID:", id);
        }
    };
    


    // update data base
    const update = async () => {
        try {
            // Check if id is not empty or undefined
            if (!id) {
                throw new Error("Document ID is empty or undefined.");
            }
    
            // Construct reference to the document to be updated
            const updateref = doc(dbref, id);
    
            // Attempt to update the document with new data
            await updateDoc(updateref, { Room: room, Status: status, Occupied: occby });
    
            // If update is successful, display success message and reload the page
            alert("Update successful");
            window.location.reload();
        } catch (error) {
            // If any error occurs during the update process, display error message
            console.error("Error updating room:", error);
            alert("Failed to update room: " + error.message);
        }
    };

    //deleting room from database

    const del = async (id) =>
    {
        const delref = doc(dbref, id)
        try{
            await deleteDoc(delref)
            alert("Deleted Sucessfully")
            window.location.reload()
        }
        catch (error)
        {
            alert(error)
        }
    }

  return (
    <>
    <div className="form_container">
        <h2> Add/Update Room</h2>
        <div className="box">
            <input type = 'text' placeholder='Room Number' autocomplete='off' value={room} onChange={(e) => setRoom(e.target.value)}></input>
        </div>
        <div className="box">
            <input type = 'text' placeholder='Status' autocomplete='off' value={status} onChange={(e) => setStatus(e.target.value)}></input>
        </div>
        <div className="box">
            <input type = 'text' placeholder='Occupied by' autocomplete='off' value={occby} onChange={(e) => setOccby(e.target.value)}></input>
        </div>
        <button onClick={add}>ADD</button>
        <button onClick={update}>UPDATE</button> 
    </div>
    <div className='database'>
        <h2>Room Data:</h2>
        <div className='container'>
            {
                fetchData.map((data) =>
            {
                return(
                    <>
                    <div className='box'>
                        <h3>Room Number: {data.Room}</h3>
                        <h3>Status: {data.Status}</h3>
                        <h3>Occupied by: {data.Occupied}</h3>
                        <button onClick={() => passData (data.id)}>UPDATE</button>  
                        <button onClick={() => del(data.id)}>DELETE</button> 
                    </div>      
                    </>
                )
            })
            } 
            
        </div>

    </div>
    </>
  )
}

export default Crud