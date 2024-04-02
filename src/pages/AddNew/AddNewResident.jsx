import React, { useEffect, useState } from "react";
import "./addNew.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DriveFolderUploadOutlined, UploadFile } from "@mui/icons-material";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../context/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
function New({ inputs, title }) {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [perc, setPerc] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    console.log(data);
    setData({ ...data, [id]: value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (!data.password) {
      console.log("Password is missing");
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "residents", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
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
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
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
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {inputs.map((input) => {
                return (
                  <div className="formInput" key={input.id}>
                    <label htmlFor="">{input.label}</label>
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                      onChange={handleInput}
                    />
                  </div>
                );
              })}

              <button type="submit" disabled={perc !== null && perc < 100}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
