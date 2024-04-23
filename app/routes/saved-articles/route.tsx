import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
} from '@vercel/remix'
import SavedArticlesHeader from './saved-articles-header'
import {
  ErrorResponse,
  Form,
  json,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRouteError,
  useSearchParams,
} from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import NavBarMain from '~/root-layout-components/nav-bar-main'
import {
  DBArticle,
  deleteArticle,
  getSavedArticles,
} from '~/services.server/db-api/articles'
import { serverAuthProtectedRoute } from '~/services.server/db-api/auth'
import { Route } from '~/utils/enums'
import { ExtractLoaderData } from '~/types/utility-types'
import invariant from 'tiny-invariant'

type LoaderReturnType = Promise<
  TypedResponse<{
    signedIn: boolean
    amount: number
    username: string
    articles: DBArticle[]
    keywords: string[]
  }>
>
type LoaderData = ExtractLoaderData<LoaderReturnType>

type ActionReturnType = Promise<
  TypedResponse<{ success: boolean; message: string }>
>

export const loader = async ({
  request,
}: LoaderFunctionArgs): LoaderReturnType => {
  const {
    session,
    response: {
      data: { name: username },
    },
  } = await serverAuthProtectedRoute(request)
  const url = new URL(request.url)
  const amount = Number(url.searchParams.get('amount')) || 6

  // get articles
  const { success, response } = await getSavedArticles(session)

  if (!success) {
    console.error(response.message, { cause: response })
    throw json(
      { username, signdIn: true, message: response.message },
      {
        status: 500,
      },
    )
  }
  return json(
    {
      articles: response.data,
      amount: response.data.length < amount ? response.data.length : amount,
      keywords: response.data.map((article) => article.keyword),
      username,
      signedIn: true,
    },
    { status: 200 },
  )
}

export const action = async ({
  request,
}: ActionFunctionArgs): ActionReturnType => {
  const { session } = await serverAuthProtectedRoute(request)

  const formData = await request.formData()
  const serializedArticleId = formData.get('articleId')
  console.log(serializedArticleId)
  invariant(
    serializedArticleId && typeof serializedArticleId === 'string',
    'Invalid or missing articleId 1',
  )
  const articleId = JSON.parse(serializedArticleId)

  const { success: isDeleteArticleSuccess, response: deleteArticleResponse } =
    await deleteArticle(articleId, session)

  if (!isDeleteArticleSuccess) {
    console.error('Failed to delete article')
    console.error(JSON.stringify(deleteArticleResponse))
    return json(
      {
        success: false,
        message: deleteArticleResponse.message || 'Failed to delete article',
      },
      { status: deleteArticleResponse.status },
    )
  }

  console.log('article deleted successfully')

  return json(
    { success: true, message: 'Article deleted successfully' },
    { status: 200 },
  )
}
export default function Saved() {
  const {
    signedIn,
    username,
    articles: loaderArticles,
    amount: loaderAmountParam,
    keywords,
  } = useLoaderData<typeof loader>()

  const location = useNavigation().location
  const [, setSearchParams] = useSearchParams()
  const fetcher = useFetcher<LoaderData>()

  useEffect(() => {
    if (location?.state?.fromNav === true) {
      fetcher.load(Route.savedArticles)
    }
  }, [location?.state, fetcher])

  useEffect(() => {
    const articles = fetcher.data?.articles
      ? fetcher.data.articles
      : loaderArticles
    const amount =
      articles.length < loaderAmountParam ? articles.length : loaderAmountParam

    const params = new URLSearchParams()
    params.set('amount', amount.toString())
    setSearchParams(params, {
      preventScrollReset: true,
      state: { fromUpateSearchParam: true },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data, setSearchParams])

  return (
    <>
      <NavBarMain color='black' signedIn={signedIn} username={username} />
      <SavedArticlesHeader
        keywords={keywords}
        amount={loaderArticles.length}
        username={username}
      />
      <Gallery articles={loaderArticles} amountParam={loaderAmountParam} />
    </>
  )
}

function Gallery({
  articles,
  amountParam,
}: {
  articles: LoaderData['articles']
  amountParam: LoaderData['amount']
}) {
  const resultsRef = useRef<HTMLUListElement>(null)

  return (
    <div>
      {articles.length > 0 ? (
        <ArticleGalleryLayout
          title=''
          topRef={resultsRef}
          amount={articles.length}
          amountParam={amountParam}
        >
          {articles.slice(0, Number(amountParam)).map((article) => (
            <SavedArticleCard data={article} key={article.article_id} />
          ))}
        </ArticleGalleryLayout>
      ) : (
        <NoArticle />
      )}
    </div>
  )
}

function SavedArticleCard({ data }: { data: LoaderData['articles'][number] }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <ArticleCard data={data}>
      <div
        className={clsx(
          't-0 absolute inset-x-0', // positioning
          'flex w-full justify-between', // display
          'px-[16px] pt-[16px] md:p-[8px] xl:p-[24px]', // margin and padding
        )}
      >
        <ArticleControlLayout xpadding='22px'>
          {data.keyword}
        </ArticleControlLayout>
        <div
          className={clsx(
            'relative flex gap-[5px]', // display
          )}
        >
          {isHovered && (
            <div className='w-[159px] md:absolute md:-left-[164px] md:top-0'>
              <ArticleControlLayout>Remove from saved</ArticleControlLayout>
            </div>
          )}
          <ArticleControlLayout>
            <Form
              method='post'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className='flex'
            >
              <input
                type='hidden'
                name='articleId'
                value={JSON.stringify(data.article_id)}
              />
              <button
                type='submit'
                className={clsx(
                  'h-[24px] w-[24px]', // dimensions
                  'bg-[url("/images/trash.svg")]', // background
                  'hover:bg-[url("/images/trash--hover.svg")]', // hover
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              ></button>
            </Form>
          </ArticleControlLayout>
        </div>
      </div>
    </ArticleCard>
  )
}

function NoArticle() {
  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-center', // display
        'gap-[24px] px-[16px] pb-[80px] pt-[86px]', // margin and padding
        'w-100', //dimensions
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
        Save your favorite articles to read later! You can save articles by
        clicking the bookmark icon on your search results.
      </p>
    </section>
  )
}

function GalleryErrorComponent() {
  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-center', // display
        'gap-[24px] px-[16px] pb-[80px] pt-[86px]', // margin and padding
        'w-100', //dimensions
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
        There may be a connection issue or the server may be down. Pease try
        again later.
      </p>
    </section>
  )
}

export function ErrorBoundary() {
  const {
    data: { signedIn, username },
  } = useRouteError() as ErrorResponse
  return (
    <>
      <NavBarMain color='black' signedIn={signedIn} username={username} />
      <SavedArticlesHeader
        keywords={['such empty']}
        amount={0}
        username={username}
      />
      <GalleryErrorComponent />
    </>
  )
}
