import { createContext, useContext } from 'react'
import { User } from '../stores/User.store'


const UserContext = createContext<User>({} as User)

export const UserProvider = UserContext.Provider

export const useUserStore = (): User => useContext(UserContext)