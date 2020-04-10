import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import Client from './Client'
import { useClientsStore } from '../context/Clients.context'

const Clients: React.FC = observer(() => {
  const [input, setInput] = useState<string>('')
  const ClientsStore = useClientsStore()

  useEffect(() => {
    ClientsStore.getClients()
  }, [])

  return (
    <div>
      <input type="text" value={input} onChange={e => setInput(e.target.value)} />
      {
        ClientsStore.clients
        .filter(c => c.firstName.includes(input) || c.lastName.includes(input))
        .map(client => <Client key={client.id} client={client} />)
      }
    </div>
  )
})

export default Clients