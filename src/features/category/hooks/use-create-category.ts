"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { BaseApiResponse } from "../../../types/api-response";
import { useNotificationBar } from "../../../providers/notification.provider";
import { CATEGORY_API_ROUTE } from "../config/api-route.config";
import { CreateCategorySchema } from "../schema/create-category.schema";

export const api = (body: CreateCategorySchema) =>
  httpClient.post<BaseApiResponse>(CATEGORY_API_ROUTE.CREATE.ENDPOINT, body);

export default function useCreateCategory(onSuccess?: () => void) {
  const { openNotificationBar } = useNotificationBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api,
    mutationKey: CATEGORY_API_ROUTE.CREATE.KEY,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: CATEGORY_API_ROUTE.LIST.KEY,
      });
      openNotificationBar({
        title: "Success !",
        message: data.data.message ?? "Category Created !",
        type: "success",
      });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
}
