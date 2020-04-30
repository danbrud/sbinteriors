import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useGeneralAdminStore } from '../../../context/GeneralAdmin.context'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import { makeStyles, Select, MenuItem } from '@material-ui/core'
import { useTransfersStore } from '../../../context/Transfers.context'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'inline-block',
    width: '25%'
  }
}))

interface AddBalanceTransferPopupProps {
  openSnackbar?: (severity: string, message: string) => void
  setOpen?: (open: boolean) => void
  open?: boolean
}


export const AddBalanceTransferPopup: React.FC<AddBalanceTransferPopupProps> = (props) => {
  const classes = useStyles()
  const { openSnackbar, setOpen, open } = props//need to add snackbar to client

  const [inputs, setInputs] = useState(
    { fromAccount: '', toAccount: '', date: new Date(), amount: '' }
  )
  const TransfersStore = useTransfersStore()

  const closePopup = () => {
    setInputs({ fromAccount: '', toAccount: '', date: new Date(), amount: '' })
    setOpen(false)
  }


  const handleClose = (shouldAdd: boolean) => {
    if (shouldAdd) {
      if (inputs) {
        TransfersStore.createBalanceTransfer(inputs)
        openSnackbar('success', `Transferred balance successfully!`)
        closePopup()
      } else {
        openSnackbar('error', `Invalid! Please fill all inputs.`)
      }
    } else {
      closePopup()
    }
  }

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  return (
      <Dialog open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Transfer Balance</DialogTitle>
        <DialogContent>
          {
            ['fromAccount', 'toAccount'].map(o => (
              <Select
                key={o}
                labelId={`balance-transfer-${o}-label`}
                id={`balance-transfer-${o}-select`}
                value={inputs[o]}
                name={o}
                onChange={handleChange}
              >
                <MenuItem value='expenses'>Expenses</MenuItem>
                <MenuItem value='tasks'>Tasks</MenuItem>
              </Select>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
  )
}