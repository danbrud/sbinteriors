import { createContext, useContext } from 'react'
import { Tasks } from '../stores/Tasks.store'


const TasksContext = createContext<Tasks>({} as Tasks)

export const TasksProvider = TasksContext.Provider

export const useTasksStore = (): Tasks => useContext(TasksContext)