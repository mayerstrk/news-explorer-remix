import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
} from '@vercel/remix'
import {
  Form,
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  useNavigation,
  useRouteError,
} from '@remix-run/react'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import invariant from 'tiny-invariant'
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
      amountParam: number
    }>
  | TypedResponse<{
      signedIn: false
      articles: NewsApiArticle[]
      savedArticles: null
      amountParam: number
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
      amountParam: amount,
    })
  }

  return json({
    signedIn: false,
    articles,
    savedArticles: null,
    amountParam: amount,
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
  const { signedIn, articles, savedArticles, amountParam } =
    useLoaderData<typeof loader>()
  const resultsRef = useRef<HTMLDivElement>(null)
  const navigation = useNavigation()

  useEffect(() => {
    const fromSearch = navigation.location?.state?.fromSearch
    if (fromSearch) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [navigation])

  const location = useLocation()

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [resultsRef])

  useEffect(() => {
    if (location.state?.fromSearch) {
      scrollToTop()
    }
  }, [location, scrollToTop])

  return articles.length > 0 ? (
    <>
      {navigation.state === 'loading' &&
      navigation.location?.state?.fromSearch ? (
        <Loading />
      ) : (
        <>
          <section
            id='search-term-gallery'
            ref={resultsRef}
            className={clsx(
              'relative', // positioning
              'flex flex-col items-center', // display
              'bg-[#F5F6F7]', // background
            )}
          >
            <button
              className={clsx(
                'fixed  bottom-[20px] right-[20px] z-50', // positioning
                'flex items-center justify-center', // display
                'h-12 w-12 max-w-12', // dimensions
                'rounded-full bg-white ', // background
                'text-sm', // typography
                'shadow-sm shadow-white md:hidden', // effects
              )}
              onClick={scrollToTop}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-align-vertical-justify-start'
              >
                <rect width='14' height='6' x='5' y='16' rx='2' />
                <rect width='10' height='6' x='7' y='6' rx='2' />
                <path d='M2 2h20' />
              </svg>
            </button>
            <div
              className={clsx(
                'flex flex-col items-center', // display
                'bg-[#F5F6F7]', // background
                'px-[16px]', // padding
                'max-w-[1920px]', // dimensions
                'md:px-[40px]', // md
              )}
            >
              <h2
                className={clsx(
                  'mt-[32px] md:mt-[40px] xl:mt-[80px]', // spacing
                  'self-start', // positioning
                  'font-robotoSlab text-[30px] leading-[34px] text-[#1A1B22] xl:text-[40px] xl:leading-[46px]', // typography
                )}
              >
                Search results
              </h2>
              <ul
                className={clsx(
                  'mb-[13px] mt-[58px] gap-[10px] md:mb-[32px] md:mt-[32px] xl:mb-[64px] xl:mt-[62px] xl:gap-[16px]', // spacing
                  'grid w-fit grid-cols-1 md:grid-cols-3 ', // display
                  'rounded-full', // effects
                  'rounded-full', // effects
                )}
              >
                {articles.slice(0, amountParam).map((article) => {
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
              </ul>
              <div
                className={clsx(
                  'mb-[24px] mt-[8px] md:mb-[40px] md:mt-0 xl:mb-[80px]', // spacing
                  'flex flex-col items-center', // display
                )}
              >
                {navigation.location?.state?.showMore && <Loading />}

                <Link
                  preventScrollReset={true}
                  className={clsx(
                    'h-[56px] w-[288px] md:w-[240px] xl:h-[64px] xl:w-[288px]', // dimensions
                    'rounded-full', // effects
                    'bg-white ', // background
                    'text-[18px] font-medium leading-[24px]', // typography
                    'hover:bg-[#E8E8E8]', // hover
                    'flex items-center justify-center',
                  )}
                  to={`?amount=${(Math.ceil(amountParam / 6) + 1) * 6}`}
                  type='button'
                  state={{ showMore: true }}
                >
                  Show More
                </Link>
                {amountParam > 6 && (
                  <button
                    onClick={scrollToTop}
                    className={clsx(
                      'mt-[12px]', // margin
                      'text-sm font-medium', // typography
                      'md:block', // md
                      'hover:text-gray-600', // hover
                    )}
                  >
                    Back to top
                  </button>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  ) : (
    <NoArticle />
  )
}

function ResultArticleCard({
  data,
  isSaved,
  signedIn,
}: {
  data: NewsApiArticle
  isSaved: boolean
  signedIn: boolean
}) {
  const [noImage, setNoImage] = useState(false)

  const { urlToImage: imageUrl, title, content } = data
  const date = data.publishedAt?.split('T')[0]
  const sourceName = data.source.name

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
    <li className='relative mx-auto flex h-[440px] w-full flex-col rounded-lg bg-white shadow-sm shadow-gray-100 md:h-[420px] md:w-[224px] xl:h-[576px] xl:w-[400px]'>
      <div className='absolute right-[16px] top-[16px] md:right-[8px] md:top-[8px] xl:right-[24px] xl:top-[24px]'>
        <div
          className={clsx(
            'flex items-center justify-center rounded-lg', // display
            'bg-white ', // background
            'p-[8px] ', // margin and padding
            'text-[14px] font-medium leading-[24px]', // typography
          )}
        >
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
                  <div
                    className={clsx(
                      'flex items-center justify-center rounded-lg', // display
                      'bg-white ', // background
                      'p-[8px] ', // margin and padding
                      'text-[14px] font-medium leading-[24px]', // typography
                    )}
                  >
                    Sign in to save articles
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {imageUrl && !noImage ? (
        <img
          src={imageUrl}
          alt={title || 'Article image'}
          className='mb-16px md:-min-h-[150px] min-h-[196px] w-full rounded-t-lg object-cover xl:min-h-[272px]'
          onError={() => setNoImage(true)}
        />
      ) : (
        <div className='mb-16px md:-min-h-[150px] flex min-h-[196px] w-full items-center justify-center rounded-t-lg bg-pink-300 object-cover p-16 md:p-6 xl:min-h-[272px]'>
          <p className='truncate text-wrap font-sspro text-sm font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]'>
            {title || 'Article image'}
          </p>
        </div>
      )}
      <article className='flex flex-grow flex-col overflow-hidden p-[16px]'>
        <p className='mb-[10px] font-sspro text-[18px] leading-[24px] text-[#b6bcbf] xl:px-[24px] xl:pt-[17px]'>
          {date}
        </p>
        <h2 className='mb-[14px] min-h-[24px] w-full truncate font-robotoSlab text-[22px] leading-[24px] text-[#1A1B22] xl:px-[24px] xl:text-[26px] xl:leading-[30px]'>
          {title}
        </h2>
        <p className='mb-[8px] flex-grow overflow-auto text-wrap p-[16px] text-[16px] leading-[22px] text-[#1A1B22] xl:px-[24px]'>
          {content}
        </p>
        <p className='font-robotoSlab text-[16px] font-bold leading-[20px] text-[#B6BCBF] xl:px-[24px]'>
          {sourceName?.toUpperCase() || ''}
        </p>
      </article>
    </li>
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
