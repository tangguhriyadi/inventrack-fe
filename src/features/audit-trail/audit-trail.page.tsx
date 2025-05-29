"use client";

import React from "react";
import { Typography } from "antd";
import AuditrailTable from "./components/audit-trail-table";

const AuditTrailPage = () => {
  return (
    <>
      <div className="flex gap-x-2 justify-between items-center !mb-6">
        <Typography.Title className="!mb-0" level={4}>
          User Logs
        </Typography.Title>
      </div>
      <AuditrailTable />
    </>
  );
};

export default AuditTrailPage;
