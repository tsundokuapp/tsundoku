export interface ErrorResponse {
  // TODO: substituir por ApiError --- IGNORE ---
  message: {
    errors: Record<string, string[]>;
    status: number;
    title: string;
  };
  statusCode: number;
}

export interface ApiError {
  message: {
    errors: Record<string, string[]>;
    status: number;
    title: string;
  };
  statusCode: number;
}
