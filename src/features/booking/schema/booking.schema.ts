import * as yup from "yup";
import { createBookingSchema } from "./create-booking.schema";
import BookingStatus from "../../../enums/booking-status.enum";

export const bookingSchema = createBookingSchema.shape({
  id: yup.string().required(),
  user_id: yup.string(),
  returned_at: yup.date().nullable(),
  rejected_at: yup.date().nullable(),
  approved_at: yup.date().nullable(),
  reject_reason: yup.string().nullable(),
  inventory: yup.object({
    id: yup.string(),
    name: yup.string(),
    inventoryCategory: yup.object({
      id: yup.string(),
      name: yup.string(),
    }),
  }),
  user: yup.object({
    id: yup.string(),
    name: yup.string(),
  }),
  rejected_by: yup.string().nullable(),
  approved_by: yup.string().nullable(),
  is_approved: yup.boolean(),
  is_rejected: yup.boolean(),
  is_returned: yup.boolean(),
  is_done: yup.boolean(),
  created_at: yup.date(),
  approvedBy: yup.object({
    id: yup.string(),
    name: yup.string(),
  }),
  rejectedBy: yup.object({
    id: yup.string(),
    name: yup.string(),
  }),
  status: yup.string().oneOf(Object.values(BookingStatus)).required(),
});

export type BookingSchema = yup.InferType<typeof bookingSchema>;
