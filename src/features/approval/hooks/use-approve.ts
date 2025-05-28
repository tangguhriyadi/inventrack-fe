"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { BaseApiResponse } from "../../../types/api-response";
import { useNotificationBar } from "../../../providers/notification.provider";
import { BOOKING_API_ROUTE } from "../../booking/configs/api-route.config";

export const api = (id: string) =>
  httpClient.post<BaseApiResponse>(BOOKING_API_ROUTE.APPROVE.ENDPOINT(id));

export default function useApproveBooking(onSuccess?: () => void) {
  const { openNotificationBar } = useNotificationBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api,
    mutationKey: BOOKING_API_ROUTE.APPROVE.KEY,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: BOOKING_API_ROUTE.LIST.KEY,
      });
      openNotificationBar({
        title: "Success !",
        message: data.data.message ?? "Booking Approved !",
        type: "success",
      });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
}
