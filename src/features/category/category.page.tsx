"use client";

import React from "react";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormMode } from "../../enums/form.enum";
import { useCategoryStore } from "./store/category.store";
import CategoryTable from "./components/category-table";
import CategoryFormModal from "./components/category-form-modal";

const CategoryPage = () => {
  const { open } = useCategoryStore();
  return (
    <>
      <div className="flex gap-x-2 justify-between items-center !mb-6">
        <Typography.Title className="!mb-0" level={4}>
          Inventory Category
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
      <CategoryTable />
      <CategoryFormModal />
    </>
  );
};

export default CategoryPage;
