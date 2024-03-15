import { create } from 'zustand'

export const enum PopupName {
  navMenu = 'navMenu',
  signIn = 'signIn',
  signUp = 'signUp',
}

interface PopupState {
  popups: Record<string, boolean>
  toggleOpen: (name: PopupName) => void
}

export const usePopupStore = create<PopupState>((set) => ({
  popups: {},
  toggleOpen: (name) =>
    set((state) => ({
      popups: {
        ...state.popups,
        [name]: !state.popups[name],
      },
    })),
}))
