import React, { useState, useEffect } from "react";
import { db } from "../../context/firebase";
import "./userDashboard.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { onSnapshot, collection } from "firebase/firestore";

function UserDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notificationsRef = collection(db, "notifications");
        const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
          const notificationData = snapshot.docs.map((doc) => {
            const data = doc.data();
            const date = data.timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
            const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`; // Format date and time
            return {
              id: doc.id,
              title: data.title,
              note: data.note,
              timestamp: formattedDate,
            };
          });

          // Sort notifications array by timestamp in descending order
          notificationData.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );

          // Update state with sorted notifications
          setNotifications(notificationData);
        });
        return unsubscribe;
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="userDashboard">
      <Sidebar />
      <div className="userDashboardContents">
        <Navbar />
        <div className="notificationList">
          <h2>Notifications</h2>
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
  );
}

export default UserDashboard;
