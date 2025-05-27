"use client";

import { Card, List, Typography } from "antd";
import TypographyUtils from "../../../utils/typography";
import { cn } from "../../../utils/cn";
import ImageFallback from "../../../components/image/image-fallback";
import useOrderList from "../../pesanan/hooks/use-order-list";
import { OrderListSchema } from "../../pesanan/schema/order.schema";
import OrderDetailModal from "../../pesanan/components/order-detail-modal";
import { useState } from "react";

const OrderList = () => {
  const [openModal, setOpenModal] = useState<string | undefined>(undefined);

  const { data: orderListData, isLoading } = useOrderList({
    search: undefined,
    page: 1,
    limit: 10,
    sort_by: "created_at",
    order_by: "desc",
    status: undefined,
    start_date: undefined,
    end_date: undefined,
  });

  const Item = (props: { data: OrderListSchema }): React.ReactNode => {
    if (props.data) {
      return (
        <div className="rounded-[10px] overflow-hidden w-full">
          <div className="p-4 bg-neutral-98 flex justify-between">
            <div className="flex w-[50%] gap-x-2">
              <div className="!h-12 !w-12 rounded-full overflow-hidden">
                <ImageFallback
                  unoptimized
                  width={48}
                  height={48}
                  src={
                    props.data.products &&
                    props.data.products[0].picture &&
                    props.data.products[0].picture.length > 0
                      ? props.data.products[0].picture
                      : "/product-list-default.png"
                  }
                  className="!w-12 !h-12"
                  alt=""
                  fallbackSrc="/product-list-default.png"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <Typography.Paragraph
                  ellipsis={{ rows: 1, expandable: false, symbol: ".." }}
                  className="!font-semibold !text-[16px] !m-0 !leading-5"
                >
                  {props.data.products &&
                  props.data.products[0].name &&
                  props.data.products[0].name.length > 0
                    ? props.data.products[0].name
                    : "-"}
                </Typography.Paragraph>
                <div className="text-xs font-semibold">
                  {props.data.store_front.id !== null
                    ? props.data.store_front.name
                    : props.data.channel.store}
                </div>
              </div>
            </div>
            <div className="flex w-[25%] flex-col gap-y-1 font-semibold text-[16px] leading-5">
              <div className="font-bold">Pemesan</div>
              <div>
                {" "}
                {props.data.address_info.pic_name &&
                props.data.address_info.pic_name.length > 0
                  ? props.data.address_info.pic_name
                  : "-"}
              </div>
            </div>
            <div className="flex w-[25%] flex-col gap-y-1 font-semibold text-[16px] leading-5">
              <div className="font-bold">Kurir</div>
              <div>
                {" "}
                {props.data.shipping.merchant &&
                props.data.shipping.merchant.length > 0
                  ? props.data.shipping.merchant +
                    " - " +
                    props.data.shipping.name
                  : "-"}
              </div>
            </div>
          </div>
          <div className="p-4 bg-neutral-95 flex justify-between px-4 py-2">
            {props.data.products && props.data.products.length > 1 ? (
              <div
                className={cn(
                  "text-[14px] leading-[20px] underline text-accent cursor-pointer",
                )}
                onClick={() => setOpenModal(props.data.id)}
              >
                + {props.data.products.length - 1} lainnya
              </div>
            ) : (
              <div className={cn("text-[12px] leading-5")}>
                {props.data.products && props.data.products.length > 0
                  ? props.data.products[0]?.variant
                      ?.map((v) => v.variant)
                      .join(", ")
                  : "-"}
              </div>
            )}
            <div className="flex gap-x-2">
              <div className="text-neutral-50 text-[14px] leading-5">
                Total Pembayaran
              </div>
              <div className="font-bold text-[16px] text-neutral leading-5">
                {props.data.order.status === "PERLU_DIPROSES"
                  ? TypographyUtils.formatRupiah(
                      props.data.order.shipping_fee ?? 0,
                    )
                  : TypographyUtils.formatRupiah(
                      props.data.transaction.total_price ?? 0,
                    )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    // <div className="w-[70%]">
    <div className="w-[67.5%] z-10">
      <Card
        styles={{
          body: {
            padding: 16,
          },
        }}
      >
        <div className="w-fit font-semibold text-[20px] leading-[28px] mb-[5px]">
          Pesanan Masuk
        </div>
        <div className="w-12 h-[3px] bg-accent rounded-full mb-6"></div>
        <List
          size="large"
          style={{
            background: "transparent",
          }}
          dataSource={orderListData?.data.data.records || []}
          renderItem={(item) =>
            orderListData?.data &&
            orderListData?.data.data.records.length > 0 && (
              <List.Item
                style={{
                  paddingInline: 0,
                  paddingBlock: 4,
                }}
              >
                <Item data={item} />
              </List.Item>
            )
          }
          loading={isLoading}
          bordered={false}
          split={false}
        />
      </Card>
      <OrderDetailModal
        id={openModal}
        onClose={() => setOpenModal(undefined)}
      />
    </div>
  );
};

export default OrderList;
