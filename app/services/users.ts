import { EnvironmentVariables as env } from 'environment-config'
import { HttpMethod, ApiEndpoint } from '../utils/string-unions'

type HelperResponse =
  | { success: boolean; data: Record<string, unknown> }
  | { success: boolean; error: unknown }

function requestBuilder<T extends Record<string, unknown> | undefined>(
  endpoint: ApiEndpoint,
  {
    method = 'GET',
    headers = { 'Content-Type': 'application/json' },
  }: { method?: HttpMethod; headers?: Record<string, string> } = {},
) {
  return async (body: T): Promise<HelperResponse> => {
    try {
      const response = await fetch(`${env.API_URL + endpoint}`, {
        method,
        headers,
        body: method != 'GET' && body ? JSON.stringify(body) : undefined,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to process request')
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
      return { success: false, error: 'Unknown error occurred' }
    }
  }
}

export const createUser = requestBuilder('/signup', { method: 'POST' })
export const signIn = requestBuilder('/signin', { method: 'POST' })
export const signOut = requestBuilder('/signout', { method: 'POST' })
export const getCurrentUser = requestBuilder('/users/me')
