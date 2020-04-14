import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useProjectsStore } from '../Projects.context'
import { useHistory } from 'react-router-dom'
import Loader from '../../components/Loader'
import ProjectDetails from './ProjectDetails'
import { useTasksStore } from '../../context/Tasks.context'
import { useExpensesStore } from '../../context/Expenses.context'


interface ProjectDetailsWrapperProps {
  match: { params: { clientId: string, projectId: string } }
}

const ProjectDetailsWrapper: React.FC<ProjectDetailsWrapperProps> = observer((props) => {
  const { clientId, projectId } = props.match.params
  const history = useHistory()

  const ProjectsStore = useProjectsStore()
  const TasksStore = useTasksStore()
  const ExpensesStore = useExpensesStore()

  useEffect(() => {
    if (!ProjectsStore.isPopulated) {
      ProjectsStore.getClientProjectsFromDB(clientId)
    }

    TasksStore.getProjectTasksFromDB(projectId)
    ExpensesStore.getProjectExpensesFromDB(projectId)

    return () => {
      if (!history.location.pathname.includes('projects')) {
        ProjectsStore.clearStore()
        TasksStore.clearStore()
        ExpensesStore.clearStore()
      }
    }
  }, [])

  return (
    !ProjectsStore.isPopulated
      ? <Loader />
      : <ProjectDetails projectId={projectId} clientId={clientId} />
  )
})

export default ProjectDetailsWrapper