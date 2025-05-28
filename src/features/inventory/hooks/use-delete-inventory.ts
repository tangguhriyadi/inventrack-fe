"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { BaseApiResponse } from "../../../types/api-response";
import { useNotificationBar } from "../../../providers/notification.provider";
import { INVENTORY_API_ROUTE } from "../configs/api-route";

export const api = (id: string) => {
  return httpClient.delete<BaseApiResponse>(
    INVENTORY_API_ROUTE.DELETE.ENDPOINT(id),
  );
};

export default function useDeleteInventory(onSuccess?: () => void) {
  const { openNotificationBar } = useNotificationBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api,
    mutationKey: INVENTORY_API_ROUTE.DELETE.KEY,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: INVENTORY_API_ROUTE.LIST.KEY,
      });
      openNotificationBar({
        title: "Success !",
        message: data.data.message ?? "Inventory Deleted Successfully !",
        type: "success",
      });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
}
