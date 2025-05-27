"use client";

import Link from "next/link";
import React from "react";
import { ROUTES } from "@/configs/route.config";
import ShopIcon from "../../icon/shop";
import useAppLayoutStore from "../../../store/app-layout";
import { Button } from "antd";
import { useModalDialog } from "../../../providers/modal-dialog.provider";
import { useRouter } from "next/navigation";

const StoreButton = () => {
  const { isHideSidebar, breadcrumbItems } = useAppLayoutStore();

  const router = useRouter();

  const backRoute =
    breadcrumbItems && breadcrumbItems?.length > 0
      ? (breadcrumbItems[0].key as string)
      : ROUTES.DEFAULT;

  const { openModalDialogBar } = useModalDialog();

  const handleCancelClick = () => {
    openModalDialogBar({
      title: "Apa kamu yakin ?",
      message: "Apa kamu yakin ingin keluar dari halaman ini ?",
      type: "warning",
      onOk: () => router.push(backRoute),
    });
  };

  if (isHideSidebar) {
    return <Button onClick={handleCancelClick}>Batal</Button>;
  }

  return (
    <Link
      href={ROUTES.DEFAULT}
      className="flex gap-2 items-center px-3 h-8 bg-surface-2 !text-black w-fit text-sm rounded-[99px] min-w-[120px]"
    >
      <ShopIcon className="!text-[20px] !w-5 !h-5" />
      <div className="font-semibold text-sm ">Lihat toko</div>
    </Link>
  );
};

export default StoreButton;
