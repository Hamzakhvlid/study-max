import React, { useEffect, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../../redux/Slices/ordrSlice';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function DonutChart({ dateRange }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.orders.data);

  useEffect(() => {
    dispatch(fetchOrder(dateRange));
  }, [dispatch]);

  const topProducts = useMemo(() => {
    const productCount = {};

    state?.data?.forEach(order => {
      order.orderItems.forEach(item => {
        if (productCount[item.name]) {
          productCount[item.name] += 1;
        } else {
          productCount[item.name] = 1;
        }
      });
    });

    // Convert the object to an array, sort, and slice the top 5
    return Object.entries(productCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  }, [state?.data]);

  const data = {
    labels: topProducts.map(product => product.name),
    datasets: [
      {
        label: 'Top 5 Products',
        data: topProducts.map(product => product.count),
        backgroundColor: ['#FFCD56', '#FF6384', '#36A2EB', '#FF9F40', '#4BC0C0'],
        hoverBackgroundColor: ['#FFCD56', '#FF6384', '#36A2EB', '#FF9F40', '#4BC0C0'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          margin: '8px',
          fontWeight: 'bold',
        }}
      >
        Top 5 Products
      </Typography>
      <Box
        sx={{
          position: "relative",
          mx: 1,
          width: '310px',
          height: '310px',
        }}
      >
        <Doughnut
          data={data}
          options={{
            plugins: {
              legend: {
                display: true,
                position: 'right',
                align: 'center',
                color: '#000',
                font: {
                  size: 12,
                },
              },
              tooltip: {
                backgroundColor: '#333',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                bodyColor: '#fff',
              },
              datalabels: {
                display: false,
                align: 'end',
                anchor: 'end',
                color: '#000',
                font: {
                  size: 12,
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
