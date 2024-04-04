import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Number of customers',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [2,5,3,5,2,3,4,3,5,2,3,2],
      borderColor: 'rgba(0, 156, 166, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export default function LineChart() {
  return <Line options={options} data={data} />;
}
