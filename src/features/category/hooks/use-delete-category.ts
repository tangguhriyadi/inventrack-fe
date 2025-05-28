"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { BaseApiResponse } from "../../../types/api-response";
import { useNotificationBar } from "../../../providers/notification.provider";
import { CATEGORY_API_ROUTE } from "../config/api-route.config";

export const api = (id: string) => {
  return httpClient.delete<BaseApiResponse>(
    CATEGORY_API_ROUTE.DELETE.ENDPOINT(id),
  );
};

export default function useDeleteCategory(onSuccess?: () => void) {
  const { openNotificationBar } = useNotificationBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api,
    mutationKey: CATEGORY_API_ROUTE.DELETE.KEY,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: CATEGORY_API_ROUTE.LIST.KEY,
      });
      openNotificationBar({
        title: "Success !",
        message: data.data.message ?? "Category Deleted Successfully !",
        type: "success",
      });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
}
