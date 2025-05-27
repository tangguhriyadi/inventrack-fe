"use client";

import { CaretDownOutlined } from "@ant-design/icons";
import { Table, TableProps } from "antd";
import React from "react";

const CoreTable = <T extends object>(props: TableProps<T>) => {
  return (
    <Table<T>
      pagination={{
        ...props.pagination,
        showTotal: (total, range) => (
          <p
            style={{
              position: "absolute",
              left: 125,
              color: "#727385",
              fontSize: "12px",
            }}
          >
            Hasil {range.join("-")} dari {total} data ditampilkan
          </p>
        ),
        showSizeChanger: {
          // placement: "bottomLeft",
          style: {
            position: "absolute",
            left: 10,
          },
          rootClassName: "custom-page-changer",
          suffixIcon: <CaretDownOutlined />,
        },
      }}
      {...props}
    />
  );
};

export default CoreTable;
