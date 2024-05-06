import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../context/firebase";
import "./Table.scss";
const Tablefunc = () => {
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    Name: "",
    RoomNo: "",
    date: "",
    amount: "",
    method: "",
    status: "",
    partialAmount: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Transaction"));
      const fetchedRows = [];
      querySnapshot.forEach((doc) => {
        fetchedRows.push({ id: doc.id, ...doc.data() });
      });
      setRows(fetchedRows);
    };

    fetchData();
  }, []);

  const handleAddClick = async () => {
    // Check if any field is empty
    const isAnyFieldEmpty = Object.values(formData).some(
      (value) => value === ""
    );

    // If any field is empty, show an alert and don't proceed further
    if (isAnyFieldEmpty) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "Transaction"), formData);
      console.log("Document written with ID: ", docRef.id);
      setFormData({
        id: "",
        Name: "",
        RoomNo: "",
        date: "",
        amount: "",
        method: "",
        status: "",
        partialAmount: "",
      });
      fetchData(); // Assuming fetchData is defined elsewhere
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the status field is being changed
    if (name === "status") {
      // If status is "Pending", set Date and Payment Method to "-----"
      if (value === "Pending") {
        setFormData((prevData) => ({
          ...prevData,
          date: "-----",
          method: "-----",
          [name]: value,
        }));
      } else {
        // If status is not "Pending", reset Date and Payment Method
        setFormData((prevData) => ({
          ...prevData,
          date: "",
          method: "",
          [name]: value,
        }));
      }
    } else {
      // For other fields, update normally
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <div className="top-bar">
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Add
        </Button>
      </div>
      <div className="form-container">
        <input
          type="text"
          name="id"
          value={formData.id}
          placeholder="ID"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Name"
          value={formData.Name}
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="RoomNo"
          value={formData.RoomNo}
          placeholder="Room No"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="date"
          value={formData.date}
          placeholder="Date"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="amount"
          value={formData.amount}
          placeholder="Amount"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="method"
          value={formData.method}
          placeholder="Method"
          onChange={handleInputChange}
        />
        {/* Select dropdown for status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
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
          />
        )}
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
              <TableCell className="tableCell"></TableCell>
              {/* New column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">{row.Name}</TableCell>
                <TableCell className="tableCell">{row.RoomNo}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.method}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
                <TableCell className="tableCell">{row.partialAmount}</TableCell>
                {/* New cell */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tablefunc;
