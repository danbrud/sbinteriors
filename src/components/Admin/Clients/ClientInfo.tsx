import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useClientsStore } from '../../../context/Clients.context'
import Loader from '../../Loader'
import ClientDetails from './ClientDetails'
import ClientDetailItems from './ClientDetailsList'
import { useParams } from 'react-router-dom'
import NoData from '../NoData'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  buttonOutlined: {
    marginBottom: '10px',
  }
}))

const ClientInfo: React.FC = observer((props) => {
  const classes = useStyles()
  const ClientsStore = useClientsStore()
  const { clientId } = useParams()

  const [isLoading, setIsLoading] = useState(ClientsStore.isPopulated ? false : true)
  const [showPopup, setShowPopup] = useState(false)

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
          < Button
            className={classes.buttonOutlined}
            variant="outlined"
            color="primary"
            fullWidth={true}
            onClick={() => setShowPopup(true)}
          >
            TRANSFER BALANCE
          </ Button>
          <ClientDetailItems />
        </div>
        : <NoData type='data' />
  )
})

export default ClientInfo