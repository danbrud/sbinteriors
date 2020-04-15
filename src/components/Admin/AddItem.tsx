import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import AddClient from './Clients/AddClient'
import '../../styles/AddItem.css'
import AddTask from './Tasks/AddTask'
import { useClientsStore } from '../../context/Clients.context'
import { TasksProvider } from '../../context/Tasks.context'
import { TasksStore } from '../../stores/Tasks.store'
import AddTransfer from './Transfers/AddTransfer'
import { TransfersStore } from '../../stores/Transfers.store'
import { TransfersProvider } from '../../context/Transfers.context'
import DataList from './DataList'


const AddItem: React.FC = () => {
  const { item } = useParams()
  let { state } = useLocation<{ clientId: number } | null>()

  const ClientsStore = useClientsStore()
  const [clientName, setClientName] = useState('')

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (!ClientsStore.isPopulated) {
      state = null
      ClientsStore.getClientsFromDB()
    }

    if (state) {
      const { clientId } = state
      const client = ClientsStore.getClient(clientId)
      setClientName(client.formattedName)
    }
  }, [])

  if (item === 'client') {
    return <AddClient />
  } else {
    return (
      <div>
        <DataList
          clientName={clientName}
          setClientName={setClientName}
          ClientsStore={ClientsStore}
        />
        {
          item === 'task'
            ? <TasksProvider value={TasksStore}>
              <AddTask clientName={clientName} setClientName={setClientName} />
            </TasksProvider>
            : item === 'expense'
              ? <div>Add expense</div>
              : item === 'transfer'
                ? <TransfersProvider value={TransfersStore}>
                  <AddTransfer clientName={clientName} setClientName={setClientName} />
                </TransfersProvider>
                : null
        }
      </div>
    )
  }
}

export default AddItem