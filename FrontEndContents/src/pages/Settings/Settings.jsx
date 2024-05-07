import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./settings.scss";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../context/firebase.js";
import { useAuth } from "../../context/AuthContext";

function Settings() {
  const { currentUser } = useAuth();
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [country,setCountry]=useState("");
  const [address,setAddress]=useState("");
  useEffect(() => {
    async function getUser() {
      const residentDocRef = doc(db, "residents", currentUser.uid);
      const userDocSnapshot = await getDoc(residentDocRef);
      if (userDocSnapshot.exists()) {
        setUsername(userDocSnapshot.data().username);
        setCountry(userDocSnapshot.data().country)
        setAddress(userDocSnapshot().data().address)
      } else {
        const staffDocRef=doc(db,"staffs",currentUser.uid)
        const staffDocSnapshot=await getDoc(staffDocRef)
        if(staffDocSnapshot.exists()){
          setUsername(staffDocSnapshot.data().username)
          setCountry(staffDocSnapshot.data().country)
          setAddress(staffDocSnapshot.data().address)          

        }
        else {
          console.log("User document not found");
        }
      }
    }
    if (currentUser) {
      getUser();
    }
  }, []);

  function handleEdit(){
    
  }
  return (
    <div className="settings">
      <Sidebar />
      <div className="settingsContainer">
        <Navbar />
        <div className="settingsContents">
          <h2>Settings</h2>
          <hr style={{ width: "62vw" }} />
          <div className="userInputs">
            <div className="left">
              <div className="nameDiv">
                <label htmlFor="name" style={{ fontWeight: "bold" }}>
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Eg: Peter Griffin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p>
                  Your name is for everyone to see. You can change it at any
                  time.
                </p>
              </div>
              <div className="currentPasswordDiv">
                <label htmlFor="password" style={{ fontWeight: "bold" }}>
                  Current Password:
                </label>
                <input
                  type="text"
                  id="password"
                  className="password"
                  placeholder="Current Password"
                />
              </div>
              <div className="newPasswordDiv">
                <label htmlFor="newPassword" style={{ fontWeight: "bold" }}>
                  New Password:
                </label>
                <input
                  type="text"
                  id="newPassword"
                  className="password"
                  placeholder="New Password"
                />
              </div>
              <div className="countryDiv">
                <label htmlFor="country" style={{ fontWeight: "bold" }}>
                  Country:
                </label>
                <input type="text" id="country" placeholder="Country" value={country} onChange={(e)=>setCountry(e.target.value)}/>
              </div>
              <div className="addressDiv">
                <label htmlFor="address" style={{ fontWeight: "bold" }}>
                  Address:
                </label>
                <input type="text" id="address" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
              </div>
              <div className="submitDiv">
                <button className="submitBtn" onClick={handleEdit}>Submit</button>
              </div>
            </div>
            <div className="right">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                className="profileImg"
                alt="No image icon"
              />
              <div className="fileInputDiv">
                <label htmlFor="fileInput" className="editLabel">
                  Edit
                </label>
                <input
                  type="file"
                  className="fileInput"
                  id="fileInput"
                  style={{ display: "none" }}
                />
              </div>
              {/* {error && <Alert variant="danger" className="alert">{error}</Alert>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
