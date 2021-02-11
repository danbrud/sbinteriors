import { createContext, useContext } from 'react'
import { Expenses } from '../stores/Expenses.store'


const ExpensesContext = createContext<Expenses>({} as Expenses)

export const ExpensesProvider = ExpensesContext.Provider

export const useExpensesStore = (): Expenses => useContext(ExpensesContext)