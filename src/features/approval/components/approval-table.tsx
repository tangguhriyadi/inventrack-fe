"use client";

import React, { useEffect, useState } from "react";
import { Card, SelectProps, TableProps, Tag } from "antd";
import { OrderBy, QueryParams } from "../../../types/query-params";
import { useDebounce } from "../../../hooks/use-debounce";
import SearchBox from "../../../components/form/input/search-box";
import CoreSelect from "../../../components/form/select/select";
import CoreTable from "../../../components/table/table";
import dayjs from "dayjs";
import useCategoryDropdown from "../../category/hooks/use-category-dropdown";
import BookingStatus from "../../../enums/booking-status.enum";
import { COLORS } from "../../../../tailwind.config";
import useBookingList from "../../booking/hooks/use-list-booking";
import { BookingSchema } from "../../booking/schema/booking.schema";
import CoreTableAction from "../../../components/table/table-action";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useApprovalStore } from "../store/approval-store";
import { useModalDialog } from "../../../providers/modal-dialog.provider";
import useApproveBooking from "../hooks/use-approve";

const ApprovalTable = () => {
  const { open } = useApprovalStore();
  const [search, setSearch] = useState<string>("");
  const searchDebounceValue = useDebounce({ value: search });
  const { openModalDialogBar } = useModalDialog();

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
  const categoryDropdownHook = useCategoryDropdown();
  const colorMapping: Record<BookingStatus, string> = {
    [BookingStatus.Approved]: COLORS.success.DEFAULT,
    [BookingStatus.Pending]: COLORS.warning.DEFAULT,
    [BookingStatus.Rejected]: COLORS.error.DEFAULT,
    [BookingStatus.Returned]: COLORS.info.DEFAULT,
  };

  const approveHook = useApproveBooking();

  const handleApprove = (id: string) => {
    openModalDialogBar({
      title: "Booking Approval",
      message: "Are you sure want to approve this booking ?",
      type: "warning",
      okText: "Submit",
      onOk: async () => await approveHook.mutateAsync(id),
      cancelText: "Cancel",
      isLoading: approveHook.isPending,
    });
  };

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
    // {
    //   title: "Created Date",
    //   dataIndex: "created_at",
    //   key: "created_at",
    //   sorter: (a, b) =>
    //     dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf(),
    //   render: (value) => <>{dayjs(value).format("DD/MM/YYYY HH:mm")}</>,
    // },
    {
      title: "Booking Date",
      dataIndex: "booking_at",
      key: "booking_at",
      sorter: (a, b) =>
        dayjs(a.booking_at).valueOf() - dayjs(b.booking_at).valueOf(),
      render: (value) => <>{dayjs(value).format("DD/MM/YYYY HH:mm")}</>,
    },
    {
      title: "Plan Return Date",
      dataIndex: "plan_return_at",
      key: "plan_return_at",
      sorter: (a, b) =>
        dayjs(a.plan_return_at).valueOf() - dayjs(b.plan_return_at).valueOf(),
      render: (value) => <>{dayjs(value).format("DD/MM/YYYY HH:mm")}</>,
    },
    {
      title: "Actual Returned Date",
      dataIndex: "returned_at",
      key: "returned_at",
      sorter: (a, b) =>
        dayjs(a.returned_at).valueOf() - dayjs(b.returned_at).valueOf(),
      render: (value) => (
        <>{value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "-"}</>
      ),
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 80,
      render: (_, records) => (
        <CoreTableAction
          items={[
            {
              label: "Approve",
              key: "1",
              onClick: () => handleApprove(records.id),
              icon: <CheckOutlined />,
              disabled: records.status !== BookingStatus.Pending,
            },
            {
              label: <p className="text-error">Reject</p>,
              key: "2",
              onClick: () => open(records.id),
              icon: <CloseOutlined className="!text-error" />,
              disabled: records.status !== BookingStatus.Pending,
            },
          ]}
        />
      ),
    },
  ];

  const orderByOptions: SelectProps["options"] = Object.values(OrderBy).map(
    (order) => ({
      label: order === OrderBy.ASC ? "Oldest" : "Newest",
      value: order,
    }),
  );

  const categoryOptions: SelectProps["options"] = [
    { label: "All Category", value: "all" },
    ...(categoryDropdownHook.data || []),
  ];

  const statusOptions: SelectProps["options"] = Object.values(
    BookingStatus,
  ).map((order) => ({
    label: order,
    value: order,
  }));

  useEffect(() => {
    setQueryParams((prev) => ({ ...prev, keyword: searchDebounceValue }));
  }, [searchDebounceValue]);

  return (
    <Card>
      <div className="flex items-center gap-x-4 mb-4">
        <SearchBox
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="!bg-gray-middle"
          placeholder="Search"
        />
        <div className="w-full flex justify-between gap-x-4">
          <CoreSelect
            label="Sort by"
            onChange={(val) =>
              setQueryParams((prev) => ({ ...prev, order_by: val }))
            }
            value={queryParams.order_by}
            options={orderByOptions}
          />
          <CoreSelect
            label="Category"
            onChange={(val) => {
              if (val !== "all") {
                setQueryParams((prev) => ({ ...prev, category_id: val }));
              } else {
                setQueryParams((prev) => ({ ...prev, category_id: undefined }));
              }
            }}
            value={queryParams.category_id ?? "all"}
            options={categoryOptions}
          />

          <CoreSelect
            label="Status"
            onChange={(val) => {
              if (val !== "all") {
                setQueryParams((prev) => ({ ...prev, status: val }));
              } else {
                setQueryParams((prev) => ({ ...prev, status: undefined }));
              }
            }}
            value={queryParams.status ?? "all"}
            options={[{ label: "All Status", value: "all" }, ...statusOptions]}
          />
        </div>
      </div>
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
    </Card>
  );
};

export default ApprovalTable;
