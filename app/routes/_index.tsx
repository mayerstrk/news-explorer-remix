import { redirect } from '@vercel/remix'
import { Route } from '~/utils/enums'

export const loader = () => redirect(Route.home)
