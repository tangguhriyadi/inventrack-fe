export type BaseApiResponse<T = any> = {
  status: string;
  message?: string;
  data: T;
};

export interface BaseQueryParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  order_by?: string;
  is_pagination?: boolean;
  search?: string;
  start_date?: string | null;
  end_date?: string | null;
  shipping_type?: string;
  transaction_method?: string;
}

export type Pagination<T = any> = {
  current_page: number;
  page_size: number;
  first_page: number;
  last_page: number;
  total_records: number;
  records: T;
};

export type PaginatedResponse<T = any> = {
  status: string;
  data: Pagination<T>;
};
