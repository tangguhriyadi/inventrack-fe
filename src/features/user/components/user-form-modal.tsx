"use client";

import { Button, Modal } from "antd";
import React from "react";
import { useUserStore } from "../store/user.store";
import TypographyUtils from "../../../utils/typography";
import useUserForm from "../hooks/use-user-form";
import CoreInput from "../../../components/form/input/input";
import { FormMode } from "../../../enums/form.enum";
import CoreSelect from "../../../components/form/select/select";
import GenderEnum from "../../../enums/gender.enum";

const UserFormModal = () => {
  const { mode, close } = useUserStore();

  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    resetForm,
  } = useUserForm();

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
          label="Email"
          value={values.email}
          name="email"
          error={errors.email}
          placeholder="Email"
          onChange={handleChange}
          disabled={mode === FormMode.Update}
        />
        {mode === FormMode.Create && (
          <CoreInput.Password
            label="Password"
            value={values.password}
            name="password"
            error={errors.password}
            placeholder="Password"
            onChange={handleChange}
          />
        )}
        <CoreInput
          label="User Name"
          value={values.name}
          name="name"
          error={errors.name}
          placeholder="User Name"
          onChange={handleChange}
        />
        <CoreSelect
          label="Gender"
          onChange={(val) => setFieldValue("gender", val, false)}
          value={values.gender}
          options={Object.values(GenderEnum).map((item) => ({
            label: item,
            value: item,
          }))}
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

export default UserFormModal;
