import { useFetcher } from '@remix-run/react'
import clsx from 'clsx'
import { useEffect } from 'react'
import { PopupLayout } from '~/atoms/popup-atoms'
import { useClosePopups, usePopupToggle } from '~/hooks/zustand/use-popup'
import { SignoutAction } from '~/routes/sign-out'
import { PopupName } from '~/utils/enums'

export default function SignOutPopup() {
  const fetcher = useFetcher<SignoutAction>()
  const toggle = usePopupToggle(PopupName.confirm)
  const closePopups = useClosePopups()

  useEffect(() => {
    if (fetcher.state === 'loading') {
      closePopups()
    }
  }, [fetcher.state, closePopups])

  return (
    <PopupLayout name={PopupName.confirm}>
      <div
        className={clsx(
          'fixed bottom-0 z-50 md:bottom-auto', // positioning
          'flex flex-col items-center', // display
          'h-fit w-full md:h-auto md:w-fit', // dimensions
          'm-0', // margin and padding
          'rounded-t-xl md:rounded-xl', // effects
          'bg-white', // background
          'px-[16px] pb-[28px] pt-[16px] md:px-[36px] md:pt-[34px]', // margin and padding
        )}
      >
        <button
          className='absolute -right-[46px] -top-[46px] z-50 h-[40px] w-[40px] bg-[url("/images/close.svg")] bg-cover'
          onClick={toggle}
        ></button>
        <fetcher.Form
          action='/sign-out'
          method='POST'
          className='flex flex-col items-center justify-center gap-4'
        >
          <h2 className=' font-sspro text-lg font-medium'>Are you sure?</h2>
          <div className='flex gap-6'>
            <button
              type='button'
              onClick={toggle}
              className={clsx(
                'mb-[16px] h-10 w-32 rounded-xl font-bold text-blue-500 hover:bg-gray-200 hover:text-white focus:outline-none active:bg-gray-100 active:text-white md:text-[18px]',
              )}
            >
              No
            </button>
            <button
              type='submit'
              className={clsx(
                'mb-[16px] h-10 w-32 rounded-xl bg-blue-500 font-bold text-white hover:bg-[#347EFF] focus:outline-none active:bg-[#2A65CC] md:text-[18px]',
              )}
            >
              Yes
            </button>
          </div>
        </fetcher.Form>
      </div>
    </PopupLayout>
  )
}
