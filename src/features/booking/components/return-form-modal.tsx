"use client";

import { Button, Modal, SelectProps } from "antd";
import React, { FormEvent, useState } from "react";
import { useBookingStore } from "../store/booking-store";
import CoreSelect from "../../../components/form/select/select";
import useReturnBooking from "../hooks/use-return";
import useBookingList from "../hooks/use-list-booking";
import BookingStatus from "../../../enums/booking-status.enum";

const ReturnFormModal = () => {
  const { isOpenReturn, closeReturn } = useBookingStore();
  const [id, setId] = useState(null);

  const handleClose = () => {
    setId(null);
    closeReturn();
  };

  const returnHook = useReturnBooking(handleClose);

  const bookingHook = useBookingList({
    page: 1,
    limit: 999999,
    status: BookingStatus.Approved,
  });

  const bookingOptions: SelectProps["options"] =
    bookingHook?.data?.data.results.map((result) => ({
      label: result.inventory.name,
      value: result.id,
    }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (id) {
      await returnHook.mutateAsync(id);
    }
  };
  return (
    <Modal
      open={isOpenReturn}
      title={"Return Item"}
      onCancel={handleClose}
      footer={null}
    >
      {bookingOptions?.length === 0 && (
        <h1 className="text-error">You have no item to return</h1>
      )}
      <form className="flex flex-col gap-y-5 pt-2" onSubmit={handleSubmit}>
        <CoreSelect
          label="Item"
          onChange={(val) => setId(val)}
          value={id}
          options={bookingOptions}
          placeholder="Select Item"
          showSearch
          filterOption={(input, option) =>
            String(option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          loading={bookingHook.isLoading}
        />

        <div className="flex justify-end gap-x-2">
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!id}
            loading={returnHook.isPending}
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReturnFormModal;
