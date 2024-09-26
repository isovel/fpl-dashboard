import { create } from 'zustand'

export type HelmetStore = {
  title: string
  setTitle: (title: string) => void
}

export const useHelmetStore = create<HelmetStore>()((set) => ({
  title: 'Dashboard',
  setTitle: (title) => set({ title }),
}))
