"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { BaseApiResponse } from "../../../types/api-response";
import { useNotificationBar } from "../../../providers/notification.provider";
import { CreateBookingSchema } from "../schema/create-booking.schema";
import { BOOKING_API_ROUTE } from "../configs/api-route.config";

export const api = (body: CreateBookingSchema) =>
  httpClient.post<BaseApiResponse>(BOOKING_API_ROUTE.BOOK.ENDPOINT, body);

export default function useCreateBooking(onSuccess?: () => void) {
  const { openNotificationBar } = useNotificationBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api,
    mutationKey: BOOKING_API_ROUTE.BOOK.KEY,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: BOOKING_API_ROUTE.LIST.KEY,
      });
      openNotificationBar({
        title: "Success !",
        message: data.data.message ?? "Inventory Booked !",
        type: "success",
      });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
}
