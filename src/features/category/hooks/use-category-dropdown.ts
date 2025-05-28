"use client";

import { useQuery } from "@tanstack/react-query";
import { CATEGORY_API_ROUTE } from "../config/api-route.config";
import httpClient from "../../../utils/http-client";
import { BaseApiResponse } from "../../../types/api-response";
import { CategorySchema } from "../schema/category.schema";
import { QueryParams } from "../../../types/query-params";

const cateogryApi = (params: QueryParams) =>
  httpClient.get<BaseApiResponse<CategorySchema[]>>(
    CATEGORY_API_ROUTE.DROPDOWN.ENDPOINT,
    {
      params,
    },
  );

export default function useCategoryList() {
  return useQuery({
    queryKey: [...CATEGORY_API_ROUTE.DROPDOWN.KEY],
    queryFn: () =>
      cateogryApi({
        page: 1,
        limit: 999999,
      }).then((res) =>
        res.data.results.map((item) => ({ label: item.name, value: item.id })),
      ),
  });
}
