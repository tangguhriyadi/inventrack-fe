"use client";

import React from "react";
import useByStatus from "../hooks/use-by-status";
import ReactApexChart from "react-apexcharts";
import BookingStatus from "../../../enums/booking-status.enum";
import { COLORS } from "../../../../tailwind.config";
import { Empty, Skeleton } from "antd";

const Prichart = () => {
  const statusHook = useByStatus({});

  const colorMapping: Record<BookingStatus, string> = {
    [BookingStatus.Approved]: COLORS.success.DEFAULT,
    [BookingStatus.Pending]: COLORS.warning.DEFAULT,
    [BookingStatus.Rejected]: COLORS.error.DEFAULT,
    [BookingStatus.Returned]: COLORS.info.DEFAULT,
  };
  const labels = statusHook.data?.data.results.map((d) => d.status) || [];
  const series = statusHook.data?.data.results.map((d) => d.count) || [];
  const colors =
    statusHook.data?.data.results.map(
      (item) => colorMapping[item.status as BookingStatus],
    ) ?? undefined;

  return (
    <div className="bg-white rounded-2xl shadow p-4 h-fit min-w-[320px]">
      <h3 className="font-semibold mb-2">Booking by Status</h3>
      {statusHook.data &&
        !statusHook.isLoading &&
        statusHook.data?.data?.results.length > 0 && (
          <ReactApexChart
            type="pie"
            options={{
              chart: {
                type: "pie",
              },
              labels,
              colors, // Match to status
              legend: {
                position: "bottom",
              },
            }}
            series={series}
            height={300}
          />
        )}
      {statusHook.isLoading && <Skeleton.Avatar className="w-full" />}
      {!statusHook.isLoading && statusHook.data?.data?.results.length === 0 && (
        <Empty />
      )}
    </div>
  );
};

export default Prichart;
