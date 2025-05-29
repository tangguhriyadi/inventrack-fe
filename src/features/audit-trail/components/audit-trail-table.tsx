"use client";

import { useState } from "react";
import { OrderBy, QueryParams } from "../../../types/query-params";
import { Card, SelectProps, TableProps } from "antd";
import { AuditTrailSchema } from "../schema/audit-trail.schema";
import dayjs from "dayjs";
import CoreSelect from "../../../components/form/select/select";
import CoreTable from "../../../components/table/table";
import useAuditTrailList from "../hooks/use-audit-trail-list";

const AuditrailTable = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: 10,
    page: 1,
    order_by: OrderBy.DESC,
    keyword: "",
    sort_by: "created_at",
  });
  const listHook = useAuditTrailList(queryParams);

  const columns: TableProps<AuditTrailSchema>["columns"] = [
    {
      title: "Name",
      dataIndex: "user_name",
      key: "user_name",
      sorter: (a, b) => b.user_name.localeCompare(a.user_name),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      sorter: (a, b) => b.action.localeCompare(a.action),
      render: (value) => <div className="text-accent font-bold">{value}</div>,
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) =>
        dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf(),
      render: (value) => <>{dayjs(value).format("DD/MM/YYYY HH:mm")}</>,
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
      render: (_, records) => (
        <>{records.inventory ? records.inventory : "-"}</>
      ),
    },
  ];

  const orderByOptions: SelectProps["options"] = Object.values(OrderBy).map(
    (order) => ({
      label: order === OrderBy.ASC ? "Oldest" : "Newest",
      value: order,
    }),
  );

  return (
    <Card>
      <div className="flex items-center gap-x-4 mb-4">
        <div className="w-full flex justify-between gap-x-4">
          <CoreSelect
            label="Sort by"
            onChange={(val) =>
              setQueryParams((prev) => ({ ...prev, order_by: val }))
            }
            value={queryParams.order_by}
            options={orderByOptions}
          />
          <div className="w-full" />
          <div className="w-full" />
        </div>
      </div>
      <CoreTable<AuditTrailSchema>
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

export default AuditrailTable;
