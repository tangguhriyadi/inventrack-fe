"use client"; // if you're using App Router

import React from "react";
import ReactApexChart from "react-apexcharts";
import useTop10 from "../hooks/use-top10";

const BookingBarChart = () => {
  const top10hook = useTop10({});

  const chartSeries = [
    {
      name: "Bookings",
      data: top10hook.data?.data.results.map((d) => d.count) || [],
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <ReactApexChart
        options={{
          chart: {
            type: "bar",
          },
          title: {
            text: "Most Booked Items",
          },
          xaxis: {
            categories:
              top10hook.data?.data.results.map((d) => d.inventory_name) || [],
          },
        }}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BookingBarChart;
