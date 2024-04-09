export type Route =
  | '/home'
  | '/saved-articles'
  | '/sign-up'
  | '/sign-in'
  | '/sign-out'
export type Size = 'sm' | 'md' | 'xl'
export type PopupName =
  | 'sign-in'
  | 'sign-up'
  | 'nav-menu'
  | 'sign-out'
  | 'error'
  | 'notify'
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type ApiPublicEndpoint = '/signin' | '/signup' | '/signout' | '/articles'
export type ApiProtectedEndpoint = '/users/me'
export type ApiEndpoint = ApiPublicEndpoint | ApiProtectedEndpoint
export type NewsApiEnpoint = '/top-headlines' | '/everything'
