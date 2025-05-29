"use client";

import { useQuery } from "@tanstack/react-query";
import httpClient from "@/utils/http-client";
import { QueryParams } from "@/types/query-params";
import { BaseApiResponse } from "../../../types/api-response";
import { NOTIFICATION_API_ROUTE } from "../config/api-route";
import { InventorySchema } from "../../inventory/schema/inventory.schema";
import { UserSchema } from "../../user/schema/user.schema";
import { BookingSchema } from "../../booking/schema/booking.schema";

type TypeNotif = {
  id: string;
  user_id: string;
  booking_id?: string | null;
  inventory?: InventorySchema;
  booking?: BookingSchema;
  created_at: Date;
  message: string;
  user: UserSchema;
  is_read: boolean;
};

export const api = (params: QueryParams) =>
  httpClient.get<BaseApiResponse<TypeNotif[]>>(
    NOTIFICATION_API_ROUTE.LIST.ENDPOINT,
    {
      params,
    },
  );

export default function useNotificationList(params: QueryParams) {
  return useQuery({
    queryKey: [...NOTIFICATION_API_ROUTE.LIST.KEY, ...Object.values(params)],
    queryFn: () => api(params),
    refetchOnWindowFocus: true,
  });
}
