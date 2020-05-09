import React, { useState, useRef } from 'react'
import { DialogContent, DialogTitle, Dialog, TextField, makeStyles, DialogActions, Button } from '@material-ui/core'
import { useClientsStore } from '../../../context/Clients.context'
import { useParams } from 'react-router-dom'
import { removeOptionalFields } from '../../../utils/utils'
import { EditPopupsProps } from '../../EditPopupsProps.interface'
import { Expense } from '../../../stores/Expense.store'


interface EditExpensePopupProps extends EditPopupsProps {
  expense: Expense
}

const EditExpensePopup: React.FC<EditExpensePopupProps> = (props) => {
  const { openSnackbar, setOpen, open, expense } = props

  const [inputs, setInputs] = useState({
    name: '', date: '', amount: '', description: ''
  })
  const [focused, setFocused] = useState('')


  const closePopup = () => {
    setInputs({
      name: '', date: '', amount: '', description: ''
    })
    setOpen(false)
  }

  const handleClose = async (shouldAdd: boolean) => {
    if (shouldAdd) {
      // const fieldsToUpdate = removeOptionalFields(
      //   ['name', 'phone', 'email', 'spouseName', 'address', 'city', 'description'],
      //   { ...inputs }
      // )
      // if (Object.keys(fieldsToUpdate).length) {
      //   for (let field in fieldsToUpdate) {
      //     await client.updateClient(field, inputs[field])
      //   }
      //   closePopup()
      //   openSnackbar('success', `Updated client successfully!`)
      // } else {
      //   openSnackbar('error', `Invalid! Please fill at least one field.`)
      // }
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
          type='text'
          name='name'
          autoComplete='off'
          onChange={handleChange}
          label={focused === 'name' || inputs.name ? 'Expense Name' : expense.name || 'Expense Name'}
          placeholder={expense.name || 'Expense Name'}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused('')}
        />
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={datePickerTheme}>
            <KeyboardDatePicker
              required={true}
              label="Transfer Date"
              value={inputs.date}
              onChange={(date) => setInputs({ ...inputs, date })}
              format='MMM do, yyyy'
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
        <TextField
          className={classes.input}
          required={true}
          value={inputs.amount}
          type='number'
          name='amount'
          autoComplete='off'
          placeholder='Amount ILS'
          onChange={handleChange}
          label="Expense Amount"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="fas fa-shekel-sign" style={{ color: '#757575' }}></i>
              </InputAdornment>
            )
          }}
        />
        <TextField
          className={classes.input}
          multiline={true}
          label='Description'
          value={inputs.description}
          type='text'
          autoComplete='off'
          name='description'
          onChange={handleChange}
        />
        <TextField
          fullWidth={true}
          name='phone'
          value={inputs.phone}
          type='tel'
          autoComplete='off'
          onChange={handleChange}
          label={focused === 'phone' || inputs.phone ? 'Phone Number' : client.phone || 'Phone Number'}
          placeholder={client.phone || 'Phone Number'}
          onFocus={() => setFocused('phone')}
          onBlur={() => setFocused('')}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          name='email'
          value={inputs.email}
          type='email'
          autoComplete='off'
          onChange={handleChange}
          label={focused === 'email' || inputs.email ? 'Email Address' : client.email || 'Email Address'}
          placeholder={client.email || 'Email Address'}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused('')}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          name='spouseName'
          autoComplete='off'
          value={inputs.spouseName}
          onChange={handleChange}
          label={focused === 'spouseName' || inputs.spouseName ? 'Spouse Name' : client.spouseName || 'Spouse Name'}
          placeholder={client.spouseName || 'Spouse Name'}
          onFocus={() => setFocused('spouseName')}
          onBlur={() => setFocused('')}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          name='address'
          autoComplete='off'
          value={inputs.address}
          type='text'
          onChange={handleChange}
          label={focused === 'address' || inputs.address ? 'Address' : client.address || 'Address'}
          placeholder={client.address || 'Address'}
          onFocus={() => setFocused('address')}
          onBlur={() => setFocused('')}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          name='city'
          value={inputs.city}
          type='text'
          autoComplete='off'
          onChange={handleChange}
          label={focused === 'city' || inputs.city ? 'City' : client.city || 'City'}
          placeholder={client.city || 'City'}
          onFocus={() => setFocused('city')}
          onBlur={() => setFocused('')}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          multiline={true}
          name='description'
          autoComplete='off'
          value={inputs.description}
          type='text'
          onChange={handleChange}
          label={focused === 'description' || inputs.description ? 'Description' : client.description || 'Description'}
          placeholder={client.description || 'Description'}
          onFocus={() => setFocused('description')}
          onBlur={() => setFocused('')}
        /> */}
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