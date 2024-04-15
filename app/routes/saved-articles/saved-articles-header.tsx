import HeaderNavPlaceholder from '~/atoms/header-atoms'

export default function SavedArticlesHeader({
  username,
  amount,
  keywords,
}: {
  username: string
  amount: number
  keywords: string[]
}) {
  let keywordsString = ''
  if (keywords.length === 0) {
    keywordsString = 'such empty'
  } else if (keywords.length > 3) {
    keywordsString =
      keywords.slice(0, 3).join(', ') +
      ' and ' +
      (keywords.length - 3) +
      ' more'
  } else {
    keywordsString = keywords.join(', ')
  }
  return (
    <header className='mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-[16px] pb-[32px] pt-[8px] md:px-[40px] md:pt-[24px] xl:pb-[56px] xl:pl-[104px] xl:pt-[40px]'>
      <div className='w-full max-w-[1920px] self-center'>
        <HeaderNavPlaceholder />
        <h2 className='mb-[16px] w-full text-[12px] leading-[24px] text-[#1A1B22]/50 md:text-[14px] xl:mb-[28px] xl:text-[18px]'>
          Saved articles
        </h2>
        <p className='mb-[50px] w-full font-robotoSlab text-[30px] leading-[34px] text-[#1A1B22] md:mb-[16px] md:w-[385px] xl:mb-[30px] xl:text-[40px] xl:leading-[46px]'>
          {username}, you have {amount} saved articles
        </p>
        <p className='w-full text-[18px] leading-[24px] text-[#1A1B22]'>
          By keywords: <span className='font-bold'>{keywordsString}</span>
        </p>
      </div>
    </header>
  )
}
