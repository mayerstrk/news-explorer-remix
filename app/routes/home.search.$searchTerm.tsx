import { LoaderFunctionArgs, json, redirect } from '@vercel/remix'
import { useLoaderData, useNavigation } from '@remix-run/react'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import invariant from 'tiny-invariant'
import {
  Article,
  ArticleCard,
  ArticleGalleryLayout,
  ResultArticleControls,
} from '~/atoms/article-gallery-atoms'

import { destroySession, getSession } from '~/session.server'
import { authenticateUser } from '~/services/auth.server'
import { getMockArticles } from '~/mock-articles'
import { franc } from 'franc'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  // Validation
  const session = await getSession(request.headers.get('Cookie'))

  const token = session.get('token')

  if (token) {
    const { success: validationSuccess } = await authenticateUser(token)

    if (!validationSuccess) {
      return redirect('/home', {
        headers: { 'Set-Cookie': await destroySession(session) },
      })
    }
  }

  // Route specific
  invariant(params.searchTerm, 'Missing searchTerm param')
  const url = new URL(request.url)
  const amount = url.searchParams.get('amount') || '6'

  // const currentDate = new Date()
  // const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)

  // const to = currentDate.toISOString().split('T')[0]
  // const from = sevenDaysAgo.toISOString().split('T')[0]
  //
  // const endpoint =
  //   `/everything?` +
  //   `q=${encodeURIComponent(params.searchTerm)}&` + // Ensure the search term is URL-encoded
  //   `from=${from}&` +
  //   `to=${to}&` +
  //   `pageSize=100&` +
  //   `sortBy=publishedAt`

  const { success, response } = await getMockArticles()

  if (!success) {
    throw new Error(response.status, { cause: response })
  }

  const articles = response.articles.filter(
    (article) =>
      article.content !== '[REMOVED]' &&
      article.title &&
      franc(article.title) === 'eng' &&
      franc(article.content) === 'eng',
  )

  return json(
    {
      articles,
      amount,
    },
    { headers: { 'Cache-Control': 'public, max-age=300' } },
  )
}

export default function SearchResults() {
  const { articles, amount } = useLoaderData<typeof loader>()
  const resultsRef = useRef<HTMLDivElement>(null)
  const navigation = useNavigation()

  useEffect(() => {
    // to handle the first search since default amount is 6
    const fromSearch = navigation.location?.state?.fromSearch
    if (fromSearch) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [navigation])

  return articles.length > 0 ? (
    <>
      <ArticleGalleryLayout
        title='Search results'
        topRef={resultsRef}
        amount={amount}
      >
        {articles.slice(0, Number(amount)).map((article) => (
          <ResultArticleCard data={article} key={Math.random()} />
        ))}
      </ArticleGalleryLayout>
    </>
  ) : (
    <NoArticle />
  )
}

export function ResultArticleCard({ data }: { data: Article }) {
  return (
    <ArticleCard data={data}>
      <ResultArticleControls article={data} />
    </ArticleCard>
  )
}

export function Loading() {
  return (
    <div
      className={clsx(
        'flex flex-col items-center align-middle', // display
        'gap-[24px] py-[40px]', // margin and padding
      )}
    >
      <div
        className={clsx(
          'h-[74px] w-[74px]',
          'bg-[url("/images/Ellipse.svg")] bg-cover',
        )}
      ></div>
      <p
        className={clsx(
          'text-[18px]', // typography
          'text-[#b6bcbf]',
        )}
      >
        Searching for news...
      </p>
    </div>
  )
}

function NoArticle() {
  return (
    <section
      className={clsx(
        'flex flex-col items-center align-middle', // display
        'gap-[24px] px-[16px] pb-[80px] pt-[86px]', // margin and padding
        'bg-[#F5F6F7]',
      )}
    >
      <div
        className={clsx(
          'h-[74px] w-[74px]',
          'bg-[url("/images/not-found_v1.svg")] bg-cover',
        )}
      ></div>
      <p
        className={clsx(
          'font-robotoSlab text-[26px] leading-[30px]', // typography
          'text-[#1A1B22]',
        )}
      >
        Nothing Found
      </p>
      <p
        className={clsx(
          'w-[65%] max-w-[356px]',
          'text-center', // display
          'text-[18px]', // typography
          'text-[#b6bcbf]',
        )}
      >
        Sorry, but nothing matches your search terms
      </p>
    </section>
  )
}
