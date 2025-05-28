"use client";

import { useQuery } from "@tanstack/react-query";
import httpClient from "@/utils/http-client";
import { QueryParams } from "@/types/query-params";
import { BaseApiResponse } from "../../../types/api-response";
import { CATEGORY_API_ROUTE } from "../config/api-route.config";
import { CategorySchema } from "../schema/category.schema";

export const cateogryApi = (params: QueryParams) =>
  httpClient.get<BaseApiResponse<CategorySchema[]>>(
    CATEGORY_API_ROUTE.LIST.ENDPOINT,
    {
      params,
    },
  );

export default function useCategoryList(params: QueryParams) {
  return useQuery({
    queryKey: [...CATEGORY_API_ROUTE.LIST.KEY, ...Object.values(params)],
    queryFn: () => cateogryApi(params),
  });
}
