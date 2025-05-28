"use client";

import React, { useEffect, useState } from "react";
import { useModalDialog } from "../../../providers/modal-dialog.provider";
import { Card, SelectProps, TableProps } from "antd";
import { OrderBy, QueryParams } from "../../../types/query-params";
import { useDebounce } from "../../../hooks/use-debounce";
import SearchBox from "../../../components/form/input/search-box";
import CoreSelect from "../../../components/form/select/select";
import CoreTable from "../../../components/table/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CoreTableAction from "../../../components/table/table-action";
import { FormMode } from "../../../enums/form.enum";
import { useCategoryStore } from "../store/category.store";
import useCategoryList from "../hooks/use-list-category";
import useDeleteCategory from "../hooks/use-delete-category";
import { CategorySchema } from "../schema/category.schema";
import dayjs from "dayjs";

const CategoryTable = () => {
  const { open } = useCategoryStore();
  const [search, setSearch] = useState<string>("");
  const searchDebounceValue = useDebounce({ value: search });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: 10,
    page: 1,
    order_by: OrderBy.DESC,
    keyword: "",
    sort_by: "created_at",
  });
  const listHook = useCategoryList(queryParams);
  const deleteHook = useDeleteCategory();

  const { openModalDialogBar } = useModalDialog();

  const handleClickDelete = async (id: string) => {
    openModalDialogBar({
      title: "Are you sure want to delete this category ?",
      message: "Data would not be restored once you delete it",
      type: "warning",
      okText: "Submit",
      onOk: async () => await deleteHook.mutateAsync(id),
      cancelText: "Cancel",
      isLoading: deleteHook.isPending,
    });
  };

  const columns: TableProps<CategorySchema>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => b.name.localeCompare(a.name),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (value) => <>{value?.name}</>,
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
      title: "Last Updated",
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: (a, b) =>
        dayjs(a.updated_at).valueOf() - dayjs(b.updated_at).valueOf(),
      render: (value) => <>{dayjs(value).format("DD/MM/YYYY HH:mm")}</>,
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
              label: "Edit",
              key: "1",
              onClick: () => open(FormMode.Update, records),
              icon: <EditOutlined />,
            },
            {
              label: <p className="text-error">Delete</p>,
              key: "2",
              onClick: () => handleClickDelete(records.id),
              icon: <DeleteOutlined className="!text-error" />,
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
          <div className="w-full" />
          <div className="w-full" />
        </div>
      </div>
      <CoreTable<CategorySchema>
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

export default CategoryTable;
