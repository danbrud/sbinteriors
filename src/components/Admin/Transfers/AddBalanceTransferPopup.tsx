import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles, Select, MenuItem, ThemeProvider, InputAdornment, InputLabel } from '@material-ui/core'
import { useTransfersStore } from '../../../context/Transfers.context'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { datePickerTheme } from '../../../themes/datePicker.theme'
import { checkRequiredFields } from '../../../utils'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'inline-block',
    width: '25%'
  },
  select: {
    display: 'grid',
    margin: '4px'
  },
  input: {
    margin: '4px'
  }
}))

interface AddBalanceTransferPopupProps {
  openSnackbar?: (severity: string, message: string) => void
  setOpen?: (open: boolean) => void
  open?: boolean
}


export const AddBalanceTransferPopup: React.FC<AddBalanceTransferPopupProps> = (props) => {
  const classes = useStyles()
  const { clientId } = useParams()
  const { openSnackbar, setOpen, open } = props//need to add snackbar to client

  const [inputs, setInputs] = useState(
    { fromAccount: '', toAccount: '', date: new Date(), amount: '' }
  )
  const TransfersStore = useTransfersStore()

  const closePopup = () => {
    setInputs( { fromAccount: '', toAccount: '', date: new Date(), amount: '' })
    setOpen(false)
  }

  const handleClose = (shouldAdd: boolean) => {
    if (shouldAdd) {
      if (checkRequiredFields(Object.keys(inputs), inputs) && inputs.fromAccount !== inputs.toAccount) {
        TransfersStore.createBalanceTransfer({ ...inputs, clientId })
        openSnackbar('success', `Transferred balance successfully!`)
        closePopup()
      } else if(!checkRequiredFields(Object.keys(inputs), inputs)) {
        openSnackbar('error', `Invalid! Please fill all inputs.`)
      } else if (inputs.fromAccount === inputs.toAccount) {
        openSnackbar('error', `Invalid! 'To' and 'From' must be different.`)
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
            <div className={classes.select} key={o}>
              <InputLabel id={`balance-transfer-${o}-label`} required={true}>
                {o === 'fromAccount' ? 'Transfer From' : 'Transfer To'}
              </InputLabel>
              <Select
                labelId={`balance-transfer-${o}-label`}
                id={`balance-transfer-${o}-select`}
                value={inputs[o]}
                name={o}
                onChange={handleChange}
              >
                <MenuItem value='expenses'>Expenses</MenuItem>
                <MenuItem value='tasks'>Tasks</MenuItem>
              </Select>
            </div>
          ))
        }
        <TextField
          className={classes.input}
          required={true}
          value={inputs.amount}
          type='number'
          name='amount'
          placeholder='Amount'
          onChange={handleChange}
          label="Amount"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="fas fa-shekel-sign" style={{ color: '#757575' }}></i>
              </InputAdornment>
            )
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={datePickerTheme}>
            <KeyboardDatePicker
              required={true}
              className={classes.input}
              label="Transfer Date"
              value={inputs.date}
              onChange={(date) => setInputs({ ...inputs, date })}
              format='MMM do, yyyy'
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
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