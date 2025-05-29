"use client";

import { useQuery } from "@tanstack/react-query";
import httpClient from "@/utils/http-client";
import { QueryParams } from "@/types/query-params";
import { BaseApiResponse } from "../../../types/api-response";
import { AuditTrailSchema } from "../schema/audit-trail.schema";
import { AUDIT_TRAIL_API_ROUTE } from "../configs/api-route";

export const api = (params: QueryParams) =>
  httpClient.get<BaseApiResponse<AuditTrailSchema[]>>(
    AUDIT_TRAIL_API_ROUTE.LIST.ENDPOINT,
    {
      params,
    },
  );

export default function useAuditTrailList(params: QueryParams) {
  return useQuery({
    queryKey: [...AUDIT_TRAIL_API_ROUTE.LIST.KEY, ...Object.values(params)],
    queryFn: () => api(params),
  });
}
