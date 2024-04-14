import { DBApiEndpoint } from '~/utils/enums'
import requestBuilder from '../builders/news-api-request-builder'

type NewsApiArticle = {
  source: {
    id: string | null
    name: string | null
  }
  author: string | null
  title: string | null
  description: string | null
  url: string | null
  urlToImage: string | null
  publishedAt: string | null
  content: string | null
}

const getArticles = (endpoint: string) =>
  requestBuilder<{
    status: 'string'
    totalResults: number
    articles: NewsApiArticle[]
  }>(endpoint as DBApiEndpoint)()

export { type NewsApiArticle, getArticles }
