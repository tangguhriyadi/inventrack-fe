"use client";

import { Badge, Popover, Typography } from "antd";
import Link from "next/link";
import React from "react";
import BellIcon from "@/components/icon/bell";
import NotificationItem, {
  NotificationItemProps,
} from "./components/notification-item";
import useAppLayoutStore from "../../store/app-layout";
import { COLORS } from "../../../tailwind.config";
import useNotificationList from "./hooks/use-notification-list";
import { OrderBy } from "../../types/query-params";
import dayjs from "dayjs";
import useReadNotification from "./hooks/use-read-notification";

export function formatTimeDiffFromNow(date: string | Date): string {
  const now = dayjs();
  const given = dayjs(date);

  const diffInMinutes = now.diff(given, "minute");
  const diffInHours = now.diff(given, "hour");
  const diffInDays = now.diff(given, "day");

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else {
    return `${diffInDays}d`;
  }
}

const Notification: React.FC = () => {
  const { isHideSidebar } = useAppLayoutStore();

  const readNotif = useReadNotification();

  const { data } = useNotificationList({
    page: 1,
    limit: 30,
    order_by: OrderBy.DESC,
    sort_by: "created_at",
  });

  const notifData: NotificationItemProps[] = data
    ? data.data.results.map((d) => ({
        time: formatTimeDiffFromNow(d.created_at),
        messages: d.message,
        is_read: d.is_read,
      }))
    : [];

  const countUnread = data
    ? data.data.results.filter((d) => !d.is_read).length
    : 0;

  const notificationContent = (
    <div className="w-[370px]">
      <div className="flex justify-center gap-x-2 items-center py-5 px-[25px] rounded-lg bg-gray-normal mb-3">
        <Typography.Title className="!mb-0" level={5}>
          Notification
        </Typography.Title>
        {countUnread > 0 && (
          <Badge
            status="success"
            color={COLORS.success.DEFAULT}
            count={countUnread}
          />
        )}
      </div>
      {notifData.length > 0 ? (
        <ul className="overflow-y-auto overflow-x-hidden sider-scroll max-h-[200px]">
          {notifData.map((data, index) => (
            <li key={index}>
              <NotificationItem
                messages={data.messages}
                time={data.time}
                is_read={data.is_read}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center opacity-50">
          You dont have notifications.
        </div>
      )}
      {/* <div
        className="inline-flex items-center justify-center text-[13px] font-medium relative w-[calc(100%+30px)] h-[calc(100% + 15px)] py-[15px] px-0 cursor-pointer bg-white left-[-15px] right-[-15px] bottom-[-15px] text-accent hover:bg-primary-hover hover:bg-opacity-[0.063]"
        // onClick={() => signOut()}
      >
        View All
      </div> */}
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
          onOpenChange={(visible) => {
            if (!visible && countUnread > 0) {
              readNotif.mutate();
            }
          }}
        >
          <Badge
            // count={3}
            dot
            offset={[-10, 2]}
            status="error"
            style={{
              width: 8,
              height: 8,
              opacity: countUnread > 0 ? undefined : 0,
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
