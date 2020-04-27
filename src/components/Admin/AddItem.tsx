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
import { ExpensesProvider } from '../../context/Expenses.context'
import { ExpensesStore } from '../../stores/Expenses.store'
import AddExpense from './Expenses/AddExpense'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import AddContract from './Clients/AddContract'


const AddItem: React.FC = () => {
  const { item } = useParams()
  let { state } = useLocation<{ clientId: number } | null>()

  const ClientsStore = useClientsStore()
  const [clientName, setClientName] = useState('')
  const [snackbar, setSnackbar] = useState({
    message: '',
    open: false,
    severity: ''
  })

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

  if (item === 'client') {
    return (
      <div>
        <AddClient openSnackbar={openSnackbar} />
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
              <AddTask openSnackbar={openSnackbar} clientName={clientName} setClientName={setClientName} />
            </TasksProvider>
            : item === 'expense'
              ? <ExpensesProvider value={ExpensesStore}>
                <AddExpense openSnackbar={openSnackbar} clientName={clientName} setClientName={setClientName} />
              </ExpensesProvider>
              : item === 'transfer'
                ? <TransfersProvider value={TransfersStore}>
                  <AddTransfer openSnackbar={openSnackbar} clientName={clientName} setClientName={setClientName} />
                </TransfersProvider>
                : item === 'contract'
                  ? <AddContract openSnackbar={openSnackbar} clientName={clientName} setClientName={setClientName}/>
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
  }
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default AddItem