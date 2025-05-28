"use client";

import { useQuery } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { BaseApiResponse } from "../../../types/api-response";
import { QueryParams } from "../../../types/query-params";
import { INVENTORY_API_ROUTE } from "../configs/api-route";
import { InventorySchema } from "../schema/inventory.schema";

const inventoryApi = (params: QueryParams) =>
  httpClient.get<BaseApiResponse<InventorySchema[]>>(
    INVENTORY_API_ROUTE.DROPDOWN.ENDPOINT,
    {
      params,
    },
  );

export default function useInventoryDropdown() {
  return useQuery({
    queryKey: [...INVENTORY_API_ROUTE.DROPDOWN.KEY],
    queryFn: () =>
      inventoryApi({
        page: 1,
        limit: 999999,
      }).then((res) =>
        res.data.results.map((item) => ({ label: item.name, value: item.id })),
      ),
  });
}
