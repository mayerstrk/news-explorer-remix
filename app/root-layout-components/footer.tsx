import { Link } from '@remix-run/react'

export default function Footer({ signedIn }: { signedIn: boolean }) {
  return (
    <footer className='mx-auto flex w-full max-w-[1440px] flex-col gap-[38px] px-[16px] pb-[22px] pt-[20px] md:h-[64px] md:flex-row-reverse md:items-center md:justify-between md:px-[40px] xl:h-[80px] xl:px-[104px]'>
      <nav className='flex w-full justify-between text-[18px] leading-[18px] text-[#1A1B22] md:h-[24px] md:items-center md:justify-end md:gap-[40px] md:py-[21px]'>
        <ul className='flex h-[74px] flex-col items-center gap-[26px] md:flex-row md:gap-[40px]'>
          <li>
            <Link to='/home' prefetch='render' state={{ fromNav: true }}>
              Home
            </Link>
          </li>
          {signedIn && (
            <li>
              <Link
                to='/saved-articles'
                prefetch='render'
                state={{ fromNav: true }}
              >
                Saved
              </Link>
            </li>
          )}
        </ul>
        <div>
          <ul className='flex items-center gap-[26px]'>
            <a href='https://github.com/Mayerstrk'>
              <li className='h-[20px] w-[20px] bg-[url("/images/github.svg")] bg-contain'></li>
            </a>
            <a href='https://github.com/Mayerstrk'>
              <li className='h-[20px] w-[20px] bg-[url("/images/fb.svg")] bg-contain'></li>
            </a>
          </ul>
        </div>
      </nav>
      <p className='whitespace-nowrap text-[16px] leading-[22px] text-[#B6BCBF]'>
        © 2024 Mayer Starkman
      </p>
    </footer>
  )
}
