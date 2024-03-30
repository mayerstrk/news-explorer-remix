import { redirect } from '@vercel/remix'
import { Route } from '~/utils/string-unions'

export const appRedirect = (path: Route) => redirect(path)
