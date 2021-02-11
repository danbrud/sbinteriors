import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import { useTransfersStore } from '../../../context/Transfers.context'
import TransferCard from './TransferCard'
import NoData from '../NoData'
import Loader from '../../Loader'
import TransferTabs from './TransferTabs'
import { Snackbar } from '@material-ui/core'
import { Alert } from '../../Alert'
import { Transfer } from '../../../stores/Transfer.store'
import { BalanceTransfer } from '../../../stores/BalanceTransfer.store'
import EditTransferPopup from './EditTransferPopup'

const Transfers: React.FC = observer(() => {
  const TransfersStore = useTransfersStore()
  const { clientId } = useParams()
  const [isLoading, setIsLoading] = useState(TransfersStore.isFullyPopulated ? false : true)
  const [showPopup, setShowPopup] = useState(false)
  const [transferToEdit, setTransferToEdit] = useState<Transfer | BalanceTransfer | null>(null)
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
    if (!TransfersStore.isFullyPopulated) {
      const transferPromises = [
        TransfersStore.getTransfersFromDB(clientId),
        TransfersStore.getBalanceTransfersFromDB(clientId)
      ]

      Promise.all(transferPromises).then(() => {
        setIsLoading(false)
      })
    }
  }, [])

  return (
    <div>
      {
        isLoading
          ? <Loader />
          : <TransferTabs setShowPopup={setShowPopup} setTransferToEdit={setTransferToEdit} />
      }
      {
        showPopup && transferToEdit instanceof Transfer
          ? <EditTransferPopup
            open={showPopup}
            setOpen={setShowPopup}
            openSnackbar={openSnackbar}
            transfer={transferToEdit}
          />
          : showPopup && transferToEdit instanceof BalanceTransfer
            ? <div></div>
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
})

export default Transfers