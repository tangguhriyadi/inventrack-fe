"use client";

import React, { useState } from "react";
import { OrderBy, QueryParams } from "../../../types/query-params";
import BookingStatus from "../../../enums/booking-status.enum";
import { COLORS } from "../../../../tailwind.config";
import dayjs from "dayjs";
import { BookingSchema } from "../../booking/schema/booking.schema";
import { TableProps, Tag } from "antd";
import CoreTable from "../../../components/table/table";
import useBookingList from "../../booking/hooks/use-list-booking";

const DashboardTable = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: 10,
    page: 1,
    order_by: OrderBy.DESC,
    keyword: "",
    sort_by: "created_at",
    category_id: undefined,
    status: undefined,
  });
  const listHook = useBookingList(queryParams);

  const colorMapping: Record<BookingStatus, string> = {
    [BookingStatus.Approved]: COLORS.success.DEFAULT,
    [BookingStatus.Pending]: COLORS.warning.DEFAULT,
    [BookingStatus.Rejected]: COLORS.error.DEFAULT,
    [BookingStatus.Returned]: COLORS.info.DEFAULT,
  };

  const columns: TableProps<BookingSchema>["columns"] = [
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
      render: (val, props) => <>{props.inventory.name}</>,
    },

    {
      title: "Booking Date",
      dataIndex: "booking_at",
      key: "booking_at",
      render: (value) => <>{dayjs(value).format("DD/MM/YYYY HH:mm")}</>,
    },
    {
      title: "Return Date",
      dataIndex: "returned_at",
      key: "returned_at",
      render: (value) => (
        <>{value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "-"}</>
      ),
    },
    {
      title: "Reject Reason",
      dataIndex: "reject_reason",
      key: "reject_reason",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value, row) => {
        return (
          <div className="flex gap-x-1">
            <Tag color={colorMapping[value as BookingStatus]}>{value}</Tag>
            {row.plan_return_at &&
            row.status === BookingStatus.Approved &&
            dayjs(row.plan_return_at).valueOf() < dayjs().valueOf() ? (
              <Tag color={COLORS.error.DEFAULT}>OVERDUE</Tag>
            ) : null}
          </div>
        );
      },
    },
  ];
  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full h-fit">
      <h3 className="mb-2 font-semibold">Booking History</h3>
      <CoreTable<BookingSchema>
        dataSource={listHook.data?.data.results || []}
        loading={listHook.isLoading}
        columns={columns}
        pagination={{
          pageSize: queryParams.limit,
          current: listHook.data?.data.pagination?.page,
          total: listHook.data?.data.pagination?.total_data,
          onChange: (page) => setQueryParams((prev) => ({ ...prev, page })),
        }}
        rowKey={(row) => row.id}
      />
    </div>
  );
};

export default DashboardTable;
