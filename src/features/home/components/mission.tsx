"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../../../configs/route.config";

const Mission = () => {
  return (
    <div className="w-[30%] h-fit p-4 bg-white rounded-xl flex flex-col gap-y-4 gap-y">
      <div className="w-full flex justify-between items-center">
        <div className="font-semibold text-[20px]">
          Yuk, selesaikan misi kamu!
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-3">
        <Link
          href={ROUTES.PROFILE}
          className="flex items-center w-full flex-row p-3 bg-white rounded-[12px] border-[1.5px] border-[#DCE5EF] cursor-pointer"
        >
          <div className="w-full !flex items-center flex-row gap-x-3 ">
            <Image src="/smiling.png" width={28} height={28} alt="smiling" />
            <div className="flex flex-col justify-between grow">
              <div className="font-bold text-[15px] text-black">
                Lengkapi profil
              </div>
              <div className="font-medium text-sm text-text-primary">
                Biar kita lebih kenal, yuk lengkapi!
              </div>
            </div>
          </div>
          <div className="flex gap-x-1 items-center h-full">
            <div className="font-bold text-sm text-black">+10</div>
            <Image src="/coin.png" width={16} height={16} alt="coin" />
          </div>
        </Link>
        <Link
          href={ROUTES.PRODUCT.CREATE}
          className="flex items-center w-full flex-row p-3 bg-white rounded-[12px] border-[1.5px] border-[#DCE5EF]"
        >
          <div className="w-full !flex items-center flex-row gap-x-3">
            <Image src="/care.png" width={24} height={24} alt="care" />
            <div className="flex flex-col justify-between grow">
              <div className="font-bold text-[15px] text-black">
                Tambah 5 produk
              </div>
              <div className="font-medium text-sm text-text-primary">
                Tambah produk dietalase toko mu!
              </div>
            </div>
          </div>
          <div className="flex gap-x-1 items-center h-full">
            <div className="font-bold text-sm text-black">+10</div>
            <Image src="/coin.png" width={16} height={16} alt="coin" />
          </div>
        </Link>
        <Link
          href={ROUTES.DEFAULT}
          className="flex items-center w-full flex-row p-3 bg-white rounded-[12px] border-[1.5px] border-[#DCE5EF]"
        >
          <div className="w-full !flex items-center flex-row gap-x-3">
            <Image src="/art.png" width={28} height={28} alt="art" />
            <div className="flex flex-col justify-between grow">
              <div className="font-bold text-[15px] text-black">
                Dekorasi toko kamu
              </div>
              <div className="font-medium text-sm text-text-primary">
                Percantik toko mu, biar pelanggan betah!
              </div>
            </div>
          </div>
          <div className="flex gap-x-1 items-center h-full">
            <div className="font-bold text-sm text-black">+10</div>
            <Image src="/coin.png" width={16} height={16} alt="coin" />
          </div>
        </Link>
        <Link
          href={ROUTES.DEFAULT}
          className="flex items-center w-full flex-row p-3 bg-white rounded-[12px] border-[1.5px] border-[#DCE5EF]"
        >
          <div className="w-full !flex items-center flex-row gap-x-3">
            <Image src="/truck.png" width={24} height={24} alt="truck" />
            <div className="flex flex-col justify-between grow">
              <div className="font-bold text-[15px] text-black">
                Kirim paket
              </div>
              <div className="font-medium text-sm text-text-primary">
                Mulai jualan biar tambah cuan!
              </div>
            </div>
          </div>
          <div className="flex gap-x-1 items-center h-full">
            <div className="font-bold text-sm text-black">+10</div>
            <Image src="/coin.png" width={16} height={16} alt="coin" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Mission;
