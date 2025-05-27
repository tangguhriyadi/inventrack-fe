import React from "react";
import Image from "next/image";
import HeaderInfo from "./header-info";
import Notification from "@/features/notification/notification";
import Link from "next/link";
import { ROUTES } from "@/configs/route.config";

const Header: React.FC = () => {
  return (
    <header className="!w-full bg-white flex gap-x-6 items-center justify-between h-[64px] max-h-[64px] px-[15px] z-20 shadow-[0px_2px_30px_rgba(146,153,184,0.063)]">
      <div className="flex w-full relative items-center">
        <Link href={ROUTES.DEFAULT}>
          <Image
            src="/dashboard-logo.png"
            width={76.69}
            height={32}
            alt="logo"
            style={{
              cursor: "pointer",
              height: "auto",
            }}
            priority
            className="min-w-[76.69px] !h-[32px]"
          />
        </Link>
        {/* <CollapsedTrigger /> */}
        {/* <SearchBar /> */}
      </div>
      <div className="flex gap-x-4 items-center">
        {/* <StoreButton /> */}
        {/* <Messages /> */}
        <Notification />
        <HeaderInfo />
      </div>
    </header>
  );
};

export default Header;
