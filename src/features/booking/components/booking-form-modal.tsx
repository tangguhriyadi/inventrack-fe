"use client";

import React from "react";
import { useBookingStore } from "../store/booking-store";
import useBokingForm from "../hooks/use-booking-form";
import useInventoryDropdown from "../../inventory/hooks/use-inventory-dropdown";
import { Button, Modal, SelectProps } from "antd";
import CoreSelect from "../../../components/form/select/select";
import CoreDatePicker from "../../../components/form/datepicker/date-picker";
import dayjs from "dayjs";

const BookingFormModal = () => {
  const { isOpen, close } = useBookingStore();

  const {
    errors,
    values,
    isSubmitting,
    setFieldValue,
    resetForm,
    handleSubmit,
  } = useBokingForm();

  const inventoryDropdownHook = useInventoryDropdown();

  const inventoryOptions: SelectProps["options"] = [
    ...(inventoryDropdownHook.data || []),
  ];
  const handleClose = () => {
    resetForm();
    close();
  };

  return (
    <Modal
      open={isOpen}
      title={"Booking Item"}
      onCancel={handleClose}
      footer={null}
    >
      <form className="flex flex-col gap-y-5 pt-2" onSubmit={handleSubmit}>
        <CoreSelect
          label="Item"
          onChange={(val) => setFieldValue("inventory_id", val, false)}
          value={values.inventory_id}
          options={inventoryOptions}
          error={errors.inventory_id}
          placeholder="Select Item"
          showSearch
          loading={inventoryDropdownHook.isLoading}
          filterOption={(input, option) =>
            String(option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />

        <CoreDatePicker
          name="booking_at"
          value={values.booking_at ? dayjs(values.booking_at) : undefined}
          onChange={(date) => {
            setFieldValue("booking_at", date);
          }}
          label="Booking Date"
          placeholder=""
          error={errors.booking_at}
          maxDate={
            values.plan_return_at ? dayjs(values.plan_return_at) : undefined
          }
          showTime
          showSecond={false}
          minDate={dayjs().startOf("day")}
        />
        <CoreDatePicker
          name="plan_return_at"
          value={
            values.plan_return_at ? dayjs(values.plan_return_at) : undefined
          }
          onChange={(date) => {
            setFieldValue("plan_return_at", date);
          }}
          label="Return Date"
          placeholder=""
          error={errors.plan_return_at}
          minDate={values.booking_at ? dayjs(values.booking_at) : undefined}
          showTime
          showSecond={false}
        />

        <div className="flex justify-end gap-x-2">
          <Button onClick={close}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BookingFormModal;
