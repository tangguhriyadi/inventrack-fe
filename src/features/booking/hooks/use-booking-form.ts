"use client";

import { useFormik } from "formik";
import {
  createBookingSchema,
  CreateBookingSchema,
} from "../schema/create-booking.schema";
import { useBookingStore } from "../store/booking-store";
import useCreateBooking from "./use-create-booking";

export default function useBokingForm() {
  const { close } = useBookingStore();

  const initialValues: CreateBookingSchema = {
    inventory_id: "",
    booking_at: null,
    plan_return_at: null,
  };

  const createHook = useCreateBooking(close);

  const formik = useFormik({
    initialValues,
    validationSchema: createBookingSchema,
    onSubmit: async (values, helper) => {
      await createHook.mutateAsync(values);
      helper.resetForm()
    },
    enableReinitialize: true,
  });

  return { ...formik, isLoading: createHook.isPending };
}
