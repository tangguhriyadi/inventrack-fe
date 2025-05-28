"use client";

import { useQuery } from "@tanstack/react-query";
import httpClient from "@/utils/http-client";
import { QueryParams } from "@/types/query-params";
import { BaseApiResponse } from "../../../types/api-response";
import { BookingSchema } from "../../booking/schema/booking.schema";
import { BOOKING_API_ROUTE } from "../../booking/configs/api-route.config";

export const cateogryApi = (params: QueryParams) =>
  httpClient.get<BaseApiResponse<BookingSchema[]>>(
    BOOKING_API_ROUTE.LIST.ENDPOINT,
    {
      params,
    },
  );

export default function useApprovalList(params: QueryParams) {
  return useQuery({
    queryKey: [...BOOKING_API_ROUTE.LIST.KEY, ...Object.values(params)],
    queryFn: () => cateogryApi(params),
  });
}
