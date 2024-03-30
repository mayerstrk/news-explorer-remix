import HeaderNavPlaceholder from '~/atoms/header-atoms'
import { useUsername } from '~/hooks/zustand/use-current-user'

export default function SavedArticlesHeader() {
  const username = useUsername()
  return (
    <header className='flex w-full flex-col items-center justify-center px-[16px] pb-[32px] pt-[8px] md:px-[40px] md:pt-[24px]'>
      <div className='w-full max-w-[1920px] self-center'>
        <HeaderNavPlaceholder />
        <h2 className='mb-[16px] w-full text-[12px] leading-[24px] text-[#1A1B22]/50 md:text-[14px] '>
          Saved articles
        </h2>
        <p className='mb-[50px] w-full font-robotoSlab text-[30px] leading-[34px] text-[#1A1B22] md:mb-[16px]'>
          {username}, you have TODO saved articles
        </p>
        <p className='w-full text-[18px] leading-[24px] text-[#1A1B22]'>
          By keywords: <span className='font-bold'>Saved</span>
        </p>
      </div>
    </header>
  )
}
