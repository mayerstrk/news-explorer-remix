import { env } from 'environment-config'
import { ApiError, isApiError } from '~/utils/errors'
import { ApiEndpoint, HttpMethod } from '~/utils/string-unions'

type HelperResult<R> =
  | {
      success: true
      response: R
    }
  | { success: false; response: ApiError }

export default function requestBuilder<
  R,
  T extends Record<string, unknown> = Record<string, never>,
>(
  endpoint: ApiEndpoint,
  {
    method = 'GET',
    headers = { 'Content-Type': 'application/json' },
  }: { method?: HttpMethod; headers?: Record<string, string> } = {},
) {
  return async (body?: T): Promise<HelperResult<R>> => {
    try {
      const response = await fetch(`${env.API_URL + endpoint}`, {
        method,
        headers,
        body: method != 'GET' && body ? JSON.stringify(body) : undefined,
      })

      const parsedResponse = await response.json()

      if (!response.ok) {
        if (isApiError(parsedResponse)) {
          return {
            success: false,
            response: parsedResponse,
          }
        }
        throw new Error('Response not of expected shape', {
          cause: parsedResponse,
        })
      }

      return { success: true, response: parsedResponse }
    } catch (caught) {
      if (caught instanceof Error) {
        throw caught
      }
      const error = new Error((caught as Error).message || 'Request failed', {
        cause: caught,
      })
      console.error(error.message, error.cause)
      throw error
    }
  }
}
