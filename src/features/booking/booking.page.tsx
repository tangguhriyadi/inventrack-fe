"use client";

import React from "react";
import { Button, Typography } from "antd";
import { BackwardOutlined, PlusOutlined } from "@ant-design/icons";
import BookingTable from "./components/booking-table";
import BookingFormModal from "./components/booking-form-modal";
import { useBookingStore } from "./store/booking-store";
import ReturnFormModal from "./components/return-form-modal";

const BookingPage = () => {
  const { open, openReturn } = useBookingStore();
  return (
    <>
      <div className="flex gap-x-2 justify-between items-center !mb-6">
        <Typography.Title className="!mb-0" level={4}>
          Your Booking List
        </Typography.Title>
        <div className="flex gap-x-4">
          <Button
            onClick={() => openReturn()}
            size="small"
            icon={<BackwardOutlined />}
          >
            Return an Item
          </Button>
          <Button
            onClick={() => open()}
            type="primary"
            size="small"
            icon={<PlusOutlined />}
          >
            Book New Item
          </Button>
        </div>
      </div>
      <BookingTable />
      <BookingFormModal />
      <ReturnFormModal />
    </>
  );
};

export default BookingPage;
