import React, { useState, useEffect } from "react";
import { db, auth } from "../../context/firebase";
import "./userDashboard.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  onSnapshot,
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ToastContainer } from "react-toastify";

function UserDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const email = user.email;
          const querySnapshot = await getDocs(
            query(collection(db, "residents"), where("email", "==", email))
          );
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserDisplayName(userData.displayName);
          } else {
            console.log("User document does not exist.");
          }
        } else {
          console.log("No user is currently signed in.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      }
    };

    const fetchNotifications = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const email = user.email;
          const userDocRef = doc(db, "residents", email);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserDisplayName(userData.displayName);
          } else {
            console.log("User document does not exist.");
          }
        } else {
          console.log("No user is currently signed in.");
        }
        const notificationsRef = collection(db, "notifications");
        const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
          const notificationData = snapshot.docs.map((doc) => {
            const data = doc.data();
            const date = data.timestamp.toDate();
            const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            return {
              id: doc.id,
              title: data.title,
              note: data.note,
              timestamp: formattedDate,
            };
          });
          notificationData.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          setNotifications(notificationData);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      }
    };

    fetchUserData();
    fetchNotifications();
  }, []);

  useEffect(() => {
    console.log("Authentication status:", auth.currentUser);
  }, []);

  return (
    <>
      <div className="userDashboard">
        <Sidebar />
        <div className="userDashboardContents">
          <Navbar />
          <div className="Welcome">
            <h2>Welcome back, {userDisplayName ? userDisplayName : "User"}</h2>
          </div>
          <div className="notificationList">
            <h3>Notifications:</h3>
            {error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <div>
                {notifications.length === 0 ? (
                  <p>No notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div key={notification.id} className="notification">
                      <p className="time">{notification.timestamp}</p>
                      <div className="content">
                        <h3>{notification.title}</h3>
                        <p className="note">{notification.note}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UserDashboard;
