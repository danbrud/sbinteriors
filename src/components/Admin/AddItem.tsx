import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import AddClient from './Clients/AddClient'
import '../../styles/AddItem.css'
import { ProjectsProvider } from '../../context/Projects.context'
import { ProjectStore } from '../../stores/Projects.store'
import AddProject from './Projects/AddProject'
import AddTask from './Tasks/AddTask'
import { useClientsStore } from '../../context/Clients.context'
import { TasksProvider } from '../../context/Tasks.context'
import { TasksStore } from '../../stores/Tasks.store'


const AddItem: React.FC = () => {
  const ClientsStore = useClientsStore()
  const { item } = useParams()
  const { clientId, projectId } = useLocation<{ clientId: number, projectId: number }>().state
  // console.log(clientId, projectId)

  useEffect(() => {
    if (!ClientsStore.isPopulated) {
      ClientsStore.getClientsFromDB()
    }
  }, [])

  return (
    item === 'client'
      ? <AddClient />
      : item === 'project'
        ? <ProjectsProvider value={ProjectStore}>
          <AddProject clientId={clientId} />
        </ProjectsProvider>
        : item === 'task'
          ? <TasksProvider value={TasksStore}>
            <AddTask clientId={clientId} projectId={projectId} />
          </TasksProvider>
          : item === 'expense'
            ? <div>Add expense</div>
            : item === 'transfer'
              ? <div>Add gtransfer</div>
              : null
  )
}

export default AddItem