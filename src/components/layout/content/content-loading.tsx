"use client";

import { Spin } from "antd";
import React from "react";

const ContentLoading = () => {
  return (
    <div className="w-full min-h-[90vh] flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default ContentLoading;
