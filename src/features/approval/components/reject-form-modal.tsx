"use client";

import { Button, Modal } from "antd";
import React, { FormEvent, useState } from "react";
import useRejectBooking from "../hooks/use-reject";
import { useApprovalStore } from "../store/approval-store";
import CoreInput from "../../../components/form/input/input";

const RejectFormModal = () => {
  const { value, close } = useApprovalStore();
  const [notes, setNotes] = useState<string | null>(null);

  const handleClose = () => {
    setNotes(null);
    close();
  };

  const rejectHook = useRejectBooking(handleClose);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (notes && value) {
      await rejectHook.mutateAsync({ id: value, note: notes });
    }
  };
  return (
    <Modal
      open={!!value}
      title={"Reject Booking Request"}
      onCancel={handleClose}
      footer={null}
    >
      <form className="flex flex-col gap-y-5 pt-2" onSubmit={handleSubmit}>
        <CoreInput.TextArea
          name="Reason"
          label="Reject reason"
          placeholder="Enter reject notes"
          value={notes ?? ""}
          onChange={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setNotes(target.value);
          }}
        />

        <div className="flex justify-end gap-x-2">
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!notes}
            loading={rejectHook.isPending}
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RejectFormModal;
