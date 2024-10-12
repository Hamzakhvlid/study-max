import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const SimpleBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [totalShippedOrders, setTotalShippedOrders] = useState(0); // State to store total shipped orders

  const orders = useSelector((state) => state.orders.data);

  useEffect(() => {
    if (Array.isArray(orders?.data)) {
      // Helper function to get the last 3 months
      const getLast3Months = () => {
        const today = new Date();
        const months = [];
        for (let i = 2; i >= 0; i--) {
          const date = new Date(today);
          date.setMonth(today.getMonth() - i);
          const yearMonth = date.toISOString().slice(0, 7); // Format as YYYY-MM
          months.push({
            yearMonth,
            displayMonth: new Date(date).toLocaleString('default', { month: 'short' }) // Format as short month name
          });
        }
        return months;
      };

      const last3Months = getLast3Months();

      // Aggregate data by month
      const monthMap = last3Months.reduce((acc, { yearMonth }) => {
        acc[yearMonth] = 0;
        return acc;
      }, {});

      // Calculate total shipped orders
      let totalOrders = 0;

      orders.data.forEach((order) => {
        const date = new Date(order.createdAt);
        const yearMonth = date.toISOString().slice(0, 7); // Format as YYYY-MM
        if (monthMap.hasOwnProperty(yearMonth) && order.orderStatus === 'Shipped') {
          monthMap[yearMonth] += 1;
          totalOrders += 1; // Increment total shipped orders
        }
      });

      // Prepare data for the chart
      const formattedData = last3Months.map(({ yearMonth, displayMonth }) => ({
        month: displayMonth,
        order: monthMap[yearMonth] || 0
      }));

      setChartData(formattedData);
      setTotalShippedOrders(totalOrders); // Set total shipped orders
    }
  }, [orders]);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mx: 1, mt: 1 }}>Orders</Typography>
        <Typography variant="body2" sx={{ mx: 1, mb: 1 }}>{totalShippedOrders.toLocaleString()}</Typography>
      </Box>
      <BarChart
        width={200}
        height={100}
        data={chartData}
        margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" fontSize="12px" />
        <YAxis fontSize="12px" />
        <Tooltip />
        <Bar dataKey="order" radius={[10, 10, 0, 0]} fill="#8884d8" barSize={30}>
          <LabelList dataKey="order" position="top" fontSize="12px" />
        </Bar>
      </BarChart>
    </>
  );
};

export default SimpleBarChart;
