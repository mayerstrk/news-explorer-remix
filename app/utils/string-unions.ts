export type Paths = '/home' | '/saved-articles'
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type PublicEndpoint = '/signin' | '/signup' | '/signout'
export type ProtectedEndpoint = '/users/me'
export type ApiEndpoint = PublicEndpoint | ProtectedEndpoint
