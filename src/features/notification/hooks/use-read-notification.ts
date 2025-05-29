"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { NOTIFICATION_API_ROUTE } from "../config/api-route";

const api = () => httpClient.get(NOTIFICATION_API_ROUTE.READ.ENDPOINT);

export default function useReadNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: NOTIFICATION_API_ROUTE.READ.KEY,
    mutationFn: api,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_API_ROUTE.LIST.KEY,
      });
    },
  });
}
