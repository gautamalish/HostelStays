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
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from "react-toastify";
import { Alert } from "react-bootstrap";
// import 'react-toastify/dist/ReactToastify.css';
function New({ inputs, title }) {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [perc, setPerc] = useState(null);
  const [error,setError]=useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    // function to run when image is selected
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
  // function to run when the input fields changes
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };
  async function handleSubmit(e) {
    // preventing the default page reload
    e.preventDefault();
    // checking if fields are empty
    if (!data.password || !data.email || !data.phone || !data.address || !data.country || !data.username || !data.displayName) {
      setError("Please fill up all the fields")
      return;
    }
    // checking if password length is less than 6
    else if(data.password.length<6){
      setError("Password must be of atleast 6 characters long")
      return
    }
    try {
      // when it passes all the tests set the error to blank
      setError("")
      // creating user
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // setting it in the residents collection in firestore
      await setDoc(doc(db, "residents", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      // navigating back when the user is added
      navigate(-1);
      // generating the success toast
      toast.success('New user added', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    } catch (error) {
      // setting the errors if the adding fails
      if(error.code=="auth/invalid-email"){
        setError("Please use a valid email")
      }
      else{
        setError("Failed to create the user. Please try later")
      }
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
            {error && <Alert variant="danger" className="alert">{error}</Alert>}
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
              <div className="footer">
              
              <button type="submit" disabled={perc !== null && perc < 100}>
                Add
              </button>
              </div>
               
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
