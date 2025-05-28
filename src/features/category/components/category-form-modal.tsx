"use client";

import { Button, Modal } from "antd";
import React from "react";
import TypographyUtils from "../../../utils/typography";
import CoreInput from "../../../components/form/input/input";
import { useCategoryStore } from "../store/category.store";
import useCategoryForm from "../hooks/use-category-form";

const CategoryFormModal = () => {
  const { mode, close } = useCategoryStore();

  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    isMutating,
    resetForm,
  } = useCategoryForm();

  const handleClose = () => {
    resetForm();
    close();
  };

  return (
    <Modal
      open={!!mode}
      title={TypographyUtils.capitalize(mode ?? "") + " Role"}
      onCancel={handleClose}
      footer={null}
    >
      <form className="flex flex-col gap-y-8 pt-2" onSubmit={handleSubmit}>
        <CoreInput
          label="Category Name"
          value={values.name}
          name="name"
          error={errors.name}
          placeholder="Category Name"
          onChange={handleChange}
        />
        <div className="flex justify-end gap-x-2">
          <Button onClick={close}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting || isMutating}
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryFormModal;
