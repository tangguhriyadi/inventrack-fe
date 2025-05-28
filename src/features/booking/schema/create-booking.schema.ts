import * as yup from "yup";

export const createBookingSchema = yup.object({
    inventory_id: yup.string().required("Name is required"),
    booking_at: yup.date().nullable("Booking date is required"),
    plan_return_at: yup.date().nullable("Return date is required"),
});

export type CreateBookingSchema = yup.InferType<typeof createBookingSchema>;
