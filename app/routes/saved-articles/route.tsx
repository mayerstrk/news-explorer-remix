import { LoaderFunctionArgs, json } from '@vercel/remix'
import SavedArticlesHeader from './saved-articles-header'
import {
  isRouteErrorResponse,
  redirect,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import { Suspense, useRef } from 'react'
import {
  ArticleCard,
  ArticleGalleryLayout,
  SavedArticleControls,
} from '~/atoms/article-gallery-atoms'
import { Article, getArticles as getMockArticles } from '~/data'
import clsx from 'clsx'
import { getSession } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))

  if (!session.has('token')) {
    return redirect('/')
  }
  const url = new URL(request.url)
  const amount = url.searchParams.get('amount') || '12'

  const { success, response } = getMockArticles('Saved article', Number(amount))

  if (!success) {
    throw new Error(response.statusText, { cause: response })
  }

  return json({ response, amount })
}

export default function Saved() {
  return (
    <>
      <SavedArticlesHeader />
      <Gallery />
    </>
  )
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

function Gallery() {
  const { response: articles, amount } = useLoaderData<typeof loader>()
  const resultsRef = useRef<HTMLDivElement>(null)

  return (
    <Suspense fallback={<Loading />}>
      <ArticleGalleryLayout title='' topRef={resultsRef} amount={amount}>
        {articles.map((article) => (
          <SavedArticleCard data={article} key={article._id} />
        ))}
      </ArticleGalleryLayout>
    </Suspense>
  )
}

function SavedArticleCard({ data }: { data: Article }) {
  return (
    <ArticleCard data={data}>
      <SavedArticleControls keyword={data.keyword} />
    </ArticleCard>
  )
}

function Loading() {
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
        className='text-[18px] text-[#b6bcbf]' // typography
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
