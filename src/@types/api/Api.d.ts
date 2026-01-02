type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };
