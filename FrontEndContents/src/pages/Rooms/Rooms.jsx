import React, { useEffect, useState } from 'react';
import { db, auth, storage } from '../../context/firebase'; // assuming you have storage imported from firebase
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { userColumns } from '../../dataTableSrc';
import './Rooms.scss';
import { doc, addDoc, collection, updateDoc, deleteDoc, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // import necessary storage functions

const Rooms = () => {
    const [room, setRoom] = useState("");
    const [status, setStatus] = useState("");
    const [occby, setOccby] = useState("");
    const [fetchData, setFetchData] = useState([]);
    const [id, setId] = useState("");
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const [residentNames, setResidentNames] = useState([]);
    const [roomNumberError, setRoomNumberError] = useState("");
    const [roomExistsError, setRoomExistsError] = useState("");
    const [joinedDate, setJoinedDate] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [roomImage, setRoomImage] = useState(null); // State for room image

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

    // Fetch room data and subscribe to real-time updates
    useEffect(() => {
        const unsubscribe = onSnapshot(dbref, (snapshot) => {
            const fetchdata = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFetchData(fetchdata);
        });

        return () => unsubscribe();
    }, []);

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

        // Upload image to Firestore Storage
        const storageRef = ref(storage, `room_images/${roomImage.name}`);
        const uploadTask = uploadBytes(storageRef, roomImage);

        uploadTask.then((snapshot) => {
            console.log('File uploaded successfully');
            // Get the download URL after upload completion
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                // Add room data to Firestore with image URL
                addRoomToFirestore(downloadURL);
            });
        }).catch((error) => {
            // Handle unsuccessful uploads
            console.error("Error uploading image:", error);
        });

        const addRoomToFirestore = async (imageUrl) => {
            const adddata = await addDoc(dbref, { 
                Room: room, 
                Status: status, 
                Occupied: occby,
                JoinedDate: joinedDate,
                ExpireDate: expireDate,
                RoomImageURL: imageUrl // Store image URL in Firestore
            });
            if (adddata) {
                alert("Room Added Successfully");
            } else {
                alert("Error occurred while adding room");
            }
        };
    };

    //pass update the data
    const passData = async (id) => {
        const matchId = fetchData.find(data => data.id === id);
        if (matchId) {
            setRoom(matchId.Room);
            setStatus(matchId.Status);
            setOccby(matchId.Occupied);
            setJoinedDate(matchId.JoinedDate);
            setExpireDate(matchId.ExpireDate);
            setId(matchId.id);
        } else {
            console.error("Tenant not found with ID:", id);
        }
    };

    // Confirmation before update
    const confirmUpdate = async () => {
        if (window.confirm("Are you sure you want to update this Room?")) {
            await update();
        }
    };

    // Confirmation before delete
    const confirmDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Room?")) {
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
            await updateDoc(updateref, { Room: room, Status: status, Occupied: occby, JoinedDate: joinedDate, ExpireDate: expireDate });
            alert("Update successful");
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
                                <label htmlFor="roomImage">Image:</label>
                                <input type="file" id="roomImage" onChange={(e) => setRoomImage(e.target.files[0])} />
                            </div>
                            <div className="box">
                                <label htmlFor="occupiedBy">Occupied by:</label>
                                <select id="occupiedBy" value={occby} onChange={handleOccupiedChange}>
                                    <option value="">Select tenant</option>
                                    <option value="">None</option>
                                    {residentNames.map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                            {status === "Occupied" && (
                                <>
                                    <div className="box">
                                        <label htmlFor="joinedDate">Join Date:</label>
                                        <input type="date" id="joinedDate" value={joinedDate} onChange={(e) => setJoinedDate(e.target.value)} />
                                    </div>
                                    <div className="box">
                                        <label htmlFor="expireDate">Expire Date:</label>
                                        <input type="date" id="expireDate" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} />
                                    </div>
                                </>
                            )}
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
                                        {data.RoomImageURL && (
                                            <img src={data.RoomImageURL} alt={`Room ${data.Room}`} />
                                        )}
                                        <h3>Room status: {data.Status}</h3>
                                        {data.Occupied.trim() !== "" ? (
                                            <h3>Occupied by: {data.Occupied}</h3>
                                        ) : (
                                            <h3>Occupied by: None</h3>
                                        )}
                                        {data.Status === "Occupied" && (
                                            <>
                                                <h3>Joined Date: {data.JoinedDate}</h3>
                                                <h3>Expire Date: {data.ExpireDate}</h3>
                                            </>
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
