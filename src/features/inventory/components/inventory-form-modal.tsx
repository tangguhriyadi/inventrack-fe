"use client";

import { Button, Modal, SelectProps, Switch } from "antd";
import React from "react";
import TypographyUtils from "../../../utils/typography";
import CoreInput from "../../../components/form/input/input";
import CoreSelect from "../../../components/form/select/select";
import useInventoryForm from "../hooks/use-inventory-form";
import { useInventoryStore } from "../store/inventory-store";
import useCategoryDropdown from "../../category/hooks/use-category-dropdown";

const InventoryFormModal = () => {
  const { mode, close } = useInventoryStore();

  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    resetForm,
  } = useInventoryForm();

  const handleClose = () => {
    resetForm();
    close();
  };

  const categoryDropdownHook = useCategoryDropdown();

  const categoryOptions: SelectProps["options"] = [
    ...(categoryDropdownHook.data || []),
  ];

  return (
    <Modal
      open={!!mode}
      title={TypographyUtils.capitalize(mode ?? "") + " Inventory"}
      onCancel={handleClose}
      footer={null}
    >
      <form className="flex flex-col gap-y-5 pt-2" onSubmit={handleSubmit}>
        <CoreInput
          label="Name"
          value={values.name}
          name="name"
          error={errors.name}
          placeholder="Inventory Name"
          onChange={handleChange}
        />

        <CoreSelect
          label="Category"
          onChange={(val) => setFieldValue("category_id", val, true)}
          value={values.category_id}
          options={categoryOptions}
          error={errors.category_id}
          placeholder="Select Category"
          showSearch
          filterOption={(input, option) =>
            String(option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />

        <CoreInput.Number
          label="Quantity"
          name="quantity"
          value={values.quantity}
          onChange={(e) => {
            setFieldValue("quantity", Number(e.target.value), true);
          }}
          suffix="pcs"
          error={errors.quantity}
        />
        <CoreInput
          label="Image"
          value={values.image_url}
          name="image_url"
          error={errors.image_url}
          placeholder="Image"
          onChange={handleChange}
        />
        <div className="flex gap-x-4 mt-2">
          <div>Availability</div>
          <Switch
            checked={values.is_available}
            onChange={(val) => setFieldValue("is_available", val)}
            value={values.is_available}
          />
          <div>{values.is_available ? "YES" : "NO"}</div>
        </div>
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

export default InventoryFormModal;
