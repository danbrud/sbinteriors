import { createContext, useContext } from 'react'

const StoreContext = createContext<>({} as )

export const StoreProvider = StoreContext.Provider

export const useStore = ():  => useContext(StoreContext)