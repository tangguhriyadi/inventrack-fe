"use client";

import { useQuery } from "@tanstack/react-query";
import httpClient from "@/utils/http-client";
import { QueryParams } from "@/types/query-params";
import { BaseApiResponse } from "../../../types/api-response";
import { DASHBOARD_ADMIN_API_ROUTE } from "../configs/api-route";
import { BookingSchema } from "../../booking/schema/booking.schema";

export const api = (params: QueryParams) =>
  httpClient.get<BaseApiResponse<BookingSchema[]>>(
    DASHBOARD_ADMIN_API_ROUTE.OVERDUE.ENDPOINT,
    {
      params,
    },
  );

export default function useOverdue(params: QueryParams) {
  return useQuery({
    queryKey: [
      ...DASHBOARD_ADMIN_API_ROUTE.OVERDUE.KEY,
      ...Object.values(params),
    ],
    queryFn: () => api(params),
    refetchInterval: 10000,
    retry: false,
  });
}
