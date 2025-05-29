"use client";

import React from "react";
import useOverdue from "../hooks/use-overdue";
import CoreTable from "../../../components/table/table";
import { TableProps, Tag } from "antd";
import { BookingSchema } from "../../booking/schema/booking.schema";
import dayjs from "dayjs";
import { COLORS } from "../../../../tailwind.config";

const OverdueList = () => {
  const overdueHook = useOverdue({});

  const columns: TableProps<BookingSchema>["columns"] = [
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
      render: (val, props) => <>{props.inventory.name}</>,
      sorter: (a, b) => {
        if (a.inventory.name && b.inventory.name) {
          return b.inventory.name.localeCompare(a.inventory.name);
        } else {
          return -1;
        }
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (val, props) => <>{props.inventory.inventoryCategory.name}</>,
    },
    {
      title: "Booking Date",
      dataIndex: "booking_at",
      key: "booking_at",
      render: (value) => <>{dayjs(value).format("DD/MM/YYYY HH:mm")}</>,
    },
    {
      title: "Plan Return Date",
      dataIndex: "plan_return_at",
      key: "plan_return_at",
      render: (value) => <>{dayjs(value).format("DD/MM/YYYY HH:mm")}</>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => {
        return (
          <div className="flex gap-x-1">
            <Tag color={COLORS.error.DEFAULT}>OVERDUE</Tag>
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="mb-2 font-bold">Overdue Items</h3>
      <CoreTable<BookingSchema>
        columns={columns}
        rowKey={(d) => d.id}
        pagination={false}
        dataSource={overdueHook?.data?.data?.results}
      />
    </div>
  );
};

export default OverdueList;
