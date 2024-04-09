import { Article } from '~/atoms/article-gallery-atoms'
import { requestBuilder } from './utils/db-api-request-builder.server'
import { ApiEndpoint } from '~/utils/string-unions'

export const getArticles = (endpoint: string) =>
  requestBuilder<{
    status: 'string'
    totalResults: number
    articles: Article[]
  }>(endpoint as ApiEndpoint)()
