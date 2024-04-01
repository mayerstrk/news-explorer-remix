import { EnvironmentVariables as env } from 'environment-config'
import { HttpMethod, ApiEndpoint } from '../utils/string-unions'
import { type ApiError, isApiError } from '~/utils/errors'

type HelperResult =
  | {
      success: true
      response: Record<string, unknown>
    }
  | { success: false; response: ApiError | Error }

function requestBuilder<T extends Record<string, unknown> | undefined>(
  endpoint: ApiEndpoint,
  {
    method = 'GET',
    headers = { 'Content-Type': 'application/json' },
  }: { method?: HttpMethod; headers?: Record<string, string> } = {},
) {
  return async (body?: T): Promise<HelperResult> => {
    try {
      const response = await fetch(`${env.API_URL + endpoint}`, {
        method,
        headers,
        body: method != 'GET' && body ? JSON.stringify(body) : undefined,
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw errorResponse
      }

      const data = await response.json()
      return { success: true, response: data }
    } catch (error) {
      return {
        success: false,
        response: isApiError(error)
          ? error
          : error instanceof Error
            ? error
            : new Error('Unexpected Error', { cause: error }),
      }
    }
  }
}

export const createUser = requestBuilder('/signup', { method: 'POST' })
export const signIn = requestBuilder('/signin', { method: 'POST' })
export const signOut = requestBuilder('/signout', { method: 'POST' })
export const getCurrentUser = requestBuilder<undefined>('/users/me')
