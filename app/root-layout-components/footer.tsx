import { Link } from '@remix-run/react'

export default function Footer() {
  return (
    <section className='flex w-full flex-col gap-[38px] px-[16px] pb-[22px] pt-[20px]'>
      <div className='flex place-content-between'>
        <div className='flex flex-col items-start text-[18px] leading-[18px] text-[#1A1B22]'>
          <ul className='flex h-[74px] flex-col justify-between'>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <Link to='/saved-articles'>Saved</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className='flex gap-[26px] '>
            <li className='h-[20px] w-[20px] bg-[url("../public/images/github.svg")] bg-contain'></li>
            <li className='h-[20px] w-[20px] bg-[url("../public/images/fb.svg")] bg-contain'></li>
          </ul>
        </div>
      </div>
      <p className='text-[16px] leading-[22px] text-[#B6BCBF]'>
        © 2024 Mayer Starkman
      </p>
    </section>
  )
}
