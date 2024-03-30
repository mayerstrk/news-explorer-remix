import { useNavigate } from '@remix-run/react'
import { FormEventHandler, ReactNode } from 'react'
import { HomeLoader } from './route'
import { useDebouncedCallback } from 'use-debounce'
import HeaderNavPlaceholder from '~/atoms/header-atoms'
import { useDynamicParam } from '~/hooks/use-dynamic-param'
import clsx from 'clsx'

export default function HomeHeader() {
  return (
    <header
      className={clsx(
        'relative flex w-full flex-col items-center', // display
        'h-[95vh] max-h-[634px] md:max-h-[400px]  xl:max-h-[576px]', // dimensions
        "bg-[url('../public/images/82f1206f112335e2ee4d938ba64f02d6.jpeg')] bg-cover bg-center", // background
        'before:absolute before:inset-0 before:bg-black before:opacity-40', // pseudo-elements
      )}
    >
      <HeaderNavPlaceholder />
      <div
        className={clsx(
          'relative flex grow flex-col items-center justify-between', // display
          'max-w-[452px]  md:max-w-[608px] xl:max-w-[1920px]', // dimensions
          'px-[16px] pb-[32px] pt-[30px] md:pb-[48px] md:pt-[38px] xl:py-[80px]', // padding
        )}
      >
        <div
          id='header-text'
          className={clsx(
            'flex flex-col gap-y-[16px]', // display
            'text-white', // typography
          )}
        >
          <p
            className={clsx(
              'font-robotoSlab text-[36px] leading-[40px] xl:text-[60px] xl:leading-[64px]',
            )} // typography
          >
            What&apos;s going on in the world?
          </p>
          <p
            className={clsx('text-[18px] leading-[24px]')} // typography
          >
            Find the latest news on any topic and save them in your personal
            account.
          </p>
        </div>
        <HeaderSearch />
      </div>
    </header>
  )
}

export function HeaderSearch() {
  const { value: searchTerm, setValue: setSearchTerm } =
    useDynamicParam<HomeLoader>('searchTerm')

  const navigate = useNavigate()

  const handleSubmit = () => {
    if (searchTerm.trim() === '') {
      navigate('/home', { preventScrollReset: true })
    } else {
      navigate(`/home/search/${searchTerm}?amount=6`, {
        preventScrollReset: true,
      })
    }
  }
  const handleFormSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    handleSubmit()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value.trim())
    debouncedNavigate()
  }

  const debouncedNavigate = useDebouncedCallback(() => {
    handleSubmit()
  }, 400)

  return (
    <div className='w-full'>
      <form
        className={clsx(
          'relative', // positioning
          'flex flex-col gap-[16px] md:flex-row', // display
          'w-full', // dimensions
        )}
        onSubmit={handleFormSubmit}
      >
        <input
          name='search-term'
          id='search-term'
          type='text'
          placeholder='Topic'
          className={clsx(
            'h-[56px] w-full rounded-3xl', // dimensions
            'px-[16px] focus:outline-none md:px-[24px] md:pr-[196px] xl:pr-[208px]', // margin and padding
          )}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          type='submit'
          className={clsx(
            'h-[56px] w-full rounded-3xl', // dimensions
            'bg-blue-600', // background
            'text-[18px] text-white', // typography
            'md:absolute md:right-0 md:w-[160px] xl:w-[168px]', // positioning
          )}
        >
          Search
        </button>
      </form>
    </div>
  )
}
