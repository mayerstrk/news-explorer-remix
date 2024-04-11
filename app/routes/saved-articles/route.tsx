import { LoaderFunctionArgs } from '@vercel/remix'
import SavedArticlesHeader from './saved-articles-header'
import { redirect, useLoaderData } from '@remix-run/react'
import { Suspense, useRef } from 'react'
import {
  ArticleCard,
  ArticleGalleryLayout,
  SavedArticleControls,
} from '~/atoms/article-gallery-atoms'
import clsx from 'clsx'
import { destroySession, getSession } from '~/session.server'
import NavBarMain from '~/root-layout-components/nav-bar-main'
import { DBArticle, getSavedArticles } from '~/services/articles.server'
import { authenticateUser } from '~/services/auth.server'

type LoaderData = {
  signedIn: boolean
  amount: string
  username: string
  articles: DBArticle[]
}

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<LoaderData | Response> => {
  // check if user is authenticated locally
  const session = await getSession(request.headers.get('Cookie'))

  const token = session.get('token')

  if (!token) {
    return redirect('/', {
      headers: { 'Set-Cookie': await destroySession(session) },
    })
  }

  const { success: validationSuccess, response: validationResponse } =
    await authenticateUser(token)

  if (!validationSuccess) {
    return redirect('/', {
      headers: { 'Set-Cookie': await destroySession(session) },
    })
  }

  // get articles
  const url = new URL(request.url)
  const amount = url.searchParams.get('amount') || '12'

  const { success, response } = await getSavedArticles(token)

  if (!success) {
    console.error(response.message, { cause: response })
    return redirect('/')
  }

  console.log('response.data: ', response.data)

  return {
    articles: response.data,
    amount,
    username: validationResponse.data.name,
    signedIn: true,
  }
}

export default function Saved() {
  const { signedIn, username, articles, amount } =
    useLoaderData<typeof loader>()
  return (
    <>
      <NavBarMain color='black' signedIn={signedIn} username={username} />
      <SavedArticlesHeader username={username} />
      <Gallery articles={articles} amount={amount} />
    </>
  )
}

function Gallery({
  articles,
  amount,
}: Pick<LoaderData, 'articles' | 'amount'>) {
  const resultsRef = useRef<HTMLDivElement>(null)

  console.log('gallery  rendered')

  return (
    <Suspense fallback={<Loading />}>
      {articles.length > 0 ? (
        <ArticleGalleryLayout title='' topRef={resultsRef} amount={amount}>
          {articles.map((article) => (
            <SavedArticleCard data={article} key={article.article_id} />
          ))}
        </ArticleGalleryLayout>
      ) : (
        <NoArticle />
      )}
    </Suspense>
  )
}

function SavedArticleCard({ data }: { data: DBArticle }) {
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
          'bg-[url("/images/Ellipse.svg")] bg-cover',
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
