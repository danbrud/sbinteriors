import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useClientsStore } from '../../../context/Clients.context'
import Loader from '../../Loader'
import ClientDetails from './ClientDetails'
import ClientDetailItems from './ClientDetailsList'
import { useParams } from 'react-router-dom'

// interface ClientInfoProps {
//   match: { params: { clientId: string } }
// }

const ClientInfo: React.FC = observer((props) => {
  const ClientsStore = useClientsStore()
  const { clientId } = useParams()

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
        <ClientDetailItems />
      </div>
      : <Loader />
  )
})

export default ClientInfo