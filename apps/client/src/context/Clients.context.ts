import { createContext, useContext } from 'react'
import { Clients } from '../stores/Clients.store'


const ClientsContext = createContext<Clients>({} as Clients)

export const ClientsProvider = ClientsContext.Provider

export const useClientsStore = (): Clients => useContext(ClientsContext)