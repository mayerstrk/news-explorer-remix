import { create } from 'zustand'

interface SignedInState {
  signedIn: boolean
  actions: {
    setSignedIn: (signedIn: boolean) => void
  }
}

const useSignedInStore = create<SignedInState>((set) => ({
  signedIn: false,
  actions: {
    setSignedIn: (signedIn) => set(() => ({ signedIn })),
  },
}))

export const useSignedIn = () => useSignedInStore((state) => state.signedIn)
export const useSignedInActions = () =>
  useSignedInStore((state) => state.actions)
