import React, { useEffect, useState } from "react";
import "./widgets.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import BedroomChildOutlinedIcon from "@mui/icons-material/BedroomChildOutlined";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../context/firebase.js";
function Widget({ type }) {
  let data;
  const [amount, setAmount] = React.useState(null);
  const [totalPaid, setTotalPaid] = useState(null);
  const [diff, setDiff] = React.useState(null);
  const[emptyRooms,setEmptyRooms]=useState(null);

  switch (type) {
    case "user":
      data = {
        title: "Total Tenants",
        isMoney: false,
        query: "residents",
        link: (
          <Link
            to="/tenants"
            className="tenantsLink"
            style={{ textDecoration: "none" }}
          >
            See all Residents
          </Link>
        ),
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      // amount = 35;
      break;
    case "balance":
      data = {
        title: "Total Paid Tenants",
        isMoney: false,
        query: "Transaction",
        link: (
          <Link
            to="/table"
            className="tenantsLink"
            style={{ textDecoration: "none" }}
          >
            See details
          </Link>
        ),
        icon: (
          <AccountBalanceOutlinedIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
          />
        ),
      };
      break;

    case "order":
      data = {
        title: "Total Rooms",
        isMoney: false,
        query: "Room",
        link: (
          <Link
            to="/rooms"
            className="roomsLink"
            style={{ textDecoration: "none" }}
          >
            View all Rooms
          </Link>
        ),
        icon: (
          <BedroomChildOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };
      // amount = 25;
      break;
    case "earning":
      data = {
        title: "Available Rooms",
        isMoney: false,
        query: "Room",
        link: "View Available Rooms",
        icon: (
          <BedroomChildOutlinedIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          />
        ),
      };
      // amount = 10;
      break;
    default:
      break;
  }
  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));
      const lastMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );
      const lastMonthUsersData = await getDocs(lastMonthQuery);
      const prevMonthUsersData = await getDocs(prevMonthQuery);
      const totalUsers = query(collection(db, data.query));
      const totalPaid = query(
        collection(db, data.query),
        where("status", "==", "Paid")
      );
      const availableRooms = query(
        collection(db, data.query),
        where("Status", "==", "Not Occupied")
      );
      const totalAvailableRooms=await getDocs(availableRooms)
      const totalUsersData = await getDocs(totalUsers);
      const totalPaidData = await getDocs(totalPaid);
      setEmptyRooms(totalAvailableRooms.docs.length)
      setTotalPaid(totalPaidData.docs.length);
      setAmount(totalUsersData.docs.length);
      if (prevMonthUsersData.docs.length != 0) {
        setDiff(
          ((lastMonthUsersData.docs.length - prevMonthUsersData.docs.length) /
            prevMonthUsersData.docs.length) *
            100
        );
      } else {
        setDiff(
          (lastMonthUsersData.docs.length - prevMonthUsersData.docs.length) *
            100
        );
      }
    };
    fetchData();
  }, []);
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"}
          {data.query == "Transaction" ? totalPaid:data.title=="Available Rooms"?emptyRooms:amount}
          {/* Use the amount variable here */}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          {(data.query!="Room" && data.query!="Transaction") && <KeyboardArrowUpOutlinedIcon />}
          {(data.query!="Room" && data.query!="Transaction") && `${diff}%`}
        </div>
        {data.icon}
      </div>
    </div>
  );
}

export default Widget;
