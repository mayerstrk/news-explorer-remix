import { redirect } from '@remix-run/node'
import { Path } from '~/utils/string-unions'

export const appRedirect = (path: Path) => redirect(path)
