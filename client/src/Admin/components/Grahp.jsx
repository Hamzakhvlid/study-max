import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const CustomLineChart = () => {
  const [data, setData] = useState([]);

  const state = useSelector((state) => state.orders.data);

  useEffect(() => {
    if (Array.isArray(state?.data)) {
      

      const getLast15Days = () => {
        const today = new Date();
        let dates = [];
        for (let i = 14; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
      };

      const last15Days = getLast15Days();

      // Aggregate data by date and status
      const dateMap = state.data.reduce((acc, order) => {
        const date = new Date(order.createdAt);
        if (isNaN(date.getTime())) {
          console.error("Invalid date:", order.createdAt);
          return acc;
        }

        const formattedDate = date.toISOString().split('T')[0];
        if (!last15Days.includes(formattedDate)) return acc;

        if (!acc[formattedDate]) {
          acc[formattedDate] = { Processing: 0, Shipped: 0, Unshipped: 0 };
        }

        if (order.orderStatus === 'Processing') {
          acc[formattedDate].Processing += 1;
        } else if (order.orderStatus === 'Shipped') {
          acc[formattedDate].Shipped += 1;
        } else if (order.orderStatus === 'Unshipped') {
          acc[formattedDate].Unshipped += 1;
        }

        return acc;
      }, {});

      const formattedData = last15Days.map(date => ({
        date: date,
        Processing: dateMap[date]?.Processing || 0,
        Shipped: dateMap[date]?.Shipped || 0,
        Unshipped: dateMap[date]?.Unshipped || 0
      }));



      setData(formattedData);
    }
  }, [state?.data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(date) => {
          const [year, month, day] = date.split('-');
          return `${day}-${month}`;
        }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Country" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="City" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Region" stroke="#ff7300" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
