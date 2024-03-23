import { create } from 'zustand'
import { PopupName } from '../../utils/string-unions'

interface PopupState {
  popupsVisibility: Record<PopupName, boolean>
  actions: { toggle: (name: PopupName) => void }
}

export const usePopupStore = create<PopupState>((set) => ({
  popupsVisibility: {
    'sign-in': false,
    'sign-up': false,
    'nav-menu': false,
    'sign-out': false,
  },
  actions: {
    toggle: (name) =>
      set((state) => {
        const updated: Record<string, boolean> = {}
        for (const popupName in state.popupsVisibility) {
          updated[name] =
            popupName === name ? !state.popupsVisibility[name] : false
        }
        return { popupsVisibility: updated }
      }),
  },
}))

export const usePopupVisibility = (name: PopupName) =>
  usePopupStore((state) => state.popupsVisibility[name])

export const usePopupActions = () => usePopupStore((state) => state.actions)

export const usePopupToggle = (name: PopupName) => {
  const { toggle } = usePopupActions()

  return () => toggle(name)
}
