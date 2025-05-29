"use client";

import { useQuery } from "@tanstack/react-query";
import httpClient from "@/utils/http-client";
import { QueryParams } from "@/types/query-params";
import { BaseApiResponse } from "../../../types/api-response";
import { DASHBOARD_ADMIN_API_ROUTE } from "../../dashboard-admin/configs/api-route";

export type Top10Schmea = {
  count: number;
  status: string;
};

export const api = (params: QueryParams) =>
  httpClient.get<BaseApiResponse<Top10Schmea[]>>(
    DASHBOARD_ADMIN_API_ROUTE.STATUS.ENDPOINT,
    {
      params,
    },
  );

export default function useByStatus(params: QueryParams) {
  return useQuery({
    queryKey: [
      ...DASHBOARD_ADMIN_API_ROUTE.STATUS.KEY,
      ...Object.values(params),
    ],
    queryFn: () => api(params),
    refetchInterval: 10000,
    retry: false,
  });
}
