"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { BaseApiResponse } from "../../../types/api-response";
import { useNotificationBar } from "../../../providers/notification.provider";
import { UpdateCategorySchema } from "../schema/update-category.schema";
import { CATEGORY_API_ROUTE } from "../config/api-route.config";

export const api = (body: UpdateCategorySchema) => {
  const { id, ...rest } = body;
  return httpClient.patch<BaseApiResponse>(
    CATEGORY_API_ROUTE.UPDATE.ENDPOINT(id),
    rest,
  );
};

export default function useUpdateCategory(onSuccess?: () => void) {
  const { openNotificationBar } = useNotificationBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api,
    mutationKey: CATEGORY_API_ROUTE.UPDATE.KEY,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: CATEGORY_API_ROUTE.LIST.KEY,
      });
      openNotificationBar({
        title: "Success !",
        message: data.data.message ?? "Category Updated !",
        type: "success",
      });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
}
