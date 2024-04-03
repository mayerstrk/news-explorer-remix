import { PopupLayout } from '~/atoms/popup-atoms'
import { useErrorMessage } from '~/hooks/zustand/use-popup'
export function ErrorPopup() {
  const message = useErrorMessage()

  return (
    <PopupLayout name='error'>
      <div className='z-50 mx-auto  flex h-60 w-[80%] items-center justify-center rounded-xl bg-white md:w-[50%]'>
        <div className=' flex flex-col gap-2'>
          <h2 className='text-2xl text-red-500'>Error</h2>
          <p className='font-sspro text-xl font-medium'>{message}</p>
        </div>
      </div>
    </PopupLayout>
  )
}
