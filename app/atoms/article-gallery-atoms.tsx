import { Link, useLocation, useNavigation } from '@remix-run/react'
import clsx from 'clsx'
import { ReactNode, RefObject, useCallback, useEffect, useState } from 'react'
import { Loading } from '~/routes/home.search.$searchTerm'
import { DBArticle } from '~/services.server/db-api/articles'
import { NewsApiArticle } from '~/services.server/news-api/news-api'

export function ArticleGalleryLayout({
  children,
  title,
  amountParam,
  amount,
  topRef,
}: {
  children: ReactNode
  title: string
  amountParam: number
  amount: number
  topRef: RefObject<HTMLElement>
}) {
  const navigation = useNavigation()
  const location = useLocation()

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [topRef])

  useEffect(() => {
    if (location.state?.fromSearch) {
      scrollToTop()
    }
  }, [location, scrollToTop, children])

  return navigation.state === 'loading' &&
    navigation.location?.state?.fromSearch ? (
    <Loading />
  ) : (
    <>
      <section
        id='gallery'
        ref={topRef}
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
          {title && (
            <h2
              className={clsx(
                'mt-[32px] md:mt-[40px] xl:mt-[80px]', // spacing
                'self-start', // positioning
                'font-robotoSlab text-[30px] leading-[34px] text-[#1A1B22] xl:text-[40px] xl:leading-[46px]', // typography
              )}
            >
              {title}
            </h2>
          )}
          <ul
            className={clsx(
              'mb-[13px] mt-[58px] gap-[10px] md:mb-[32px] md:mt-[32px] xl:mb-[64px] xl:mt-[62px] xl:gap-[16px]', // spacing
              'grid w-fit grid-cols-1 md:grid-cols-3 ', // display
              'rounded-full', // effects
              'rounded-full', // effects
            )}
          >
            {children}
          </ul>
          <div
            className={clsx(
              'mb-[24px] mt-[8px] md:mb-[40px] md:mt-0 xl:mb-[80px]', // spacing
              'flex flex-col items-center', // display
            )}
          >
            {navigation.location?.state?.showMore && <Loading />}

            {amount > amountParam && (
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
                to={`?amount=${amount < Number(amountParam) + (6 - (Number(amountParam) % 6)) ? amount : Number(amountParam) + (6 - (Number(amountParam) % 6))}`}
                type='button'
                state={{ showMore: true }}
              >
                Show More
              </Link>
            )}
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
  )
}

export function ArticleCard({
  children,
  data,
}: {
  children: ReactNode
  data: NewsApiArticle | DBArticle
}) {
  const [noImage, setNoImage] = useState(false)

  const isArticle = 'urlToImage' in data && 'publishedAt' in data

  const imageUrl = isArticle ? data.urlToImage : data.image
  const title = data.title
  const content = isArticle ? data.content : data.text
  const date = isArticle
    ? data.publishedAt?.split('T')[0]
    : data.date.split('T')[0]
  const sourceName = isArticle ? data.source.name : data.source

  return (
    <li className='relative mx-auto flex h-[440px] w-full flex-col rounded-lg bg-white shadow-sm shadow-gray-100 md:h-[420px] md:w-[224px] xl:h-[576px] xl:w-[400px]'>
      {children}
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
      <div className='flex flex-grow flex-col overflow-hidden p-[16px]'>
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
      </div>
    </li>
  )
}

export function ArticleControlLayout({
  children,
  xpadding = '8px',
}: {
  children: ReactNode
  xpadding?: string
}) {
  return (
    <div
      style={{ paddingLeft: xpadding, paddingRight: xpadding }}
      className={clsx(
        'flex items-center justify-center rounded-lg', // display
        'bg-white ', // background
        'py-[8px]', // margin and padding
        'text-[14px] font-medium leading-[24px]', // typography
      )}
    >
      {children}
    </div>
  )
}
