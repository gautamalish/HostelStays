import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./settings.scss";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import { db, storage } from "../../context/firebase.js";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "react-bootstrap";
function Settings() {
  const { currentUser } = useAuth();
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    retypedNewPassword: "",
  });
  const [firebasePassword, setFirebasePassword] = useState("");
  const [error, setError] = useState("");
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const residentDocRef = doc(db, "residents", currentUser.uid);
      const userDocSnapshot = await getDoc(residentDocRef);
      const staffDocRef = doc(db, "staffs", currentUser.uid);
      const staffDocSnapshot = await getDoc(staffDocRef);
      const adminDocRef = doc(db, "Admin", currentUser.uid);
      const adminDocSnapshot = await getDoc(adminDocRef);
      if (userDocSnapshot.exists()) {
        setUsername(userDocSnapshot.data().username);
        setCountry(userDocSnapshot.data().country);
        setAddress(userDocSnapshot.data().address);
        setFirebasePassword(userDocSnapshot.data().password);
        setUserImage(userDocSnapshot.data().img);
      } else if (staffDocSnapshot.exists()) {
        setUsername(staffDocSnapshot.data().username);
        setCountry(staffDocSnapshot.data().country);
        setAddress(staffDocSnapshot.data().address);
        setFirebasePassword(staffDocSnapshot.data().password);
        setUserImage(staffDocSnapshot.data().img);
      } else if (adminDocSnapshot.exists()) {
        setUsername(adminDocSnapshot.data().username);
        setCountry(adminDocSnapshot.data().country);
        setAddress(adminDocSnapshot.data().address);
        setFirebasePassword(adminDocSnapshot.data().password);
        setUserImage(adminDocSnapshot.data().img);
      } else {
        console.log("User document not found");
      }
    }
    if (currentUser) {
      getUser();
    }
  }, []);

  async function handleEdit() {
    console.log(currentUser);
    if (passwords.newPassword != "") {
      if (firebasePassword !== passwords.currentPassword) {
        setError(
          "Your current password doesn't match our data. Please try again"
        );
        return;
      }
      if (passwords.newPassword !== passwords.retypedNewPassword) {
        setError("Passwords do not match");
        return;
      } else {
        try {
          const credential = EmailAuthProvider.credential(
            currentUser.email,
            passwords.currentPassword
          );
          await reauthenticateWithCredential(currentUser, credential);
          await updatePassword(currentUser, passwords.newPassword);
          let userRef;
          if (residentSnapshot.exists()) {
            userRef = doc(db, "residents", currentUser.uid);
          } else if (staffSnapshot.exists()) {
            userRef = doc(db, "staffs", currentUser.uid);
          } else if (adminDocSnapshot.exists()) {
            userRef = doc(db, "Admin", currentUser.uid);
          }
          const residentSnapshot = await getDoc(userRef);
          const staffSnapshot = await getDoc(userRef);
          const adminDocSnapshot = await getDoc(userRef);

          if (residentSnapshot.exists()) {
            await updateDoc(userRef, {
              password: passwords.newPassword,
              username: username,
              country: country,
              address: address,
            });
            setError("");
            handleImageEdit();
            toast.success("Saved Changes", {
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
            navigate(-1);
          } else if (staffSnapshot.exists()) {
            await updateDoc(userRef, {
              password: passwords.newPassword,
              username: username,
              country: country,
              address: address,
            });
            toast.success("Saved Changes", {
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
            navigate(-1);
          } else if (adminDocSnapshot.exists()) {
            await updateDoc(userRef, {
              password: passwords.newPassword,
              username: username,
              country: country,
              address: address,
            });
            toast.success("Saved Changes", {
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
            navigate(-1);
          } else {
            setError("User document not found.");
            console.log("User document not found.");
            return;
          }
        } catch (error) {
          setError("Error updating");
          console.log(error);
        }
      }
    } else if (passwords.newPassword == "") {
      try {
        const userRef = doc(db, "residents", currentUser.uid);
        const staffRef = doc(db, "staffs", currentUser.uid);
        const adminDocRef = doc(db, "Admin", currentUser.uid);
        const adminDocSnapshot = await getDoc(adminDocRef);
        const residentSnapshot = await getDoc(userRef);
        const staffSnapshot = await getDoc(staffRef);
        handleImageEdit();
        setError("");
        if (residentSnapshot.exists()) {
          await updateDoc(userRef, {
            username: username,
            country: country,
            address: address,
          });
          toast.success("Saved Changes", {
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
          navigate(-1);
        } else if (staffSnapshot.exists()) {
          await updateDoc(staffRef, {
            username: username,
            country: country,
            address: address,
          });
          toast.success("Saved Changes", {
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
          navigate(-1);
        } else if (adminDocSnapshot.exists()) {
          await updateDoc(adminDocRef, {
            username: username,
            country: country,
            address: address,
          });
          toast.success("Saved Changes", {
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
          navigate(-1);
        } else {
          setError("User document not found.");
          console.log("User document not found.");
          return;
        }
      } catch (error) {
        setError("Error updating");
        console.log(error);
      }
    } else {
      navigate(-1);
    }
    function handleImageEdit() {
      if (file) {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error("Error uploading image:", error);
            // Display an error toast if there's an issue with the upload
            toast.error("Error uploading image. Please try again.", {
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
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              const residentDocRef = doc(db, "residents", currentUser.uid);
              const residentSnapshot = await getDoc(residentDocRef);
              const staffDocRef = doc(db, "staffs", currentUser.uid);
              const staffSnapshot = await getDoc(staffDocRef);
              const adminDocRef = doc(db, "Admin", currentUser.uid);
              const adminDocSnapshot = await getDoc(adminDocRef);
              let userRef;
              if (residentSnapshot.exists()) {
                userRef = doc(db, "residents", currentUser.uid);
              } else if (staffSnapshot.exists()) {
                userRef = doc(db, "staffs", currentUser.uid);
              } else if (adminDocSnapshot.exists()) {
                userRef = doc(db, "Admin", currentUser.uid);
              }
              await updateDoc(userRef, { img: downloadURL });
            } catch (error) {
              console.error("Error getting download URL:", error);
              // Display an error toast if there's an issue with getting the download URL
              toast.error("Error updating profile picture. Please try again.", {
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
            }
          }
        );
      }
    }
  }
  function handlePassword(event) {
    setPasswords((prevPasswords) => {
      return { ...prevPasswords, [event.target.name]: event.target.value };
    });
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
                  name="currentPassword"
                  onChange={handlePassword}
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
                  name="newPassword"
                  onChange={handlePassword}
                />
              </div>
              <div className="newPasswordDiv">
                <label htmlFor="retypedPassword" style={{ fontWeight: "bold" }}>
                  Re-type New Password:
                </label>
                <input
                  type="text"
                  id="retypedPassword"
                  className="password"
                  placeholder="Re-type New Password"
                  name="retypedNewPassword"
                  onChange={handlePassword}
                />
              </div>
              <div className="countryDiv">
                <label htmlFor="country" style={{ fontWeight: "bold" }}>
                  Country:
                </label>
                <input
                  type="text"
                  id="country"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="addressDiv">
                <label htmlFor="address" style={{ fontWeight: "bold" }}>
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="submitDiv">
                <button className="submitBtn" onClick={handleEdit}>
                  Submit
                </button>
              </div>
            </div>
            <div className="right">
              <img
                src={file ? URL.createObjectURL(file) : userImage}
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
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {error && (
                <Alert variant="danger" className="alert">
                  {error}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
