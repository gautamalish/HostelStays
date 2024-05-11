import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../context/firebase";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Table.scss";
import { serverTimestamp } from "firebase/firestore";

const Tablefunc = () => {
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    RoomNo: "",
    date: "",
    amount: "",
    method: "",
    status: "",
    partialAmount: "",
  });
  const [residentNames, setResidentNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch resident names
        const residentsRef = collection(db, "residents");
        const residentsSnapshot = await getDocs(residentsRef);
        const names = residentsSnapshot.docs.map(doc => doc.data().displayName);
        setResidentNames(names);

        // Fetch transaction details
        const transactionsRef = collection(db, "Transaction");
        const transactionsSnapshot = await getDocs(transactionsRef);
        const transactionData = transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRows(transactionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddClick = async () => {
    // Check if any field except partialAmount is empty
    const isAnyFieldEmpty = Object.entries(formData).some(
      ([key, value]) => key !== "partialAmount" && value === ""
    );

    // If any field is empty, show an alert and don't proceed further
    if (isAnyFieldEmpty) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const timestamp = serverTimestamp(); // Get server timestamp here
      const docData = { ...formData, timeStamp: timestamp };
      const docRef = await addDoc(collection(db, "Transaction"), docData);
      console.log("Document written with ID: ", docRef.id);

      // Update the rows state to include the newly added document
      setRows((prevRows) => [...prevRows, { id: docRef.id, ...formData }]);

      // Reset the form data
      setFormData({
        Name: "",
        RoomNo: "",
        date: "",
        amount: "",
        method: "",
        status: "",
        partialAmount: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if (name === "Name") {
      try {
        const roomQuery = query(collection(db, "Room"), where("Occupied", "==", value));
        const roomSnapshot = await getDocs(roomQuery);
        if (!roomSnapshot.empty) {
          const roomDoc = roomSnapshot.docs[0];
          const roomData = roomDoc.data();
          setFormData((prevData) => ({
            ...prevData,
            RoomNo: roomData.Room,
          }));
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    }

    // For all fields except ID, update normally
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteClick = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmation) return;

    try {
      await deleteDoc(doc(db, "Transaction", id));
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleUpdateClick = async (id) => {
    // Find the row with the given id
    const rowToUpdate = rows.find((row) => row.id === id);
    if (!rowToUpdate) return;

    // Fill the form with the data from the row to update
    setFormData({
      Name: rowToUpdate.Name,
      RoomNo: rowToUpdate.RoomNo,
      date: rowToUpdate.date,
      amount: rowToUpdate.amount,
      method: rowToUpdate.method,
      status: rowToUpdate.status,
      partialAmount: rowToUpdate.partialAmount,
    });
  };

  return (
    <div>
      <div className="top-bar">
        <div className="top-bar-left">
          {/* Back arrow icon */}
          <Link to="/home">
            <ArrowBackIcon style={{ marginRight: "10px", cursor: "pointer" }} />
          </Link>
        </div>
        <div className="top-bar-right" style={{ marginRight: "10px" }}>
          <h1>Transaction Details</h1>
        </div>
      </div>
      <div className="form-container" style={{ padding: "10px" }}>
        {/* Dropdown for selecting resident name */}
        <select
          name="Name"
          value={formData.Name}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        >
          <option value="">Select Name</option>
          {residentNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        {/* Remaining input fields */}
        <input
          type="text"
          name="RoomNo"
          value={formData.RoomNo}
          placeholder="Room No"
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          name="amount"
          value={formData.amount}
          placeholder="Amount"
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          name="method"
          value={formData.method}
          placeholder="Method"
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        {/* Select dropdown for status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        >
          <option value="">Select Status</option>
          <option value="Paid">Paid</option>
          <option value="Partial">Partial</option>
          <option value="Pending">Pending</option>
        </select>
        {/* Render partialAmount input only when status is "Partial" */}
        {formData.status === "Partial" && (
          <input
            type="text"
            name="partialAmount"
            value={formData.partialAmount}
            placeholder="Partial Amount"
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
          className="add-button"
        >
          Add
        </Button>
      </div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Tenants ID</TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Room No.</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              <TableCell className="tableCell">Payment Method</TableCell>
              <TableCell className="tableCell">Status</TableCell>
              <TableCell className="tableCell">Pending</TableCell>
              <TableCell className="tableCell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">{row.Name}</TableCell>
                <TableCell className="tableCell">{row.RoomNo}</TableCell>
                <TableCell className="tableCell">
                  {row.status === "Pending" ? "-----" : row.date}
                </TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">
                  {row.status === "Pending" ? "-----" : row.method}
                </TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
                <TableCell className="tableCell">{row.partialAmount}</TableCell>
                <TableCell className="tableCell">
                  {/* Update button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateClick(row.id)}
                    style={{ marginRight: "5px" }}
                  >
                    Update
                  </Button>
                  {/* Delete button */}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tablefunc;
