import React, { useState, useRef } from 'react'
import { DialogContent, DialogTitle, Dialog, TextField, makeStyles, DialogActions, Button, ThemeProvider, InputAdornment } from '@material-ui/core'
import { useClientsStore } from '../../../context/Clients.context'
import { useParams } from 'react-router-dom'
import { removeOptionalFields } from '../../../utils/utils'
import { EditPopupsProps } from '../../EditPopupsProps.interface'
import { Expense } from '../../../stores/Expense.store'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { datePickerTheme } from '../../../themes/datePicker.theme'


interface EditExpensePopupProps extends EditPopupsProps {
  expense: Expense
}

const EditExpensePopup: React.FC<EditExpensePopupProps> = (props) => {
  const { openSnackbar, setOpen, open, expense } = props

  const [inputs, setInputs] = useState({
    name: '', date: expense.date, amount: '', description: ''
  })
  const [focused, setFocused] = useState('')


  const closePopup = () => {
    setInputs({
      name: '', date: expense.date, amount: '', description: ''
    })
    setOpen(false)
  }

  const validateFields = (inputs) => {
    if (inputs.date === expense.date) { delete inputs.date }
    return removeOptionalFields(['name', 'amount', 'description'], inputs)
  }

  const handleClose = async (shouldAdd: boolean) => {
    if (shouldAdd) {
      const fieldsToUpdate = validateFields({ ...inputs })
      if (Object.keys(fieldsToUpdate).length) {
        for (let field in fieldsToUpdate) {
          await expense.updateExpense(field, inputs[field])
        }
        closePopup()
        openSnackbar('success', `Updated expense successfully!`)
      } else {
        openSnackbar('error', `Invalid! Please fill at least one field.`)
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
      <DialogTitle id="form-dialog-title">Edit Expense</DialogTitle>
      <DialogContent>
        <TextField
          value={inputs.name}
          fullWidth
          type='text'
          name='name'
          autoComplete='off'
          onChange={handleChange}
          label={focused === 'name' || inputs.name ? 'Expense Name' : expense.name || 'Expense Name'}
          placeholder={expense.name || 'Expense Name'}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused('')}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={datePickerTheme}>
            <KeyboardDatePicker
              fullWidth
              label="Expense Date"
              value={inputs.date}
              onChange={(date) => setInputs({ ...inputs, date })}
              format='MMM do, yyyy'
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
        <TextField
          value={inputs.amount}
          type='number'
          name='amount'
          autoComplete='off'
          onChange={handleChange}
          fullWidth
          label='Expense Amount'
          placeholder={expense.amount.toString() || 'Amount ILS'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="fas fa-shekel-sign" style={{ color: '#757575' }}></i>
              </InputAdornment>
            )
          }}
        />
        <TextField
          fullWidth
          multiline={true}
          value={inputs.description}
          type='text'
          autoComplete='off'
          name='description'
          onChange={handleChange}
          label={focused === 'description' || inputs.description ? 'Description' : expense.description || 'Description'}
          placeholder={expense.name || 'Description'}
          onFocus={() => setFocused('description')}
          onBlur={() => setFocused('')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          Cancel
          </Button>
        <Button onClick={() => handleClose(true)} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditExpensePopup