import { ApiEndpoint } from '~/utils/string-unions'
import { protectedRequestBuilder } from './utils/protected-db-request-builder.server'

export type DBArticle = {
  article_id: number
  keyword: string
  title: string
  text: string
  date: Date
  source: string
  link: string
  image: string
  created_at: Date
  updated_at: Date
  owner: number
}

// export const saveArticle = await protectedRequestBuilder<DBArticle>(
//   token,
//   '/articles',
//   {
//     method: 'POST',
//   },
// )
export const delteArticle = async (token: string, articleId: string) =>
  await protectedRequestBuilder<DBArticle>(
    token,
    ('/articles/' + articleId) as ApiEndpoint,
    {
      method: 'DELETE',
    },
  )

export const getSavedArticles = async (token: string) =>
  protectedRequestBuilder<DBArticle[]>(token, '/articles')()
