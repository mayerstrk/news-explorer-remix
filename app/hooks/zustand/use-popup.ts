import { create } from 'zustand'
import { PopupName } from '../../utils/string-unions'

type Store = typeof initialState & {
  actions: {
    toggle: (name: PopupName) => void
    redirect: (from: PopupName, to: PopupName) => void
    closeAll: () => void
  }
}

const initialState = {
  'sign-in': false,
  'sign-up': false,
  'nav-menu': false,
  'sign-out': false,
  'sign-in-error': false,
}

export const usePopupStore = create<Store>((set) => ({
  ...initialState,
  actions: {
    toggle: (name: PopupName) =>
      set((state) => {
        return { ...initialState, [name]: !state[name] }
      }),
    redirect: (from: PopupName, to: PopupName) =>
      set(() => {
        return { [from]: false, [to]: true }
      }),
    closeAll: () =>
      set(() => {
        return initialState
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
export const useClosePopups = () =>
  usePopupStore((state) => state.actions.closeAll)
export const usePopupRedirect = (from: PopupName, to: PopupName) => {
  const { redirect } = usePopupActions()
  return () => redirect(from, to)
}
