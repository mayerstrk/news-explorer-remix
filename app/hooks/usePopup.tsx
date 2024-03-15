import { PopupName, usePopupStore } from '../stores/usePopupStore'

export const usePopup = (name: PopupName) => {
  const isOpen = usePopupStore((state) => state.popups[name] || false)
  const togglePopup = usePopupStore((state) => state.toggleOpen)

  const toggle = () => togglePopup(name)

  return { isOpen, toggle }
}
