"use client";

import React, { useEffect, useState } from "react";
import { useModalDialog } from "../../../providers/modal-dialog.provider";
import { Card, Image, SelectProps, TableProps, Tag } from "antd";
import { OrderBy, QueryParams } from "../../../types/query-params";
import { useDebounce } from "../../../hooks/use-debounce";
import SearchBox from "../../../components/form/input/search-box";
import CoreSelect from "../../../components/form/select/select";
import CoreTable from "../../../components/table/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CoreTableAction from "../../../components/table/table-action";
import { FormMode } from "../../../enums/form.enum";
import dayjs from "dayjs";
import { useInventoryStore } from "../store/inventory-store";
import useDeleteInventory from "../hooks/use-delete-inventory";
import { InventorySchema } from "../schema/inventory.schema";
import useInventoryList from "../hooks/use-list-inventory";
import useCategoryDropdown from "../../category/hooks/use-category-dropdown";
import { COLORS } from "../../../../tailwind.config";
import ConditionEnum from "../../../enums/condition.enum";

const InventoryTable = () => {
  const { open } = useInventoryStore();
  const [search, setSearch] = useState<string>("");
  const searchDebounceValue = useDebounce({ value: search });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    limit: 10,
    page: 1,
    order_by: OrderBy.DESC,
    keyword: "",
    sort_by: "created_at",
    category_id: undefined,
    condition: undefined,
  });
  const listHook = useInventoryList(queryParams);
  const deleteHook = useDeleteInventory();
  const categoryDropdownHook = useCategoryDropdown();

  const { openModalDialogBar } = useModalDialog();

  const handleClickDelete = async (id: string) => {
    openModalDialogBar({
      title: "Are you sure want to delete this inventory ?",
      message: "Data would not be restored once you delete it",
      type: "warning",
      okText: "Submit",
      onOk: async () => await deleteHook.mutateAsync(id),
      cancelText: "Cancel",
      isLoading: deleteHook.isPending,
    });
  };

  const colorMapping: Record<string, string> = {
    GOOD: COLORS.success.DEFAULT,
    NEW: COLORS.info.DEFAULT,
    WORN: COLORS.warning.DEFAULT,
  };

  const columns: TableProps<InventorySchema>["columns"] = [
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (val) => (
        <Image
          src={val}
          fallback="/default-product-image.png"
          width={32}
          height={32}
          alt="inv"
          preview
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => b.name.localeCompare(a.name),
    },
    {
      title: "Category",
      dataIndex: "inventoryCategory",
      key: "inventoryCategory",
      render: (val) => <>{val.name}</>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => b.quantity - a.quantity,
    },
    {
      title: "Availability",
      dataIndex: "is_available",
      key: "is_available",
      render: (val) => <>{val ? "YES" : "NO"}</>,
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      render: (value) => (
        <Tag color={colorMapping[value as string]}>{value}</Tag>
      ),
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
              disabled: records.condition === ConditionEnum.Worn,
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
  const conditionOptions: SelectProps["options"] = Object.values(
    ConditionEnum,
  ).map((order) => ({
    label: order,
    value: order,
  }));

  const categoryOptions: SelectProps["options"] = [
    { label: "All Category", value: "all" },
    ...(categoryDropdownHook.data || []),
  ];

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
            loading={categoryDropdownHook.isLoading}
          />

          <CoreSelect
            label="Condition"
            onChange={(val) => {
              if (val !== "all") {
                setQueryParams((prev) => ({ ...prev, condition: val }));
              } else {
                setQueryParams((prev) => ({ ...prev, condition: undefined }));
              }
            }}
            value={queryParams.condition ?? "all"}
            options={[
              { value: "all", label: "All Condition" },
              ...(conditionOptions || []),
            ]}
          />
        </div>
      </div>
      <CoreTable<InventorySchema>
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

export default InventoryTable;
