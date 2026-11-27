export function unwrapApiArrayResult<T>(
  payload:
    | T[]
    | { ok: true; data: T[] }
    | { ok: false; error: unknown }
    | undefined,
): { items: T[]; isApiPayloadError: boolean } {
  if (!payload) {
    return { items: [], isApiPayloadError: false };
  }
  if (Array.isArray(payload)) {
    return { items: payload, isApiPayloadError: false };
  }
  if (typeof payload === 'object' && 'ok' in payload) {
    if (payload.ok) {
      if ('data' in payload && Array.isArray(payload.data)) {
        return { items: payload.data, isApiPayloadError: false };
      }
      if (
        !('data' in payload) ||
        payload.data === undefined ||
        payload.data === null ||
        (payload.data as unknown) === ''
      ) {
        return { items: [], isApiPayloadError: false };
      }
    }
    return { items: [], isApiPayloadError: true };
  }
  return { items: [], isApiPayloadError: false };
}
