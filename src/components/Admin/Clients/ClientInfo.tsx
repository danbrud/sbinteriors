import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useClientsStore } from '../../../context/Clients.context'
import Loader from '../../Loader'
import ClientDetails from './ClientDetails'
import ClientDetailItems from './ClientDetailsList'
import { useParams } from 'react-router-dom'
import NoData from '../NoData'

// interface ClientInfoProps {
//   match: { params: { clientId: string } }
// }

const ClientInfo: React.FC = observer((props) => {
  const ClientsStore = useClientsStore()
  const { clientId } = useParams()
  const [isLoading, setIsLoading] = useState(ClientsStore.isPopulated ? false : true)

  const client = ClientsStore.getClient(clientId)

  useEffect(() => {
    if (!ClientsStore.isPopulated) {
      ClientsStore.getClientsFromDB()
        .then(() => {
          setIsLoading(false)
        })
    }
  }, [])

  return (
    isLoading
      ? <Loader />
      : ClientsStore.isPopulated
        ? <div>
          <ClientDetails client={client} />
          <ClientDetailItems />
        </div>
        : <NoData type='data' />
  )
})

export default ClientInfo