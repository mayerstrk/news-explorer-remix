import { Link } from '@remix-run/react'
import clsx from 'clsx'
import { ReactNode, RefObject, useCallback, useState } from 'react'
import { Article } from '~/data'

export function ArticleGalleryLayout({
  children,
  title,
  amount,
  topRef,
}: {
  children: ReactNode
  title: string
  amount: string
  topRef: RefObject<HTMLElement>
}) {
  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [topRef])

  return (
    <>
      <section
        id='gallery'
        ref={topRef}
        className={clsx(
          'relative',
          'flex flex-col items-center', // display
          'bg-[#F5F6F7]', // background
        )}
      >
        <button
          className={clsx(
            'fixed  bottom-[20px] right-[20px] z-50',
            'flex items-center justify-center', // display
            'h-12 w-12 max-w-12', // dimensions
            'rounded-full bg-white ', // background
            'text-sm', // typography
            'shadow-sm shadow-white', // effects
            'md:hidden', // md
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
                'mb-[34px] mt-[32px]', // margin
                'self-start',
                'font-robotoSlab text-[30px] leading-[34px]', // typography
                'text-[#1A1B22]', // background
              )}
            >
              {title}
            </h2>
          )}
          <ul
            className={clsx(
              'mb-[13px] mt-[24px]', // margin
              'grid w-fit grid-cols-1 gap-[24px]', // display
              'rounded-full', // effects
              'md:mb-[32px] md:grid-cols-3', // md
            )}
          >
            {children}
          </ul>
          <div
            className={clsx(
              'mb-[24px] mt-[8px]', // margin
              'flex flex-col items-center', // display
            )}
          >
            <Link
              preventScrollReset={true}
              className={clsx(
                'w-[288px]', // dimensions
                'rounded-full', // effects
                'bg-white ', // background
                'py-[20px]', // margin and padding
                'text-center text-[18px] font-medium leading-[24px]', // typography
                { 'hover:bg-[#E8E8E8]': true }, // hover
              )}
              to={`?amount=${Number(amount) + 6}`}
              type='button'
            >
              Show More
            </Link>
            {Number(amount) > 6 && (
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
  data: Article
}) {
  return (
    <li
      className={clsx(
        'relative mx-auto flex flex-col rounded-lg', //positioning
        'h-[440px] w-full', //dimensions
        'bg-white', //background
        'shadow-sm', //effects
        'shadow-gray-100', //effects
        'md:w-[224px]', //md
        'xl:w-[400px]', //xl
      )}
    >
      {children}
      <img
        src={data.image}
        alt={data.title}
        className={clsx(
          'h-[196px] w-full rounded-t-lg object-cover', //dimensions
        )}
      />
      <div
        className={clsx(
          'flex flex-grow flex-col', //display
          'p-[16px]', //margin and padding
        )}
      >
        <p
          className={clsx(
            'mb-[10px]', //margin and padding
            'font-sspro text-[18px] leading-[24px]', //typography
            'text-[#b6bcbf]', //background
          )}
        >
          {new Date(data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <h2
          className={clsx(
            'mb-[14px]', //margin and padding
            'w-full', //dimensions
            'font-robotoSlab text-[22px] leading-[24px]', //typography
            'text-[#1A1B22]', //background
          )}
        >
          {data.title}
        </h2>
        <p
          className={clsx(
            'mb-[8px]', //margin and padding
            'flex flex-grow', //display
            'text-[16px] leading-[22px]', //typography
            'text-[#1A1B22]', //background
          )}
        >
          {data.text}
        </p>
        <p
          className={clsx(
            'font-robotoSlab text-[16px] font-bold leading-[20px]', //typography
            'text-[#B6BCBF]', //background
          )}
        >
          {data.source.toUpperCase()}
        </p>
      </div>
    </li>
  )
}

export function ResultArticleControls() {
  const [isSaved, setIsSaved] = useState(false)
  return (
    <ArticleControlLayout>
      <button
        className={clsx(
          'h-[26px] w-[26px]', // dimensions
          'bg-contain', // background
          'hover:bg-[url("/images/bookmark--hover.svg")]', // hover

          {
            'bg-[url("/images/bookmark.svg")]': !isSaved, // background (conditional)
            'bg-[url("/images/bookmark-active.svg")]': isSaved, // background (conditional)
          },
        )}
        onClick={() => setIsSaved(!isSaved)}
      ></button>
    </ArticleControlLayout>
  )
}

export function SavedArticleControls({ keyword }: { keyword: string }) {
  const [isSaved, setIsSaved] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={clsx(
        't-0 absolute inset-x-0',
        'flex w-full justify-between', // display
        'px-[16px] pt-[16px]', // margin and padding
      )}
    >
      <ArticleControlLayout
        width={'auto'} // dimensions (?)
        xpadding='22px' // margin and padding (?)
      >
        {keyword}
      </ArticleControlLayout>
      <div
        className={clsx(
          'relative flex gap-[5px] md:flex-col-reverse xl:flex-row ', // display
        )}
      >
        {isHovered && (
          <ArticleControlLayout
            xpadding='26px'
            absolutePositioning={'md:absolute md:-left-[185px] xl:block'}
          >
            Remove from saved
          </ArticleControlLayout>
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
  )
}

function ArticleControlLayout({
  children,
  absolutePositioning = '',
  xpadding = '8px',
}: {
  children: ReactNode
  width?: string
  absolutePositioning?: string
  xpadding?: string
}) {
  return (
    <div
      style={{ paddingLeft: xpadding, paddingRight: xpadding }}
      className={clsx(
        absolutePositioning,
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
