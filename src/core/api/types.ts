export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

export interface ApiError {
  message: {
    errors: Record<string, string[]>;
    status: number;
    title: string;
  };
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  proxima: string;
  anterior: string;
  total: number;
}
