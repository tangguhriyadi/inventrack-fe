"use client";

import React from "react";
import UserTable from "./components/user-table";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserFormModal from "./components/user-form-modal";
import { useUserStore } from "./store/user.store";
import { FormMode } from "../../enums/form.enum";
// import { useRouter } from "next/navigation";

const UserPage = () => {
  //   const router = useRouter();
  const { open } = useUserStore();
  return (
    <>
      <div className="flex gap-x-2 justify-between items-center !mb-6">
        <Typography.Title className="!mb-0" level={4}>
          User Management
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
      <UserTable />
      <UserFormModal />
    </>
  );
};

export default UserPage;
