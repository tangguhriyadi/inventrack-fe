"use client";

import React from "react";
import dynamic from "next/dynamic";
import DashboardTable from "./components/dashboard-table";
const Piechart = dynamic(() => import("./components/pie-chart"), {
  ssr: false,
});
// const BookingBarChartByCategory = dynamic(
//   () => import("./components/bar-char-category"),
//   { ssr: false },
// );

const DashboardStaffPage = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Personal Dashboard</h1>
      <div className="flex gap-x-4">
        <DashboardTable />
        <Piechart />
      </div>
    </div>
  );
};

export default DashboardStaffPage;
