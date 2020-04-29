import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import ClientCard from './ClientCard'
import { useClientsStore } from '../../../context/Clients.context'
import TextField from '@material-ui/core/TextField'
import Loader from '../../Loader'
import NoData from '../NoData'


const Clients: React.FC = observer(() => {
  const [input, setInput] = useState('')
  const ClientsStore = useClientsStore()
  const [isLoading, setIsLoading] = useState(ClientsStore.isPopulated ? false : true)

  const initializeComp = async () => {
    if (!ClientsStore.isPopulated) {
      await ClientsStore.getClientsFromDB()
      setIsLoading(false)
    }
  }

  useEffect(() => {
    initializeComp()
  }, [])

  return (
    isLoading
      ? <Loader />
      : !ClientsStore.isPopulated
        ? <NoData type='clients' />
        : (
          <div>
            <TextField fullWidth={true} label="Search Clients" onChange={e => setInput(e.target.value)} />
            {
              ClientsStore.clients
                .filter(c => c.name.toLowerCase().includes(input.toLowerCase()))
                .map(client => <ClientCard key={client.id} client={client} />)
            }
          </div>
        )
  )
})

export default Clients