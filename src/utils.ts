import { createContext, useContext } from 'react'
import { AppState } from './stores/AppState.store'

const StoreContext = createContext<AppState>({} as AppState)

export const StoreProvider = StoreContext.Provider

export const useStore = (): AppState => useContext(StoreContext)