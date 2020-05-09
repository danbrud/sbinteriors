import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { useParams, Redirect } from 'react-router-dom'
import { useClientsStore } from '../../../context/Clients.context'
import Loader from '../../Loader'
import NoData from '../NoData'
import { useTasksStore } from '../../../context/Tasks.context'
import { useUserStore } from '../../../context/User.context'
import '../../../styles/Contract.css'
import PricePerHourCard from './PricePerHourCard'
import ContractTable from './ContractTable'
import { Snackbar } from '@material-ui/core'
import { Alert } from '../../Alert'
import EditContractPopup from './EditContractPopup'



const Contract: React.FC = observer((props) => {
  const { clientId } = useParams()

  const ClientsStore = useClientsStore()
  const TasksStore = useTasksStore()
  const UserStore = useUserStore()

  const [isLoading, setIsLoading] = useState(true)
  const [hasContract, setHasContract] = useState(true)
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

  const checkContract = async () => {
    if (await client.hasContract) {
      await populateTasks()
      setIsLoading(false)
    } else {
      setHasContract(false)
      setIsLoading(false)
    }
  }

  const populateTasks = async () => {
    if (!TasksStore.isPopulated) {
      await TasksStore.getTasksFromDB(clientId)
    }
  }

  useEffect(() => {
    if (client) {
      checkContract()
    }
  }, [])

  const client = UserStore.isAdmin ? ClientsStore.getClient(clientId) : UserStore.client
  return (
    !client
      ? <Redirect to={`/clients/${clientId}`} />
      : isLoading
        ? <Loader />
        : !hasContract
          ? <NoData type='contract' />
          : (
            <div id='contract-container'>
              <PricePerHourCard client={client} setShowPopup={setShowPopup}/>
              <ContractTable client={client} />
              {
            showPopup
              ? <EditContractPopup
                open={showPopup}
                setOpen={setShowPopup}
                openSnackbar={openSnackbar}
                client={client}
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
          )
  )
})

export default Contract