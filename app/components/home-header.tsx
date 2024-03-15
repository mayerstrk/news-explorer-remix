import { ReactNode } from 'react'

export default function HomeHeader() {
  return (
    <header className="relative flex h-[95%]  max-h-[634px] w-full flex-col items-center bg-[url('../public/images/82f1206f112335e2ee4d938ba64f02d6.jpeg')] bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-40 md:max-h-[576px] xl:max-h-[576px]">
      <div className='h-[length:var(--navbar-h)] md:h-[length:var(--navbar-h-md)] xl:h-[length:var(--navbar-h-xl)]'></div>
      <HeaderContent>
        <div id='header-text' className='flex flex-col gap-y-[16px] text-white'>
          <p className='font-robotoSlab text-[36px] leading-[40px]'>
            What&#39;s going on in the world?
          </p>
          <p className='text-[18px] leading-[24px]'>
            Find the latest news on any topic and save them in your personal
            account.
          </p>
        </div>
        <HeaderSearch />
      </HeaderContent>
    </header>
  )
}

function HeaderContent({ children }: { children: ReactNode }) {
  return (
    <div className='relative flex max-w-[452px] grow flex-col items-center justify-between px-[16px] pb-[32px] pt-[30px] md:max-w-[608px]'>
      {children}
    </div>
  )
}

function HeaderSearch() {
  return (
    <div className='w-full'>
      <form className='relative flex flex-col gap-[16px] md:flex-row'>
        <input
          name='search-term'
          id='search-term'
          type='text'
          placeholder='Topic'
          className='h-[56px] w-full rounded-3xl px-[16px] md:px-[24px] md:pr-[196px] xl:pr-[208px]'
        />
        <button
          type='submit'
          className='h-[56px] w-full  rounded-3xl bg-blue-600 text-[18px] text-white md:absolute md:right-0 md:w-[160px] xl:w-[168px]'
        >
          Search
        </button>
      </form>
    </div>
  )
}
