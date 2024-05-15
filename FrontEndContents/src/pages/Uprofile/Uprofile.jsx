import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import "./Uprofile.scss";
import { db } from "../../context/firebase";
import { doc, getDoc } from "firebase/firestore";

function Uprofile() {
  const { currentUser } = useAuth();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phonenum, setPhoneNum] = useState("");
  const [profileimg, setProfile] = useState("");

  useEffect(() => {
    async function getInfo() {
      const residentDocRef = doc(db, "residents", currentUser.uid);
      const userDocSnapshot = await getDoc(residentDocRef);
      const staffDocRef = doc(db, "staffs", currentUser.uid);
      const staffDocSnapshot = await getDoc(staffDocRef);
      const adminDocRef = doc(db, "Admin", currentUser.uid);
      const adminDocSnapshot = await getDoc(adminDocRef);
      if (userDocSnapshot.exists()) {
        setProfile(userDocSnapshot.data().img);
        setFullname(userDocSnapshot.data().displayName);
        setUsername(userDocSnapshot.data().username);
        setEmail(userDocSnapshot.data().email);
        setAddress(userDocSnapshot.data().address);
        setPhoneNum(userDocSnapshot.data().phone);
      } else if (staffDocSnapshot.exists()) {
        setProfile(staffDocSnapshot.data().img);
        setFullname(staffDocSnapshot.data().displayName);
        setUsername(staffDocSnapshot.data().username);
        setEmail(staffDocSnapshot.data().email);
        setAddress(staffDocSnapshot.data().address);
        setPhoneNum(staffDocSnapshot.data().phone);
      } else if (adminDocSnapshot.exists()) {
        setProfile(adminDocSnapshot.data().img);
        setFullname(adminDocSnapshot.data().displayName);
        setUsername(adminDocSnapshot.data().username);
        setEmail(adminDocSnapshot.data().email);
        setAddress(adminDocSnapshot.data().address);
        setPhoneNum(adminDocSnapshot.data().phone);
      } else {
        console.log("User document not found");
      }
    }
    if (currentUser) {
      getInfo();
    }
  }, []);

  return (
    <div className="uprofile">
      <Sidebar />
      <div className="uprofileContainer">
        <Navbar />
        <div className="uprofileContents">
          <h1>Profile</h1>
          <div className="profile">
            <img src={profileimg} className="profileImg" alt="Profile icon" onChange={(e) => setProfile(e.target.value)}/>
          </div>
          <div className='box'>
            <label htmlFor="roomImage">Full Name: </label>
            <input type="text" placeholder='Fullname' value={fullname} onChange={(e) => setFullname(e.target.value)} readOnly/>
          </div>
          <div className='box'>
            <label htmlFor="roomImage">Username: </label>
            <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} readOnly/>
          </div>
          <div className='box'>
            <label htmlFor="roomImage">Email: </label>
            <input className='box-email' type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} readOnly/>
            <p>This is your primary email address.</p>
          </div>
          <div className='box'>
          <label htmlFor="roomImage">Address: </label>
            <input className='box-address' type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} readOnly/>
          </div>
          <div className='box'>
            <label htmlFor="roomImage">Phone Number: </label>
            <input type="text" placeholder='Phone Number' value={phonenum} onChange={(e) => setPhoneNum(e.target.value)} readOnly/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Uprofile;