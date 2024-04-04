import React from 'react';
import Image from '../../component/image';
import Text from '../../common/Text';
import LineChart from '../../common/Chart/LineChart';

const staticTop = [
  {
    title: "Total Posts To-Date",
    countdata: "17",
    time: 'Since last week',
    percentage: '-0,10%'
  },
  {
    title: "Total Posts To-Date",
    countdata: "17",
    time: 'Since last week',
    percentage: '-0,10%'
  },
  {
    title: "Total Posts To-Date",
    countdata: "17",
    time: 'Since last week',
    percentage: '-0,10%'
  },
  {
    title: "Total Posts To-Date",
    countdata: "17",
    time: 'Since last week',
    percentage: '-0,10%'
  },
]

const todayCont = [
  {
    title: 'Free Coffee with Breakfast Entree',
    time: '6:00 am – 11:00 am',
    highlight: '121 Redeemed',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG'
  },
  {
    title: 'Free Coffee with Breakfast Entree',
    time: '6:00 am – 11:00 am',
    highlight: '121 Redeemed',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG'
  },
  {
    title: 'Free Coffee with Breakfast Entree',
    time: '6:00 am – 11:00 am',
    highlight: '121 Redeemed',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG'
  },
  {
    title: 'Free Coffee with Breakfast Entree',
    time: '6:00 am – 11:00 am',
    highlight: '121 Redeemed',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG'
  }
]

const DashboardContent = () => {
  return (
    <div className="md:mx-10 mx-5 my-5">
      <h3>Welcome Admin</h3>
    </div>
  );
};

export default DashboardContent;