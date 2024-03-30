import { LoaderFunctionArgs, json } from '@remix-run/node'
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import clsx from 'clsx'
import { Suspense, useEffect, useRef } from 'react'
import invariant from 'tiny-invariant'
import {
  ArticleCard,
  ArticleGalleryLayout,
  ResultArticleControls,
} from '~/atoms/article-gallery-atoms'
import { Article, getArticles as getMockArticles } from '~/data'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.searchTerm, 'Missing searchTerm param')
  const url = new URL(request.url)
  const amount = url.searchParams.get('amount') || '6'

  const { success, response } = getMockArticles(
    params.searchTerm,
    Number(amount),
  )

  if (!success) {
    throw new Error(response.statusText, { cause: response })
  }

  return json({ response, amount })
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    )
  }

  return <NoArticle />
}

export default function SearchResults() {
  const { response: articles, amount } = useLoaderData<typeof loader>()
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (amount === '6') {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [articles, amount])

  return (
    <Suspense fallback={<Loading />}>
      <ArticleGalleryLayout
        title='Search results'
        topRef={resultsRef}
        amount={amount}
      >
        {articles.map((article) => (
          <ResultArticleCard data={article} key={article._id} />
        ))}
      </ArticleGalleryLayout>
    </Suspense>
  )
}

export function ResultArticleCard({ data }: { data: Article }) {
  return (
    <ArticleCard data={data}>
      <ResultArticleControls />
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
          'bg-[url("../public/images/Ellipse.svg")] bg-cover', 
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
          'bg-[url("../public/images/not-found_v1.svg")] bg-cover', 
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
