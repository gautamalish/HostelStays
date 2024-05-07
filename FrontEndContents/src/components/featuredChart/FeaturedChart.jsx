import React, { useEffect, useState } from "react";
import "./FeaturedChart.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../context/firebase";

function FeaturedChart() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lastMonthRevenue, setLastMonthRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transaction"));
        let totalAmount = 0;
        let lastMonthAmount = 0;
        const today = new Date();
        const lastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        const lastMonthName = lastMonth.toLocaleString("default", {
          month: "long",
        });

        querySnapshot.forEach((doc) => {
          const transactionData = doc.data();
          const transactionAmount = parseFloat(transactionData.amount);
          totalAmount += transactionAmount;

          const transactionDate = transactionData.date.split(" ");
          const transactionMonth = transactionDate[1];

          if (transactionMonth === lastMonthName) {
            lastMonthAmount += transactionAmount;
          }
        });

        setTotalRevenue(totalAmount);
        setLastMonthRevenue(lastMonthAmount);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={totalRevenue}
            text={`${totalRevenue}`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Last Month's Transaction</p>
        <p className="amount">Rs {lastMonthRevenue}</p>
      </div>
    </div>
  );
}

export default FeaturedChart;
