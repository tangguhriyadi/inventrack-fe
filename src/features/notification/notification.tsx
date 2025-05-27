"use client";

import { Badge, Popover, Typography } from "antd";
import Link from "next/link";
import React from "react";
import BellIcon from "@/components/icon/bell";
import NotificationItem, {
  NotificationItemProps,
} from "./components/notification-item";
import useAppLayoutStore from "../../store/app-layout";

const MOCK_DATA: NotificationItemProps[] = [];

const Notification: React.FC = () => {
  const { isHideSidebar } = useAppLayoutStore();

  const notificationContent = (
    <div className="w-[370px]">
      <div className="flex justify-center gap-x-2 items-center py-5 px-[25px] rounded-lg bg-gray-normal mb-3">
        <Typography.Title className="!mb-0" level={5}>
          Notifikasi
        </Typography.Title>
        {/* <Badge status="success" color={COLORS.success.DEFAULT} count={3} /> */}
      </div>
      {MOCK_DATA.length > 0 ? (
        <ul className="overflow-y-auto overflow-x-hidden sider-scroll max-h-[200px]">
          {MOCK_DATA.map((data, index) => (
            <li key={index}>
              <NotificationItem messages={data.messages} time={data.time} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center opacity-50">
          Kamu belum memiliki notifikasi.
        </div>
      )}
      <div
        className="inline-flex items-center justify-center text-[13px] font-medium relative w-[calc(100%+30px)] h-[calc(100% + 15px)] py-[15px] px-0 cursor-pointer bg-white left-[-15px] right-[-15px] bottom-[-15px] text-accent hover:bg-primary-hover hover:bg-opacity-[0.063]"
        // onClick={() => signOut()}
      >
        Lihat semua notifikasi
      </div>
    </div>
  );
  if (isHideSidebar) return null;
  return (
    <div className="flex items-center justify-center bg-surface-2 w-8 h-8 rounded-full">
      <div>
        <Popover
          placement="bottomLeft"
          content={notificationContent}
          trigger={"click"}
        >
          <Badge
            dot
            offset={[-10, 2]}
            status="error"
            style={{
              width: 8,
              height: 8,
              opacity: 0
            }}
          >
            <Link
              href="#"
              className="shadow-none text-black  hover:text-black px-2 !w-5 !h-5"
            >
              <BellIcon className="!text-[20px] !w-5 !h-5" />
            </Link>
          </Badge>
        </Popover>
      </div>
    </div>
  );
};

export default Notification;
