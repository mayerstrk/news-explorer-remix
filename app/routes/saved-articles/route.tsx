import { LoaderFunctionArgs, TypedResponse } from '@vercel/remix'
import SavedArticlesHeader from './saved-articles-header'
import {
  json,
  redirect,
  useFetcher,
  useLoaderData,
  useNavigation,
} from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import {
  ArticleCard,
  ArticleControlLayout,
  ArticleGalleryLayout,
} from '~/atoms/article-gallery-atoms'
import clsx from 'clsx'
import NavBarMain from '~/root-layout-components/nav-bar-main'
import { DBArticle, getSavedArticles } from '~/services.server/db-api/articles'
import { serverAuthProtectedRoute } from '~/services.server/db-api/auth'
import { Route } from '~/utils/enums'
import { ExtractLoaderData } from '~/types/utility-types'

type LoaderReturnType = Promise<
  TypedResponse<{
    signedIn: boolean
    amount: string
    username: string
    articles: DBArticle[]
  }>
>
type LoaderData = ExtractLoaderData<LoaderReturnType>

export const loader = async ({
  request,
}: LoaderFunctionArgs): LoaderReturnType => {
  const {
    session,
    response: {
      data: { name: username },
    },
  } = await serverAuthProtectedRoute(request)

  // get articles
  const url = new URL(request.url)
  const amount = url.searchParams.get('amount') || '12'

  const { success, response } = await getSavedArticles(session)

  if (!success) {
    console.error(response.message, { cause: response })
    return redirect(Route.home)
  }

  return json(
    {
      articles: response.data,
      amount,
      username,
      signedIn: true,
    },
    { status: 200 },
  )
}

export default function Saved() {
  const { signedIn, username, articles, amount } =
    useLoaderData<typeof loader>()
  console.log(articles)
  const realAmount = articles.length

  return (
    <>
      <NavBarMain color='black' signedIn={signedIn} username={username} />
      <SavedArticlesHeader amount={realAmount} username={username} />
      <Gallery articles={articles} amount={amount} />
    </>
  )
}

function Gallery({
  articles: staleArticles,
  amount,
}: {
  articles: LoaderData['articles']
  amount: LoaderData['amount']
}) {
  const [articles, setArticles] = useState(staleArticles)
  const resultsRef = useRef<HTMLDivElement>(null)
  const navigation = useNavigation()
  const fetcher = useFetcher<LoaderData>()
  const load = fetcher.load
  const fetcherData = fetcher.data

  useEffect(() => {
    if (!navigation.location?.state.showMore) {
      load(Route.savedArticles)
    }
  }, [navigation, load])

  useEffect(() => {
    setArticles(fetcherData ? fetcherData.articles : staleArticles)
  }, [fetcherData, staleArticles])

  return (
    <div>
      {articles.length > 0 ? (
        <ArticleGalleryLayout title='' topRef={resultsRef} amount={amount}>
          {articles.slice(0, Number(amount)).map((article) => (
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
  const [isSaved, setIsSaved] = useState(true)
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
            <button
              className={clsx(
                'h-[24px] w-[24px]', // dimensions
                'bg-[url("/images/trash.svg")]', // background
                'hover:bg-[url("/images/trash--hover.svg")]', // hover
              )}
              onClick={() => setIsSaved(!isSaved)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            ></button>
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
        Sorry, but nothing matches your search terms
      </p>
    </section>
  )
}
