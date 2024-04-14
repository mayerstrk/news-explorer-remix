import { extractKeywords } from '../utils/extract-keyword'
import { protectedDBRequestBuilder } from '../builders/protected-db-request-builder'
import { NewsApiArticle } from '../news-api/news-api'
import { DBApiEndpoint } from '~/utils/enums'
import { getSession } from '~/session.server'
import invariant from 'tiny-invariant'
import { Session } from '@remix-run/node'

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

export const saveArticle = async (
  article: NewsApiArticle,
  session: Session,
) => {
  const transformed = {
    keyword: extractKeywords(article.title),
    title: article.title,
    text: article.content,
    date: new Date().toISOString().split('T')[0],
    source: article.source.name,
    link: article.url,
    image: article.urlToImage,
  }

  const query = protectedDBRequestBuilder<DBArticle, TransformedArticle>(
    session,
    '/articles',
    {
      method: 'POST',
    },
  )

  return query(transformed)
}

export const deleteArticle = async (articleId: string, session: Session) =>
  protectedDBRequestBuilder<DBArticle>(
    session,
    ('/articles/' + articleId) as DBApiEndpoint,
    {
      method: 'DELETE',
    },
  )()

export const getSavedArticles = async (session: Session) =>
  protectedDBRequestBuilder<{ data: DBArticle[] }>(session, '/articles')()
