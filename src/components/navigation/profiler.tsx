"use client";

import { Flex } from "antd";
import React from "react";

const Profiler: React.FC = () => {
  return (
    <Flex gap={12} align="center">
      <Flex vertical justify="space-between">
        <p className="font-semibold text-[15px] leading-[18px]">John Cena</p>
        <p className="text-[#727385] font-normal text-[12px] leading-[14.4px]">
          Admin Nasional | 1234567890
        </p>
      </Flex>
      <div className="!w-10 !h-10 !rounded-lg !bg-[#182C61] flex justify-center items-center text-white font-bold">
        JC
      </div>
    </Flex>
  );
};

export default Profiler;
