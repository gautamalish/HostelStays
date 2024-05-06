import React, { useEffect, useState } from 'react';
import { db, auth } from '../../context/firebase';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { userColumns } from '../../dataTableSrc';
import './Rooms.scss';
import { doc, addDoc, collection, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';

const Rooms = () => {
    const [room, setRoom] = useState("");
    const [status, setStatus] = useState("");
    const [occby, setOccby] = useState("");
    const [fetchData, setFetchData] = useState([]);
    const [id, setId] = useState();
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const [residentNames, setResidentNames] = useState([]);
    const [roomNumberError, setRoomNumberError] = useState("");
    const [roomExistsError, setRoomExistsError] = useState(""); // Add this state for room existence check

     // Fetch resident names from Firestore
     useEffect(() => {
        const fetchResidentNames = async () => {
            try {
                const residentsRef = collection(db, "residents");
                const residentsSnapshot = await getDocs(residentsRef);
                const names = residentsSnapshot.docs.map(doc => doc.data().displayName);
                setResidentNames(names);
            } catch (error) {
                console.error("Error fetching resident names:", error);
            }
        };

        fetchResidentNames();
    }, []);

    //creating databaseref
    const dbref = collection(db, "Room");

    // Check if room number already exists
    const isRoomNumberExists = async (roomNumber) => {
        const q = query(dbref, where("Room", "==", roomNumber));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    //storing data to database
    const add = async () => {
        // Check if room number is empty
        if (!room.trim()) {
            alert("Room number should not be empty");
            return;
        }

        // Check if room number already exists
        const roomExists = await isRoomNumberExists(room);
        if (roomExists) {
            alert("Room already exists!");
            return;
        }

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

    // Handler to automatically set status based on "Occupied by" field
    const handleOccupiedChange = (e) => {
        const value = e.target.value;
        setOccby(value);
        // Automatically set status based on "Occupied by" field
        setStatus(value.trim() !== "" ? "Occupied" : "Not Occupied");
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
                        <input className='roomno' type='text' placeholder='Room Number' autoComplete='off' value={room} onChange={(e) => setRoom(e.target.value)}></input>
                        {roomNumberError && <p className="error">{roomNumberError}</p>}
                        {roomExistsError && <p className="error">{roomExistsError}</p>}
                    </div>
                    <div className="box">
                        <label htmlFor="occupiedBy">Occupied by:</label>
                        <select id="occupiedBy" value={occby} onChange={handleOccupiedChange}>
                            <option value="">Select tenant</option>
                            {residentNames.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="box">
                        <label htmlFor="status">Status: <span className="status-text">{status ? status : "Fill occupied by"}</span></label>
                    </div>

                    <button onClick={add}>ADD</button>
                    <button onClick={confirmUpdate}>UPDATE</button>
                </div>
            )}

            <div className='database'>
                <h2>Room Details: </h2>
                <div className='container'>
                    {fetchData
                        .sort((a, b) => parseInt(a.Room) - parseInt(b.Room)) // Sort rooms in ascending order
                        .map((data) => (
                            <div className='box' key={data.id}>
                                <h2>Room Number: {data.Room}</h2>
                                <h3>Room status: {data.Status}</h3>
                                {data.Occupied.trim() !== "" ? (
                                    <h3>Occupied by: {data.Occupied}</h3>
                                ) : (
                                    <h3>Occupied by: None</h3>
                                )}
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
