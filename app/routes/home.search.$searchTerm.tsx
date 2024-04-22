import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
} from '@vercel/remix'
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useNavigation,
  useRouteError,
} from '@remix-run/react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import invariant from 'tiny-invariant'
import {
  ArticleCard,
  ArticleControlLayout,
  ArticleGalleryLayout,
} from '~/atoms/article-gallery-atoms'

import { destroySession } from '~/session.server'
import { franc } from 'franc'
import {
  DBArticle,
  deleteArticle,
  getSavedArticles,
  saveArticle,
} from '~/services.server/db-api/articles'
import {
  NewsApiArticle,
  getArticles,
} from '~/services.server/news-api/news-api'
import { AuthState, serverAuthPublicRoute } from '~/services.server/db-api/auth'
import { PopupName, Route } from '~/utils/enums'
import { usePopupToggle } from '~/hooks/zustand/use-popup'

type LoaderReturnType = Promise<
  | TypedResponse<{
      signedIn: true
      articles: NewsApiArticle[]
      savedArticles: DBArticle[]
      amount: number
    }>
  | TypedResponse<{
      signedIn: false
      articles: NewsApiArticle[]
      savedArticles: null
      amount: number
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
  let amount = Number(url.searchParams.get('amount')) || 6

  const currentDate = new Date()
  const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)

  const to = currentDate.toISOString().split('T')[0]
  const from = sevenDaysAgo.toISOString().split('T')[0]

  const endpoint =
    `/everything?` +
    `q=${encodeURIComponent(params.searchTerm)}&` + // Ensure the search term is URL-encoded
    `from=${from}&` +
    `to=${to}&` +
    `pageSize=100&` +
    `sortBy=publishedAt`

  const { success, response } = await getArticles(endpoint)

  if (!success) {
    console.error('Failed to get articles', { cause: response })
    throw json(
      {
        signedIn: true,
        username: session.data.username,
        message: 'Failed to get articles',
      },
      { status: Number(response.status) },
    )
  }
  const articles = response.articles.filter(
    (article) =>
      article.content !== '[REMOVED]' &&
      article.title &&
      franc(article.title) === 'eng' &&
      franc(article.content || '') === 'eng',
  )

  amount = articles.length < amount ? articles.length : amount

  console.log('amount', amount)
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
  params,
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
  const intent = formData.get('intent')
  switch (intent) {
    case 'save': {
      const keyword = params.searchTerm
      invariant(keyword, 'Missing keyword')
      const { success, response } = await saveArticle(article, keyword, session)

      if (!success) {
        console.error('failed to save article')
        console.error(response)
        return json({ success: false, message: 'failed' }, { status: 500 })
      }

      console.log('save article success', article)

      return json({ success: true, message: 'success' }, { status: 200 })
    }
    case 'delete': {
      const { success, response } = await getSavedArticles(session)
      if (!success) {
        throw json(
          {
            signedIn: true,
            username: session.data.username,
            message: 'failde to delete article',
          },
          { status: 400 },
        )
      }
      const articleId = response.data.find(
        (responseArticle) => article.url === responseArticle.link,
      )?.article_id

      invariant(articleId, 'Invalid or missing articleId')

      const {
        success: isDeleteArticleSuccess,
        response: deleteArticleResponse,
      } = await deleteArticle(articleId.toString(), session)

      if (!isDeleteArticleSuccess) {
        console.error('Failed to delete article')
        console.error(JSON.stringify(deleteArticleResponse))
        return json(
          {
            success: false,
            message:
              deleteArticleResponse.message || 'Failed to delete article',
          },
          { status: deleteArticleResponse.status },
        )
      }

      return json(
        { success: true, message: 'Article deleted successfully' },
        { status: 200 },
      )
    }
    default: {
      throw json(
        {
          signedIn: true,
          username: session.data.username,
          message: 'Unexpected action',
        },
        { status: 400 },
      )
    }
  }
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

  return articles.length > 0 ? (
    <>
      <ArticleGalleryLayout
        title='Search results'
        topRef={resultsRef}
        amountParam={amount}
        amount={articles.length}
      >
        {articles.slice(0, amount).map((article) => {
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
              key={article.url}
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
  const [isHovered, setIsHovered] = useState(false)
  const [isProcessingCurrent, setIsProccessingCurrent] = useState(false)
  const navigation = useNavigation()
  const formName = `save-article-${data.title! + Math.floor(Math.random())}`
  const toggleSignInPopup = usePopupToggle(PopupName.signin)

  useEffect(() => {
    if (
      navigation.state !== 'idle' &&
      navigation.formData?.get('formName') === formName
    ) {
      setIsProccessingCurrent(true)
    }
  }, [navigation.state, navigation.formData, formName, setIsProccessingCurrent])

  return (
    <ArticleCard data={data}>
      <div className='absolute right-[16px] top-[16px] md:right-[8px] md:top-[8px] xl:right-[24px] xl:top-[24px]'>
        <ArticleControlLayout>
          {signedIn ? (
            <Form
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              method='post'
              className='flex'
            >
              <input
                type='hidden'
                name='article'
                value={JSON.stringify(data)}
              />
              <input type='hidden' name='formName' value={formName} />
              <button
                type='submit'
                name='intent'
                value={isSaved ? 'delete' : 'save'}
                className={clsx(
                  'h-[26px] w-[26px] bg-contain',
                  signedIn && 'hover:bg-[url("/images/bookmark--hover.svg")]',
                  (!isSaved && isProcessingCurrent) || isSaved
                    ? 'bg-[url("/images/bookmark-active.svg")]'
                    : 'bg-[url("/images/bookmark.svg")]',
                )}
              ></button>
            </Form>
          ) : (
            <>
              <button
                type='button'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={toggleSignInPopup}
                className={clsx(
                  'h-[26px] w-[26px] bg-contain',
                  'bg-[url("/images/bookmark.svg")] hover:bg-[url("/images/bookmark--hover.svg")] ',
                )}
              ></button>
              {isHovered && (
                <div className='w-[159px] md:absolute md:-left-[164px] md:top-0'>
                  <ArticleControlLayout>
                    Sign in to save articles
                  </ArticleControlLayout>
                </div>
              )}
            </>
          )}
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
        'bg-gradient-to-b from-[#F5F6F7] via-white to-[#f5f6f7]',
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
        'bg-gradient-to-b from-[#F5F6F7] via-white to-[#f5f6f7]',
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

function ErrorComponent() {
  return (
    <section
      className={clsx(
        'flex flex-col items-center align-middle', // display
        'gap-[24px] px-[16px] pb-[80px] pt-[86px]', // margin and padding
        'bg-gradient-to-b from-[#F5F6F7] via-white to-[#f5f6f7]',
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
        Sorry, something went wrong
      </p>
      <p
        className={clsx(
          'w-[65%] max-w-[356px]',
          'text-center', // display
          'text-[18px]', // typography
          'text-[#b6bcbf]',
        )}
      >
        There may be a connection issue or the server may be down. Please try
        again later.
      </p>
    </section>
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

  return <ErrorComponent />
}
