"use client";

import { useQuery } from "@tanstack/react-query";
import httpClient from "@/utils/http-client";
import { UserSchema } from "../schema/user.schema";
import { QueryParams } from "@/types/query-params";
import { BaseApiResponse } from "../../../types/api-response";
import { USER_API_ROUTE } from "../config/api-route.config";

export const userApi = (params: QueryParams) =>
  httpClient.get<BaseApiResponse<UserSchema[]>>(USER_API_ROUTE.LIST.ENDPOINT, {
    params,
  });

export default function useUserList(params: QueryParams) {
  return useQuery({
    queryKey: [...USER_API_ROUTE.LIST.KEY, ...Object.values(params)],
    queryFn: () => userApi(params),
  });
}
