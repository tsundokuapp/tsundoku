export interface ApiResponse<T> {
  data: T[];
  proxima: string;
  anterior: string;
  total: number;
}
