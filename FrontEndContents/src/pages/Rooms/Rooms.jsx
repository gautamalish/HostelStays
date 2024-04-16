import React, { useEffect, useState } from 'react';
import { db, auth } from '../../context/firebase';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './Rooms.scss';
import { doc, addDoc, collection, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

const Rooms = () => {
    const [room, setRoom] = useState("");
    const [status, setStatus] = useState("");
    const [occby, setOccby] = useState("");
    const [fetchData, setFetchData] = useState([]);
    const [id, setId] = useState();
    const [currentUser, setCurrentUser] = useState(auth.currentUser);

    //creating databaseref
    const dbref = collection(db, "Room");

    //storing data to database
    const add = async () => {
        // Check authorization
        if (!currentUser || currentUser.email !== "np03cs4a220120@heraldcollege.edu.np") {
            alert("You are not authorized to perform this action.");
            return;
        }

        const adddata = await addDoc(dbref, { Room: room, Status: status, Occupied: occby });
        if (adddata) {
            alert("Data Added Successfully");
            window.location.reload();
        } else {
            alert("Error occurred while adding data");
        }
    };

    //fetching the data from database
    const fetch = async () => {
        const snapshot = await getDocs(dbref);
        const fetchdata = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFetchData(fetchdata);
    };

    useEffect(() => {
        fetch();
    }, []);

    //pass update the data
    const passData = async (id) => {
        const matchId = fetchData.find(data => data.id === id);
        if (matchId) {
            setRoom(matchId.Room);
            setStatus(matchId.Status);
            setOccby(matchId.Occupied);
            setId(matchId.id);
        } else {
            console.error("Document not found with ID:", id);
        }
    };

    // Confirmation before update
    const confirmUpdate = async () => {
        if (window.confirm("Are you sure you want to update this data?")) {
            await update();
        }
    };

    // Confirmation before delete
    const confirmDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this data?")) {
            await del(id);
        }
    };

    // update data base
    const update = async () => {
        try {
            if (!id) {
                throw new Error("Document ID is empty or undefined.");
            }
            const updateref = doc(dbref, id);
            await updateDoc(updateref, { Room: room, Status: status, Occupied: occby });
            alert("Update successful");
            window.location.reload();
        } catch (error) {
            console.error("Error updating room:", error);
            alert("Failed to update room: " + error.message);
        }
    };

    //deleting room from database
    const del = async (id) => {
        const delref = doc(dbref, id);
        try {
            await deleteDoc(delref);
            alert("Deleted Successfully");
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
        <div className='rooms'>
        <Sidebar/>
        <div className="roomscontent">
          <Navbar/>

          <div className='roomsmain'>
            {currentUser && currentUser.email === "np03cs4a220120@heraldcollege.edu.np" && (
                <div className="form_container">
                    <h2> Add / Update Room</h2>
                    <div className="box">
                        <input type='text' placeholder='Room Number' autoComplete='off' value={room} onChange={(e) => setRoom(e.target.value)}></input>
                    </div>
                    <div className="box">
                        <input type='text' placeholder='Occupied by' autoComplete='off' value={occby} onChange={(e) => setOccby(e.target.value)}></input>
                    </div>
                    <div className="box">
                        <label htmlFor="status">Status:</label>
                        <select id="status" value={status} onChange={(e) => setStatus(e.target.value || "")}>
                            <option value="">Select Room Status</option>
                            <option value="Occupied">Occupied</option>
                            <option value="Not Occupied">Not Occupied</option>
                        </select>
                    </div>

                    <button onClick={add}>ADD</button>
                    <button onClick={confirmUpdate}>UPDATE</button>
                </div>
            )}

            <div className='database'>
                <h2>Room Details: </h2>
                <div className='container'>
                    {fetchData
                        .sort((a, b) => a.Room.localeCompare(b.Room)) // Sort rooms in ascending order
                        .map((data) => (
                            <div className='box' key={data.id}>
                                <h2>Room Number: {data.Room}</h2>
                                <h3>Room status: {data.Status}</h3>
                                <h3>Occupied by: {data.Occupied}</h3>
                                {currentUser && currentUser.email === "np03cs4a220120@heraldcollege.edu.np" && (
                                    <>
                                        <button onClick={() => passData(data.id)}>UPDATE</button>
                                        <button onClick={() => confirmDelete(data.id)}>DELETE</button>
                                    </>
                                )}
                            </div>
                        ))}
                </div>
            </div>
          </div>
        </div>
        </div>
        </>
    );
};

export default Rooms;
