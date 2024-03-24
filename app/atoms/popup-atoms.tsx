import clsx from 'clsx'
import { ReactNode, useCallback, useEffect, useRef } from 'react'
import { usePopupToggle, usePopupVisibility } from '~/hooks/zustand/use-popup'
import { PopupName } from '~/utils/string-unions'

export function PopupLayout({
  children,
  name,
}: {
  children: ReactNode
  name: PopupName
}) {
  const isOpen = usePopupVisibility(name)
  const toggle = usePopupToggle(name)
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (overlayRef.current?.contains(event.target as Node)) {
        toggle()
      }
    },
    [toggle],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, handleClickOutside])

  return (
    <div
      id={name}
      className={clsx(
        'fixed inset-0 z-30 flex h-svh w-full flex-col items-center justify-center transition-all duration-300',
        {
          'md:hidden': name === 'nav-menu',
          'flex-col opacity-100': isOpen,
          'hidden opacity-0': !isOpen,
        },
      )}
    >
      {children}

      <div
        ref={overlayRef}
        className='absolute inset-0 w-full flex-grow bg-black opacity-50'
      ></div>
    </div>
  )
}
