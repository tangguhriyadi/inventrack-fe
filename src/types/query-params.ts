export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  order_by?: OrderBy;
  is_pagination?: boolean;
  [key: string]: any;
}

export enum OrderBy {
  ASC = "asc",
  DESC = "desc",
}
