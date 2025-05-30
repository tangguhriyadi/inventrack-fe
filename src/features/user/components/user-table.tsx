"use client";

import React, { useEffect, useState } from "react";
import useUserList from "../hooks/use-list-user";
import useDeleteUser from "../hooks/use-delete-user";
import { useModalDialog } from "../../../providers/modal-dialog.provider";
import { Card, SelectProps, TableProps } from "antd";
import { OrderBy, QueryParams } from "../../../types/query-params";
import { useDebounce } from "../../../hooks/use-debounce";
import SearchBox from "../../../components/form/input/search-box";
import CoreSelect from "../../../components/form/select/select";
import CoreTable from "../../../components/table/table";
import { UserSchema } from "../schema/user.schema";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CoreTableAction from "../../../components/table/table-action";
import { FormMode } from "../../../enums/form.enum";
import { useUserStore } from "../store/user.store";
import dayjs from "dayjs";
import RoleEnum from "../../../enums/role.enum";

const UserTable = () => {
  const { open } = useUserStore();
  const [search, setSearch] = useState<string>("");
  const searchDebounceValue = useDebounce({ value: search });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: 10,
    page: 1,
    order_by: OrderBy.DESC,
    keyword: "",
    sort_by: "created_at",
    role: undefined,
  });
  const listHook = useUserList(queryParams);
  const deleteHook = useDeleteUser();

  const { openModalDialogBar } = useModalDialog();

  const handleClickDelete = async (id: string) => {
    openModalDialogBar({
      title: "Are you sure want to delete this user ?",
      message: "Data would not be restored once you delete it",
      type: "warning",
      okText: "Submit",
      onOk: async () => await deleteHook.mutateAsync(id),
      cancelText: "Cancel",
      isLoading: deleteHook.isPending,
    });
  };

  const columns: TableProps<UserSchema>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => b.name.localeCompare(a.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => b.email.localeCompare(a.email),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
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
  const roleOptions: SelectProps["options"] = Object.values(RoleEnum).map(
    (order) => ({
      label: order,
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
          <CoreSelect
            label="Role"
            onChange={(val) => {
              if (val !== "all") {
                setQueryParams((prev) => ({ ...prev, role: val }));
              } else {
                setQueryParams((prev) => ({ ...prev, role: undefined }));
              }
            }}
            value={queryParams.role ?? "all"}
            options={[{ label: "All Role", value: "all" }, ...roleOptions]}
          />
          <div className="w-full" />
        </div>
      </div>
      <CoreTable<UserSchema>
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

export default UserTable;
