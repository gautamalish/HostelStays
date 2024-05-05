import React from "react";
import "./Chart.scss";
import { useEffect, useState } from "react";
import { db } from "../../context/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const Chart = ({ aspect, title }) => {
  // const query="residents"
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));
      const prevPrevMonth = new Date(new Date().setMonth(today.getMonth() - 3));

  
      const lastMonthQuery = query(
        collection(db, "residents"),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, "residents"),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );
      const prevPrevMonthQuery = query(
        collection(db, "residents"),
        where("timeStamp", "<=", prevMonth),
        where("timeStamp", ">", prevPrevMonth)
      );
      const lastMonthUsersData = await getDocs(lastMonthQuery);
      const prevMonthUsersData = await getDocs(prevMonthQuery);
      const prevPrevMonthUsersData = await getDocs(prevPrevMonthQuery);
      console.log(lastMonthUsersData.docs.length);
      const totalUsers = query(collection(db, "residents"));
      const totalUsersCount = await getDocs(totalUsers);
      const lastMonthUsersCount = lastMonthUsersData.docs.length;
      const prevMonthUsersCount = prevMonthUsersData.docs.length;
      const prevPrevMonthUsersCount = prevPrevMonthUsersData.docs.length;
      const data = [
        { name: months[today.getMonth()], Total:totalUsersCount.docs.length },
        { name: months[lastMonth.getMonth()], Total: lastMonthUsersCount },
        { name: months[prevMonth.getMonth()], Total: prevMonthUsersCount },
        { name: months[prevPrevMonth.getMonth()], Total: prevPrevMonthUsersCount },
      ];
      setChartData(data)
    };
    fetchData();
  }, []);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
