export type SuccessResponse<T> = T extends { success: true; response: infer R }
  ? R
  : never
