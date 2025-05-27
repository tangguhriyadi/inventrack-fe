"use client";

import React from "react";
import useAppLayoutStore from "@/store/app-layout";
import ArrowRightLinearIcon from "../../icon/arrow-right-linear";

const CollapsedTrigger = () => {
  const { toggleIsCollapsed, isCollapsed } = useAppLayoutStore();

  if (!isCollapsed) return null;

  return (
    <div
      onClick={() => toggleIsCollapsed()}
      style={{ transform: "translateY(175%)" }}
      className="cursor-pointer ml-[-25px] bg-white rounded-md w-6 h-6 flex justify-center text-primary-90"
    >
      <ArrowRightLinearIcon />
    </div>
  );
};

export default CollapsedTrigger;
