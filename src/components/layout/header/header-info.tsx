"use client";

import { Avatar, Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import SettingsIcon from "@/components/icon/serttings";
import LogoutIcon from "@/components/icon/logout";
import { signOut, useSession } from "next-auth/react";
import useLogout from "../../../features/login/hooks/use-logout";
import useAppLayoutStore from "../../../store/app-layout";

const HeaderInfo: React.FC = () => {
  const { isHideSidebar } = useAppLayoutStore();

  const logoutHook = useLogout(() => signOut());

  const { data } = useSession();

  const handleLogout = async () => {
    await logoutHook.mutateAsync();
  };

  const userContent = (
    <div className="max-w-[280px]">
      <figure className="flex gap-3 py-5 px-[25px] rounded-lg bg-gray-normal mb-3">
        <Image
          unoptimized
          className="object-cover rounded-full w-[46px] h-[46px]"
          width={46}
          height={46}
          src={"/profile-default.png"}
          alt=""
        />

        <figcaption>{data?.user.name}</figcaption>
      </figure>

      <div
        className="inline-flex items-center justify-center text-[13px] font-medium relative w-[calc(100%+30px)] h-[calc(100% + 15px)] py-[15px] px-0 cursor-pointer bg-gray-normal left-[-15px] right-[-15px] bottom-[-15px] text-gray hover:text-accent-hover"
        onClick={handleLogout}
      >
        <LogoutIcon className="w-[15px] h-[15px] mr-2" /> Sign Out
      </div>
    </div>
  );

  if (isHideSidebar) return null;

  return (
    <div className="flex items-center py-4">
      <div>
        <Popover
          placement="bottomRight"
          content={userContent}
          trigger={"click"}
        >
          <Link href="#" className="!text-primary shadow-none">
            <Avatar src={"/profile-default.png"} className="!w-10 !h-10" />
          </Link>
        </Popover>
      </div>
    </div>
  );
};

export default HeaderInfo;
