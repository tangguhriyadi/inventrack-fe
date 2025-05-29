"use client";

import React from "react";
import dynamic from "next/dynamic";
import OverdueList from "./components/overdue-list";
const BookingBarChart = dynamic(() => import("./components/bar-chart"), {
  ssr: false,
});
const BookingBarChartByCategory = dynamic(
  () => import("./components/bar-char-category"),
  { ssr: false },
);

const DashboardAdminPage = () => {
  return (
    <div className="">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="flex flex-col gap-y-4">
        <BookingBarChart />
        <BookingBarChartByCategory />
        <OverdueList />
      </div>
    </div>
  );
};

export default DashboardAdminPage;
