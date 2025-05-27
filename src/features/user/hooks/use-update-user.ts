"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { USER_API_ROUTE } from "../config/api-route.config";
import { BaseApiResponse } from "../../../types/api-response";
import { useNotificationBar } from "../../../providers/notification.provider";
import { UpdateUserSchema } from "../schema/update-user.schema";

export const api = (body: UpdateUserSchema) => {
  const { id, ...rest } = body;
  return httpClient.patch<BaseApiResponse>(
    USER_API_ROUTE.UPDATE.ENDPOINT(id),
    rest,
  );
};

export default function useUpdateUser(onSuccess?: () => void) {
  const { openNotificationBar } = useNotificationBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api,
    mutationKey: USER_API_ROUTE.UPDATE.KEY,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: USER_API_ROUTE.LIST.KEY,
      });
      openNotificationBar({
        title: "Success !",
        message: data.data.message ?? "User Updated !",
        type: "success",
      });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
}
