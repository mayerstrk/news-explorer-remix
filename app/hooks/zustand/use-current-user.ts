import { create } from 'zustand'
type State = {
  email: string
  username: string
  actions: {
    setEmail: (email: string) => void
    setUsername: (username: string) => void
  }
}

export const useCurrentUser = create<State>((set) => ({
  email: '',
  username: '',
  actions: {
    //TODO validate email
    setEmail(email) {
      set(() => {
        return { email }
      })
    },
    setUsername(username) {
      set(() => ({ username }))
    },
  },
}))

export const useEmail = () => useCurrentUser((state) => state.email)
export const useUsername = () => useCurrentUser((state) => state.username)

export const useCurrentUserActions = () =>
  useCurrentUser((state) => state.actions)
export const useSetEmail = () =>
  useCurrentUser((state) => state.actions.setEmail)
export const useSetUsername = () =>
  useCurrentUser((state) => state.actions.setUsername)
