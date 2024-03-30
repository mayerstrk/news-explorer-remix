import { redirect } from '@remix-run/node'
import { Route } from '~/utils/string-unions'

export const appRedirect = (path: Route) => redirect(path)
