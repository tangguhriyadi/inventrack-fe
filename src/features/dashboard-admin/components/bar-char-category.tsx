"use client"; // if you're using App Router

import React from "react";
import ReactApexChart from "react-apexcharts";
import useByCategory from "../hooks/use-by-category";

const BookingBarChartByCategory = () => {
  const top10hook = useByCategory({});

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
            text: "Total Booking by Category",
          },
          xaxis: {
            categories:
              top10hook.data?.data.results.map((d) => d.category_name) || [],
          },
        }}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BookingBarChartByCategory;
