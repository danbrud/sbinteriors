import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useClientsStore } from '../../../context/Clients.context'
import Loader from '../../Loader'
import ClientDetails from './ClientDetails'
import ClientDetailItems from './ClientDetailsList'

interface ClientInfoProps {
  match: { params: { clientId: string } }
}

const ClientInfo: React.FC<ClientInfoProps> = observer((props) => {
  const ClientsStore = useClientsStore()
  const clientId = props.match.params.clientId

  const client = ClientsStore.getClient(clientId)

    useEffect(() => {
      if (!ClientsStore.isPopulated) {
        ClientsStore.getClientsFromDB()
      }
    }, [])

  return (
    ClientsStore.isPopulated
      ? <div>
        <ClientDetails client={client} />
        <ClientDetailItems clientId={clientId} />
      </div>
      : <Loader />
  )
})

export default ClientInfo