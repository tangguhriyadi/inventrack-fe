"use client";

import React from "react";
import BoxIcon from "@/components/icon/box";
import UsersIcon from "@/components/icon/users";
import WalletIcon from "@/components/icon/wallet";
import TypographyUtils from "@/utils/typography";
import useSummaryWidget from "@/features/pesanan/hooks/use-summary-widget";
import { Card, Divider, Progress, Skeleton } from "antd";
import { SummaryWidgetSchema } from "@/features/pesanan/schema/summary-widget";
import { COLORS } from "../../../../tailwind.config";
import ArrowLeftLinearIcon from "../../../components/icon/arrow-left-linear";
import BillIcon from "../../../components/icon/bill";

const SummaryWidget = () => {
  const { data: summaryWidget, isLoading } = useSummaryWidget();
  const records = (summaryWidget?.data ?? {}) as Partial<SummaryWidgetSchema>;

  return (
    <Card
      styles={{
        body: {
          padding: 24,
        },
      }}
      className="h-fit w-[32.5%] flex flex-col gap-y-6 bg-white relative"
    >
      <div
        className="absolute flex justify-center left-[50%]"
        style={{ transform: "translate(-50%, 0%)" }}
      >
        <div className="relative">
          <Progress
            type="dashboard"
            gapDegree={190}
            strokeColor={COLORS.primary.DEFAULT}
            percent={
              isLoading ? 0 : records?.data?.total_pendapatan === 0 ? 0 : 70
            }
            showInfo={false}
            strokeWidth={7}
            size={250}
            trailColor={COLORS.primary[98]}
          />
          <div className="absolute top-7 left-7">
            <Progress
              type="dashboard"
              gapDegree={190}
              strokeColor={COLORS.accent.DEFAULT}
              percent={
                isLoading ? 0 : records?.data?.total_pendapatan === 0 ? 0 : 60
              }
              showInfo={false}
              strokeWidth={7}
              size={190}
              trailColor={COLORS.accent[98]}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-x-2 mt-[136px]">
        <WalletIcon className="!text-[16px] !w-4 !h-4 leading-5" />
        <div className="text-medium">Pendapatan hari ini</div>
      </div>
      <div className="flex justify-center mt-1">
        {isLoading ? (
          <Skeleton.Input active />
        ) : (
          <div className="text-4xl font-bold text-primary leading-[44px]">
            {TypographyUtils.formatRupiah(records?.data?.total_pendapatan ?? 0)}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-x-1 mt-1">
        {isLoading ? (
          <Skeleton.Input size="small" active />
        ) : (
          <div className="flex text-success items-center">
            <span>
              {TypographyUtils.formatRupiah(
                records?.data?.total_pendapatan ?? 0,
              )}
            </span>
            <ArrowLeftLinearIcon className="!text-[16px] !w-4 !h-4 rotate-90" />
          </div>
        )}
        {isLoading ? (
          <Skeleton.Input size="small" active />
        ) : (
          <div className="text-xs text-neutral-50">(Dibanding kemarin)</div>
        )}
      </div>
      <div className="flex justify-center gap-x-6 mt-9">
        <div className="flex gap-x-2 items-center">
          <div className="!h-2 !w-2 rounded-full bg-primary"></div>
          <div>Hari ini</div>
        </div>
        <div className="flex gap-x-2 items-center">
          <div className="h-2 !w-2 rounded-full bg-accent"></div>
          <div>Kemarin</div>
        </div>
      </div>
      <Divider className="!my-6" />
      <div className="flex flex-col gap-y-3 mt-[2px]">
        {isLoading ? (
          <Skeleton.Input
            className="w-full"
            style={{
              width: "100%",
            }}
            active
          />
        ) : (
          <div className="flex justify-between items-center text-lg text-neutral-50 leading-5">
            <div className="flex gap-x-2 items-center">
              <BoxIcon className="!text-[16px] !w-4 !h-4" />
              <div className="font-medium">Produk terjual</div>
            </div>
            <div className="font-semibold">{records.data?.total_produk}</div>
          </div>
        )}
        {isLoading ? (
          <Skeleton.Input
            className="w-full"
            style={{
              width: "100%",
            }}
            active
          />
        ) : (
          <div className="flex justify-between items-center text-lg text-neutral-50 leading-5">
            <div className="flex gap-x-2 items-center">
              <BillIcon className="!text-[16px] !w-4 !h-4" />
              <div className="font-medium">Jumlah transaksi</div>
            </div>
            <div className="font-semibold">{records.data?.total_transaksi}</div>
          </div>
        )}
        {isLoading ? (
          <Skeleton.Input
            className="w-full"
            style={{
              width: "100%",
            }}
            active
          />
        ) : (
          <div className="flex justify-between items-center text-lg text-neutral-50 leading-5">
            <div className="flex gap-x-2 items-center">
              <UsersIcon className="!text-[16px] !w-4 !h-4" />
              <div className="font-medium">Jumlah pengunjung</div>
            </div>
            <div className="font-semibold">
              {records.data?.total_pengunjung}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SummaryWidget;
