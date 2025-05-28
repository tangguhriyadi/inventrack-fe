"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { BaseApiResponse } from "../../../types/api-response";
import { useNotificationBar } from "../../../providers/notification.provider";
import { CreateInventorySchema } from "../schema/create-inventory";
import { INVENTORY_API_ROUTE } from "../configs/api-route";

export const api = (body: CreateInventorySchema) =>
  httpClient.post<BaseApiResponse>(INVENTORY_API_ROUTE.CREATE.ENDPOINT, body);

export default function useCreateInventory(onSuccess?: () => void) {
  const { openNotificationBar } = useNotificationBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api,
    mutationKey: INVENTORY_API_ROUTE.CREATE.KEY,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: INVENTORY_API_ROUTE.LIST.KEY,
      });
      openNotificationBar({
        title: "Success !",
        message: data.data.message ?? "Inventory Created !",
        type: "success",
      });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
}
