import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import AddClient from './Clients/AddClient'
import '../../styles/AddItem.css'
import { ProjectsProvider } from '../../not-used/Projects.context'
import { ProjectStore } from '../../not-used/Projects.store'
import AddProject from '../../not-used/Projects/AddProject'
import AddTask from './Tasks/AddTask'
import { useClientsStore } from '../../context/Clients.context'
import { TasksProvider } from '../../context/Tasks.context'
import { TasksStore } from '../../stores/Tasks.store'


const AddItem: React.FC = () => {
  const ClientsStore = useClientsStore()
  const { item } = useParams()
  // const { clientId } = useLocation<{ clientId: number }>().state

  useEffect(() => {
    if (!ClientsStore.isPopulated) {
      ClientsStore.getClientsFromDB()
    }
  }, [])

  return (
    item === 'client'
      ? <AddClient />
      : item === 'task'
        ? <TasksProvider value={TasksStore}>
          <AddTask />
        </TasksProvider>
        : item === 'expense'
          ? <div>Add expense</div>
          : item === 'transfer'
            ? <div>Add gtransfer</div>
            : null
  )
}

export default AddItem