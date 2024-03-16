import { ReactNode } from 'react'

export default function AuthPopup({ children }: { children: ReactNode }) {
  return (
    <div>
      <p>auth</p>
      {children}
    </div>
  )
}
