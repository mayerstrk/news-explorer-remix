import { ApiEndpoint, HttpMethod } from '~/utils/string-unions'
import { requestBuilder } from './db-api-request-builder.server'

export const protectedRequestBuilder = <
  R,
  T extends Record<string, unknown> = Record<string, never>,
>(
  token: string,
  endpoint: string,
  {
    method = 'GET',
    headers = {},
  }: { method?: HttpMethod; headers?: Record<string, string> } = {},
) =>
  requestBuilder<R, T>(endpoint as ApiEndpoint, {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Cookie: `token=${token}`,
    },
  })
