import { createContext, useContext } from 'react'
import { Projects } from '../stores/Projects.store'


const ProjectsContext = createContext<Projects>({} as Projects)

export const ProjectsProvider = ProjectsContext.Provider

export const useProjectsStore = (): Projects => useContext(ProjectsContext)