import { createContext, useContext } from 'react'
import { GeneralAdmin } from '../stores/GeneralAdmin'


const GeneralAdminContext = createContext<GeneralAdmin>({} as GeneralAdmin)

export const GeneralAdminProvider = GeneralAdminContext.Provider

export const useGeneralAdminStore = (): GeneralAdmin => useContext(GeneralAdminContext)