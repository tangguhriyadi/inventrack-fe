"use client";

import React from "react";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormMode } from "../../enums/form.enum";
import InventoryTable from "./components/inventory-table";
import { useInventoryStore } from "./store/inventory-store";
import InventoryFormModal from "./components/inventory-form-modal";

const Inventorypage = () => {
  const { open } = useInventoryStore();
  return (
    <>
      <div className="flex gap-x-2 justify-between items-center !mb-6">
        <Typography.Title className="!mb-0" level={4}>
          Inventory Management
        </Typography.Title>
        <Button
          onClick={() => open(FormMode.Create)}
          type="primary"
          size="small"
          icon={<PlusOutlined />}
        >
          Add New
        </Button>
      </div>
      <InventoryTable />
      <InventoryFormModal />
    </>
  );
};

export default Inventorypage;
