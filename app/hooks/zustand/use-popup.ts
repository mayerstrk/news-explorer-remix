import { create } from 'zustand'
import { PopupName } from '../../utils/string-unions'

type PopupState = {
  [key in PopupName]: boolean
} & {
  actions: {
    toggle: (name: PopupName) => void
    redirect: (from: PopupName, to: PopupName) => void
  }
}

export const usePopupStore = create<PopupState>((set) => ({
  'sign-in': false,
  'sign-up': false,
  'nav-menu': false,
  'sign-out': false,
  actions: {
    toggle: (name: PopupName) =>
      set((state) => {
        return { [name]: !state[name] }
      }),
    redirect: (from: PopupName, to: PopupName) =>
      set(() => {
        return { [from]: false, [to]: true }
      }),
  },
}))

export const usePopupVisibility = (name: PopupName) =>
  usePopupStore((state) => state[name])

export const usePopupActions = () => usePopupStore((state) => state.actions)

export const usePopupToggle = (name: PopupName) => {
  const { toggle } = usePopupActions()

  return () => toggle(name)
}

export const usePopupRedirect = (from: PopupName, to: PopupName) => {
  const { redirect } = usePopupActions()
  return () => redirect(from, to)
}
