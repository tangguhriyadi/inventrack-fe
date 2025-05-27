"use client";

import Image from "next/image";
import React from "react";
import useOrderStatus from "@/features/pesanan/hooks/use-order-status";
import { Skeleton } from "antd";

const statusList = [
  {
    label: "Belum Bayar",
    key: "BELUM_BAYAR",
    icon: "/status-1.png",
  },
  {
    label: "Perlu diproses",
    key: "PERLU_DIPROSES",
    icon: "/status-2.png",
  },
  {
    label: "Siap dikirim",
    key: "SIAP_DIKIRIM",
    icon: "/status-3.png",
  },
  {
    label: "Menunggu pickup",
    key: "MENUNGGU_PICKUP",
    icon: "/status-4.png",
  },
  {
    label: "Sedang dikirim",
    key: "DALAM_PENGIRIMAN",
    icon: "/status-5.png",
  },
  {
    label: "Selesai",
    key: "SELESAI",
    icon: "/status-6.png",
  },
  {
    label: "Retur",
    key: "PENGEMBALIAN_PEMBATALAN",
    icon: "/status-7.png",
  },
];

const OrderStatus = () => {
  const { data: orderStatus, isLoading } = useOrderStatus();

  return (
    <div
      className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-4"
      id="step3"
    >
      {isLoading
        ? statusList.map((_, index) => (
            <Skeleton.Input
              key={index}
              active
              className="!w-full !h-[100px] rounded-xl"
            />
          ))
        : statusList.map((item) => (
            <div
              key={item.key}
              className="py-2 px-4 rounded-xl bg-white flex flex-col gap-x-1 w-full"
            >
              <div className="flex flex-col gap-y-2">
                <div className="text-text-primary font-bold text-sm">
                  {item.label}
                </div>
                <div className="flex gap-x-3 items-center">
                  <div className="h-fit">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="font-medium text-[30px]">
                    {(
                      orderStatus?.data?.data as
                        | Record<string, number>
                        | undefined
                    )?.[item.key] ?? 0}
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default OrderStatus;
