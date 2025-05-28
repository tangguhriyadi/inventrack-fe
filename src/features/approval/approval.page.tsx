"use client";

import React from "react";
import { Typography } from "antd";
import RejectFormModal from "./components/reject-form-modal";
import ApprovalTable from "./components/approval-table";

const ApprovalPage = () => {
  return (
    <>
      <div className="flex gap-x-2 justify-between items-center !mb-6">
        <Typography.Title className="!mb-0" level={4}>
          Booking List
        </Typography.Title>
      </div>
      <ApprovalTable />
      <RejectFormModal />
    </>
  );
};

export default ApprovalPage;
