import { ApiEndpoint } from '~/utils/string-unions'
import { protectedRequestBuilder } from './utils/protected-db-request-builder.server'
import { Article } from '~/atoms/article-gallery-atoms'
import { extractKeywords } from './utils/extract-keyword'

export type DBArticle = {
  article_id: number
  keyword: string
  title: string
  text: string
  date: string
  source: string
  link: string
  image: string
  created_at: string
  updated_at: string
  owner: number
}

type TransformedArticle = {
  keyword: string | null
  title: string | null
  text: string | null
  date: string | null
  source: string | null
  link: string | null
  image: string | null
}

export const saveArticle = (token: string, article: Article) => {
  const transformed = {
    keyword: extractKeywords(article.title),
    title: article.title,
    text: article.content,
    date: new Date().toISOString().split('T')[0],
    source: article.source.name,
    link: article.url,
    image: article.urlToImage,
  }

  const query = protectedRequestBuilder<DBArticle, TransformedArticle>(
    token,
    '/articles',
    {
      method: 'POST',
    },
  )

  return query(transformed)
}

export const delteArticle = async (token: string, articleId: string) =>
  protectedRequestBuilder<DBArticle>(
    token,
    ('/articles/' + articleId) as ApiEndpoint,
    {
      method: 'DELETE',
    },
  )()

export const getSavedArticles = async (token: string) =>
  protectedRequestBuilder<{ data: DBArticle[] }>(token, '/articles')()
