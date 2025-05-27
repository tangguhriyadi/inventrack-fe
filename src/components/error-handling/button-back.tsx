"use client";

import { SwapLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonBack = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} icon={<SwapLeftOutlined />}>
      Go back
    </Button>
  );
};

export default ButtonBack;
