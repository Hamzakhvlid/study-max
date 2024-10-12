import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const CustomBarChart = ({dateRange}) => {
  const [chartData, setChartData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const orders = useSelector((state) => state.orders.data);

  useEffect(() => {
    if (Array.isArray(orders?.data)) {

      const getLast3Months = () => {
        const today = new Date();
        const months = [];
        for (let i = 2; i >= 0; i--) {
          const date = new Date(today);
          date.setMonth(today.getMonth() - i);
          const yearMonth = date.toISOString().slice(0, 7); // Format as YYYY-MM
          months.push({
            yearMonth,
            displayMonth: new Date(date).toLocaleString('default', { month: 'short' })
          });
        }
        return months;
      };

      const last3Months = getLast3Months();

      // Aggregate total price data by month
      const monthMap = last3Months.reduce((acc, { yearMonth }) => {
        acc[yearMonth] = 0;
        return acc;
      }, {});

      // Calculate total revenue
      let total = 0;

      orders.data.forEach((order) => {
        const date = new Date(order.createdAt);
        const yearMonth = date.toISOString().slice(0, 7); // Format as YYYY-MM
        if (monthMap.hasOwnProperty(yearMonth) && order.orderStatus === 'Shipped') {
          monthMap[yearMonth] += order.totalPrice; // Sum totalPrice for shipped orders
          total += order.totalPrice; // Aggregate total price
        }
      });

      // Prepare data for the chart
      const formattedData = last3Months.map(({ yearMonth, displayMonth }) => ({
        name: displayMonth,
        totalPrice: monthMap[yearMonth] || 0
      }));

      setChartData(formattedData);
      setTotalRevenue(total); // Set total revenue
    }
  }, [orders]);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mx: 1, mt: 1 }}>Revenue</Typography>
        <Typography variant="body2" sx={{ mx: 1, mb: 1 }}>{totalRevenue.toLocaleString()} /Rs</Typography>
      </Box>
      <BarChart
        width={200}
        height={100}
        data={chartData}
        margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize="12px" />
        <YAxis fontSize="12px" />
        <Tooltip />
        <Bar
          dataKey="totalPrice"
          barSize={30}  // Adjust bar width
          radius={[10, 10, 0, 0]}  // Rounded corners
          fill="url(#gradient)"   // Gradient fill
        >
          <LabelList dataKey="totalPrice" position="top" fontSize="12px" />  {/* Display value labels */}
        </Bar>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#82ca9d" stopOpacity={0.8} />
          </linearGradient>
        </defs>
      </BarChart>
    </>
  );
};

export default CustomBarChart;
