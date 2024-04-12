import React from "react";
import "./widgets.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import BedroomChildOutlinedIcon from "@mui/icons-material/BedroomChildOutlined";

function Widget({ type }) {
  let data;
  let amount; // Define amount variable

  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "Total Students",
        isMoney: false,
        link: "See all Students",
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      amount = 35;
      break;
    case "balance":
      data = {
        title: "Total Paid students",
        isMoney: false,
        link: "See details",
        icon: (
          <AccountBalanceOutlinedIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
          />
        ),
      };
      amount = 20;
      break;
    case "order":
      data = {
        title: "Total Rooms",
        isMoney: false,
        link: "View all Rooms",
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
      amount = 25;
      break;
    case "earning":
      data = {
        title: "Available Rooms",
        isMoney: false,
        link: "View Available Rooms",
        icon: (
          <BedroomChildOutlinedIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          />
        ),
      };
      amount = 10;
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"}
          {amount} {/* Use the amount variable here */}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpOutlinedIcon />
          {`${diff}%`}
        </div>
        {data.icon}
      </div>
    </div>
  );
}

export default Widget;
