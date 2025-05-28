"use client";

import { useQuery } from "@tanstack/react-query";
import httpClient from "@/utils/http-client";
import { QueryParams } from "@/types/query-params";
import { BaseApiResponse } from "../../../types/api-response";
import { INVENTORY_API_ROUTE } from "../configs/api-route";
import { InventorySchema } from "../schema/inventory.schema";

export const cateogryApi = (params: QueryParams) =>
  httpClient.get<BaseApiResponse<InventorySchema[]>>(
    INVENTORY_API_ROUTE.LIST.ENDPOINT,
    {
      params,
    },
  );

export default function useInventoryList(params: QueryParams) {
  return useQuery({
    queryKey: [...INVENTORY_API_ROUTE.LIST.KEY, ...Object.values(params)],
    queryFn: () => cateogryApi(params),
  });
}
