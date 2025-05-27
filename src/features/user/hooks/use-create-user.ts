"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { USER_API_ROUTE } from "../config/api-route.config";
import { CreateUserSchema } from "../schema/create-user.schema";
import { BaseApiResponse } from "../../../types/api-response";
import { useNotificationBar } from "../../../providers/notification.provider";

export const api = (body: CreateUserSchema) =>
  httpClient.post<BaseApiResponse>(USER_API_ROUTE.CREATE.ENDPOINT, body);

export default function useCreateUser(onSuccess?: () => void) {
  const { openNotificationBar } = useNotificationBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api,
    mutationKey: USER_API_ROUTE.CREATE.KEY,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: USER_API_ROUTE.LIST.KEY,
      });
      openNotificationBar({
        title: "Success !",
        message: data.data.message ?? "User Created !",
        type: "success",
      });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
}
