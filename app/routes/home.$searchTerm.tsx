import { LoaderFunctionArgs, json } from '@remix-run/node'
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import { Suspense } from 'react'
import invariant from 'tiny-invariant'
import { article, getArticles as getMockArticles } from '~/data'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.searchTerm, 'Missing searchTerm param')
  const { success, response } = getMockArticles()

  if (!success) {
    throw new Error(response.statusText, { cause: response })
  }

  return json(response)
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
  const articles = useLoaderData<typeof loader>()

  return (
    <Suspense fallback={<Loading />}>
      <section className='bg-[#F5F6F7] px-[16px] py-[40px]'>
        <h2 className='mb-[58px] font-robotoSlab text-[30px] leading-[34px] text-[#1A1B22]'>
          Search results
        </h2>
        <ul className='grid w-full grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3'>
          {articles.map((article) => (
            <ArticleCard data={article} key={article._id} />
          ))}
        </ul>
      </section>
    </Suspense>
  )
}

function ArticleCard({ data }: { data: article }) {
  return (
    <li className='mx-auto flex h-[440px] w-full flex-col rounded-lg bg-white shadow-sm shadow-gray-100'>
      <img
        src={data.image}
        alt={data.title}
        className='h-[196px] w-full rounded-t-lg object-cover'
      />
      <div className='flex flex-grow flex-col p-[16px]'>
        <p className='mb-[10px] font-sspro text-[18px] leading-[24px] text-[#b6bcbf]'>
          {new Date(data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <h2 className='mb-[14px] w-full font-robotoSlab text-[22px] leading-[24px] text-[#1A1B22]'>
          {data.title}
        </h2>
        <p className='mb-[8px] flex flex-grow text-[16px] leading-[22px] text-[#1A1B22]'>
          {data.text}
        </p>
        <p className='font-robotoSlab text-[16px] font-bold leading-[20px] text-[#B6BCBF]'>
          {data.source.toUpperCase()}
        </p>
      </div>
    </li>
  )
}

function Loading() {
  return (
    <div className='flex flex-col items-center gap-[24px] py-[40px] align-middle'>
      <div className='h-[74px] w-[74px] bg-[url("../public/images/Ellipse.svg")] bg-cover '></div>
      <p className='text-[18px] text-[#b6bcbf]'>Searching for news...</p>
    </div>
  )
}

function NoArticle() {
  return (
    <section className='flex flex-col items-center gap-[24px] bg-[#F5F6F7] px-[16px] pb-[80px] pt-[86px] align-middle'>
      <div className='h-[74px] w-[74px] bg-[url("../public/images/not-found_v1.svg")] bg-cover '></div>
      <p className='font-robotoSlab text-[26px] leading-[30px] text-[#1A1B22]'>
        Nothing Found
      </p>
      <p className='w-[65%] max-w-[356] text-center text-[18px] text-[#b6bcbf]'>
        Sorry, but nothing matches your search terms
      </p>
    </section>
  )
}
