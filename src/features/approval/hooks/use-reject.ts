"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { BaseApiResponse } from "../../../types/api-response";
import { useNotificationBar } from "../../../providers/notification.provider";
import { BOOKING_API_ROUTE } from "../../booking/configs/api-route.config";

export const api = ({ id, note }: { id: string; note: string }) =>
  httpClient.post<BaseApiResponse>(BOOKING_API_ROUTE.REJECT.ENDPOINT(id), {
    reason: note,
  });

export default function useRejectBooking(onSuccess?: () => void) {
  const { openNotificationBar } = useNotificationBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api,
    mutationKey: BOOKING_API_ROUTE.REJECT.KEY,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: BOOKING_API_ROUTE.LIST.KEY,
      });
      openNotificationBar({
        title: "Success !",
        message: data.data.message ?? "Booking Rejected !",
        type: "success",
      });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
}
