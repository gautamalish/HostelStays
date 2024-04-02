import React, { useState } from "react";
import "./addNew.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import {addDoc, collection, doc,serverTimestamp,setDoc} from "firebase/firestore"
import {auth,db } from "../../context/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
function New({ inputs, title }) {
  const [file,setFile]=useState("");
  const [data,setData]=useState({})
  const {currentUser}=useAuth()
  const handleInput=(e)=>{
    const id=e.target.id;
    const value=e.target.value
    console.log(data);
    setData({...data,[id]:value})
  }
  async function handleSubmit(e){
    e.preventDefault()
    if (!data.password) {
      console.log("Password is missing");
      return;
    }
    try{
      const res=await createUserWithEmailAndPassword(auth,data.email,data.password)
      await setDoc(doc(db, "residents",res.user.uid), {
        ...data,
        timeStamp:serverTimestamp()
      });
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file?URL.createObjectURL(file):"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              className="profileImg"
              alt="No image icon"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image:
                  <DriveFolderUploadOutlined className="icon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={e=>setFile(e.target.files[0])}/>
              </div>
              {inputs.map((input) => {
                return (
                  <div className="formInput" key={input.id}>
                    <label htmlFor="">{input.label}</label>
                    <input type={input.type} placeholder={input.placeholder} id={input.id} onChange={handleInput}/>
                  </div>
                );
              })}

              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;