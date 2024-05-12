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
        let totalPaidAmount = 0;
        let lastMonthAmount = 0;
        const today = new Date();
        const currentMonth = today.getMonth(); // Get current month
        const currentYear = today.getFullYear(); // Get current year
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Calculate last month
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear; // Adjust year if current month is January

        querySnapshot.forEach((doc) => {
          const transactionData = doc.data();
          const transactionAmount = parseFloat(transactionData.amount);
          const transactionStatus = transactionData.status;

          // Check if the transaction is paid
          if (transactionStatus === "Paid") {
            totalPaidAmount += transactionAmount;

            const transactionDate = new Date(transactionData.date);
            const transactionMonth = transactionDate.getMonth();
            const transactionYear = transactionDate.getFullYear();

            // Check if transaction occurred in last month
            if (transactionMonth === lastMonth && transactionYear === lastMonthYear) {
              lastMonthAmount += transactionAmount;
            }
          }
        });

        setTotalRevenue(totalPaidAmount);
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
