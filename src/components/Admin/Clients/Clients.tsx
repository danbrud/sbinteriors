import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import ClientCard from './ClientCard'
import { useClientsStore } from '../../../context/Clients.context'
import TextField from '@material-ui/core/TextField'


const Clients: React.FC = observer(() => {
  const [input, setInput] = useState<string>('')
  const ClientsStore = useClientsStore()

  useEffect(() => {
    if (!ClientsStore.isPopulated) {
      ClientsStore.getClientsFromDB()
    }
  }, [])

  return (
    <div>
      <TextField fullWidth={true} label="Search Clients" onChange={e => setInput(e.target.value)} />
      {
        ClientsStore.clients
          .filter(c => c.name.toLowerCase().includes(input.toLowerCase()))
          .map(client => <ClientCard key={client.id} client={client} />)
      }
    </div>
  )
})

export default Clients