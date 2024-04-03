import { create } from 'zustand'
import { PopupName } from '../../utils/string-unions'

type Store = typeof initialState & {
  actions: {
    toggle: (name: PopupName) => void
    redirect: (from: PopupName, to: PopupName) => void
    closeAll: () => void
    setAndToggleError: (message: string) => void
    setAndToggleNotify: (message: string) => void
  }
}

const initialState = {
  'sign-in': false,
  'sign-up': false,
  'nav-menu': false,
  'sign-out': false,
  error: false,
  notify: false,
  errorMessage: '',
  notifyMessage: '',
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
    setAndToggleError: (message: string) =>
      set(() => {
        return { error: true, errorMessage: message }
      }),
    setAndToggleNotify: (message: string) =>
      set(() => {
        return { notify: true, notifyMessage: message }
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

export const useSetAndToggleError = () =>
  usePopupStore((state) => state.actions.setAndToggleError)

export const useSetAndToggleNotify = () =>
  usePopupStore((state) => state.actions.setAndToggleNotify)

export const useErrorMessage = () =>
  usePopupStore((state) => state.errorMessage)

export const useNotifyMessage = () =>
  usePopupStore((state) => state.notifyMessage)
