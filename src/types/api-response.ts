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

export type Pagination = {
  page: number;
  total_page: number;
  total_data: number;
  data_in_page: number;
};

export type BaseApiResponse<T = any> = {
  status: string;
  message?: string;
  results: T;
  pagination?: Pagination;
};
