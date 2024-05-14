import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../context/firebase";
import "./Notify.scss";

function Notify({ onClose }) {
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true); // State variable to control visibility

  const handleSave = async () => {
    if (note.trim() !== "") {
      try {
        // Add the note to Firestore
        const docRef = await addDoc(collection(db, "notifications"), {
          note,
          timestamp: new Date(),
        });
        console.log("Note added with ID: ", docRef.id);
        setMessage("Saved!");
        setNote(""); // Clear the input field after saving
        // Automatically close the Notify component after 2 seconds
        setTimeout(() => {
          setIsVisible(false); // Close the Notify component
        }, 2000);
      } catch (error) {
        console.error("Error adding note: ", error);
      }
    } else {
      setMessage("Please enter a note to save.");
    }
  };

  const handleCancel = () => {
    setIsVisible(false); // Close the Notify component
  };

  return (
    <>
      {isVisible && ( // Render the component only if isVisible is true
        <div className="notify-overlay">
          <div className="notifyContainer">
            <textarea
              className="noteInput"
              placeholder="Write your note here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <div className="button-group">
              <button className="saveButton" onClick={handleSave}>
                Send
              </button>
              <button className="cancelButton" onClick={handleCancel}>
                Cancel
              </button>
            </div>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default Notify;
