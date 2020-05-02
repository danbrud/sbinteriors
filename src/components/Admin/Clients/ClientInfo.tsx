import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useClientsStore } from '../../../context/Clients.context'
import Loader from '../../Loader'
import ClientDetails from './ClientDetails'
import ClientDetailItems from './ClientDetailsList'
import { useParams } from 'react-router-dom'
import NoData from '../NoData'
import { Button, makeStyles, Snackbar } from '@material-ui/core'
import { AddBalanceTransferPopup } from '../Transfers/AddBalanceTransferPopup'
import MuiAlert from '@material-ui/lab/Alert'
import { useUserStore } from '../../../context/User.context'



const useStyles = makeStyles((theme) => ({
  buttonOutlined: {
    marginBottom: '10px',
  }
}))

const ClientInfo: React.FC = observer(() => {
  const classes = useStyles()
  const { clientId } = useParams()
  const ClientsStore = useClientsStore()
  const UserStore = useUserStore()

  const [isLoading, setIsLoading] = useState(ClientsStore.isPopulated ? false : true)
  const [showPopup, setShowPopup] = useState(false)
  const [snackbar, setSnackbar] = useState({
    message: '',
    open: false,
    severity: ''
  })


  const openSnackbar = (severity, message) => {
    setSnackbar({ message, severity, open: true })
  }

  const handleClose = () => {
    setSnackbar({
      message: '',
      open: false,
      severity: ''
    })
  }

  useEffect(() => {
    if (!ClientsStore.isPopulated && UserStore.isAdmin) {
      ClientsStore.getClientsFromDB()
        .then(() => {
          setIsLoading(false)
        })
    }

    window.scrollTo(0, 0)
  }, [UserStore.isAdmin])

  const client = UserStore.isAdmin ? ClientsStore.getClient(clientId) : UserStore.client
  if (isLoading && client) {
    setIsLoading(false)
  }

  return (
    isLoading
      ? <Loader />
      : ClientsStore.isPopulated || !UserStore.isAdmin
        ? <div>
          <ClientDetails client={client} />
          {
            UserStore.isAdmin
              ? < Button
                className={classes.buttonOutlined}
                variant="outlined"
                color="primary"
                fullWidth={true}
                onClick={() => setShowPopup(true)}
              >
                TRANSFER BALANCE
              </ Button>
              : null
          }
          < ClientDetailItems />
          {
            showPopup
              ? <AddBalanceTransferPopup
                open={showPopup}
                setOpen={setShowPopup}
                openSnackbar={openSnackbar}
              />
              : null
          }
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
        : <NoData type='data' />
  )
})

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default ClientInfo