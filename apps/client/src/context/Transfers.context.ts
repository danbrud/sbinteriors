import { createContext, useContext } from 'react'
import { Transfers } from '../stores/Transfers.store'


const TransfersContext = createContext<Transfers>({} as Transfers)

export const TransfersProvider = TransfersContext.Provider

export const useTransfersStore = (): Transfers => useContext(TransfersContext)