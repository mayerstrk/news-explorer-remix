import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
} from '@vercel/remix'
import { Form, useLoaderData, useNavigation } from '@remix-run/react'
import clsx from 'clsx'
import { useEffect, useMemo, useRef } from 'react'
import invariant from 'tiny-invariant'
import {
  ArticleCard,
  ArticleControlLayout,
  ArticleGalleryLayout,
} from '~/atoms/article-gallery-atoms'

import { destroySession } from '~/session.server'
import { getMockArticles } from '~/mock-articles'
import { franc } from 'franc'
import {
  DBArticle,
  getSavedArticles,
  saveArticle,
} from '~/services.server/db-api/articles'
import { NewsApiArticle } from '~/services.server/news-api/news-api'
import { AuthState, serverAuthPublicRoute } from '~/services.server/db-api/auth'
import { Route } from '~/utils/enums'

type LoaderReturnType = Promise<
  | TypedResponse<{
      signedIn: true
      articles: NewsApiArticle[]
      savedArticles: DBArticle[]
      amount: string
    }>
  | TypedResponse<{
      signedIn: false
      articles: NewsApiArticle[]
      savedArticles: null
      amount: string
    }>
  | TypedResponse<never>
>

type ActionReturnType = Promise<
  TypedResponse<{ success: boolean; message: string }>
>

export const loader = async ({
  params,
  request,
}: LoaderFunctionArgs): LoaderReturnType => {
  const { session, authState } = await serverAuthPublicRoute(request)

  if (authState === AuthState.tokenValidationFailed) {
    return redirect(Route.home, {
      headers: { 'Set-Cookie': await destroySession(session) },
    })
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

  if (authState === AuthState.signedIn) {
    const {
      success: getSavedArticlesSuccess,
      response: getSavedArticlesResponse,
    } = await getSavedArticles(session)

    if (!getSavedArticlesSuccess) {
      throw new Error(getSavedArticlesResponse.message, {
        cause: getSavedArticlesResponse,
      })
    }
    return json({
      signedIn: true,
      articles,
      savedArticles: getSavedArticlesResponse.data,
      amount,
    })
  }

  return json({
    signedIn: false,
    articles,
    savedArticles: null,
    amount,
  })
}

export const action = async ({
  request,
}: ActionFunctionArgs): ActionReturnType => {
  const { session, authState } = await serverAuthPublicRoute(request)

  if (authState === AuthState.tokenValidationFailed) {
    return redirect(Route.home, {
      headers: { 'Set-Cookie': await destroySession(session) },
    })
  }

  const formData = await request.formData()
  const serializedArticle = formData.get('article')
  invariant(
    serializedArticle && typeof serializedArticle === 'string',
    'Missing or invalid article',
  )
  const article = JSON.parse(serializedArticle)

  const { success, response } = await saveArticle(article, session)

  if (!success) {
    console.error('failed to save article')
    console.error(response)
    return json({ success: false, message: 'failed' }, { status: 500 })
  }

  console.log('save article success', article)

  return json({ success: true, message: 'success' }, { status: 200 })
}

export default function SearchResults() {
  const { signedIn, articles, savedArticles, amount } =
    useLoaderData<typeof loader>()
  const resultsRef = useRef<HTMLDivElement>(null)
  const navigation = useNavigation()

  useEffect(() => {
    const fromSearch = navigation.location?.state?.fromSearch
    if (fromSearch) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [navigation])

  return articles ? (
    <>
      <ArticleGalleryLayout
        title='Search results'
        topRef={resultsRef}
        amount={Number(amount)}
      >
        {articles.slice(0, Number(amount)).map((article) => {
          let isSaved = false
          if (signedIn) {
            isSaved = savedArticles.some(
              (savedArticle) => savedArticle.link === article.url,
            )
          }
          return (
            <ResultArticleCard
              isSaved={isSaved}
              data={article}
              key={Math.random()}
              signedIn={signedIn}
            />
          )
        })}
      </ArticleGalleryLayout>
    </>
  ) : (
    <NoArticle />
  )
}

export function ResultArticleCard({
  data,
  isSaved,
  signedIn,
}: {
  data: NewsApiArticle
  isSaved: boolean
  signedIn: boolean
}) {
  const navigation = useNavigation()
  const formName = `save-article-${data.title! + Math.floor(Math.random())}` // Ensure data.url is a unique identifier

  // Determine if this specific form is processing
  const isProcessingCurrent = useMemo(() => {
    return (
      navigation.state !== 'idle' &&
      navigation.formData?.get('formName') === formName
    )
  }, [navigation, formName])

  return (
    <ArticleCard data={data}>
      <div className='absolute right-[16px] top-[16px] md:right-[8px] md:top-[8px] xl:right-[24px] xl:top-[24px]'>
        <ArticleControlLayout>
          <Form method='post'>
            <input type='hidden' name='article' value={JSON.stringify(data)} />
            <input type='hidden' name='formName' value={formName} />
            <button
              type='submit'
              className={clsx(
                'h-[26px] w-[26px] bg-contain', // Base dimensions and background scaling
                (!isSaved && isProcessingCurrent) || isSaved
                  ? 'bg-[url("/images/bookmark-active.svg")]'
                  : 'bg-[url("/images/bookmark.svg")]',
              )}
              disabled={!signedIn || isSaved || isProcessingCurrent}
            ></button>
          </Form>
        </ArticleControlLayout>
      </div>
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
