"use client";

import { Button } from "antd";
import Image from "next/image";
import React from "react";
import { ROUTES } from "@/configs/route.config";
import Link from "next/link";
import useProfileStore from "../../../store/profile.store";
import { PlusOutlined } from "@ant-design/icons";

const GreetingsCard = () => {
  const { value } = useProfileStore();
  return (
    <div className="w-full flex justify-between items-center bg-primary rounded-xl p-4">
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-1 text-white">
          <div className="flex gap-x-1">
            <div className="font-normal text-[30px]">
              Selamat Datang,{" "}
              <span className="font-bold">
                {value?.full_name.split(" ")[0]}
              </span>
            </div>
          </div>
          <div className="font-normal opacity-70 text-[16px] leading-5 max-w-[480px]">
            Kirim paket sekarang dan lihat bagaimana pengiriman yang lancar
            meningkatkan pendapatan Anda!
          </div>
        </div>
        <div className="flex items-center gap-x-4 mt-6">
          <Button type="primary" className="!border-white">
            Cek Ongkir
          </Button>
          <Link href={ROUTES.ORDER.CREATE}>
            <Button icon={<PlusOutlined />} id="step2">
              Buat Pesanan
            </Button>
          </Link>
          {/* <Image width={64} height={64} alt="truck" src="/truck.png" /> */}
        </div>
      </div>
      <Image
        alt="truck"
        width={0}
        height={0}
        sizes="100vw"
        className="w-auto h-auto"
        src="/truck-posaja.png"
      />
    </div>
  );
};

export default GreetingsCard;
