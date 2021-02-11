import React, { useState, useRef } from 'react'
import { DialogContent, DialogTitle, Dialog, TextField, makeStyles, DialogActions, Button, ThemeProvider, InputAdornment, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, Switch } from '@material-ui/core'
import { useClientsStore } from '../../../context/Clients.context'
import { useParams } from 'react-router-dom'
import { removeOptionalFields } from '../../../utils/utils'
import { EditPopupsProps } from '../../EditPopupsProps.interface'
import { Expense } from '../../../stores/Expense.store'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { datePickerTheme } from '../../../themes/datePicker.theme'
import { Transfer } from '../../../stores/Transfer.store'
import { useGeneralAdminStore } from '../../../context/GeneralAdmin.context'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '95%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    margin: '4px'
  },
  button: {
    marginTop: '10px',
    color: 'white'
  },
  buttonGroup: {
    marginBottom: '3px'
  },
  radio: {
    marginLeft: '4px'
  },
  radioLabel: {
    margin: '4px 0 0 4px'
  },
  currencyInput: {
    width: '25%',
    marginLeft: '23px'
  },
  foreignAmountInput: {
    width: '60%'
  },
  select: {
    display: 'grid',
    margin: '4px',
    gridTemplateColumns: '4fr 1fr',
    alignItems: 'end'
  },
}))

interface EditTransferPopupProps extends EditPopupsProps {
  transfer: Transfer
}

const EditTransferPopup: React.FC<EditTransferPopupProps> = (props) => {
  const classes = useStyles()
  const { clientId } = useParams()
  const ClientsStore = useClientsStore()
  const GeneralAdminStore = useGeneralAdminStore()
  const { openSnackbar, setOpen, open, transfer } = props

  const [inputs, setInputs] = useState({
    date: transfer.date, foreignAmount: '', foreignAmountCurrency: '', ilsAmount: '',
    transferMethodId: transfer.transferMethod.id, description: '', account: transfer.account
  })
  const [hasForeignAmount, setHasForeignAmount] = useState(transfer.foreignAmount ? true : false)
  const [focused, setFocused] = useState('')


  const closePopup = () => {
    setInputs({
      date: transfer.date, foreignAmount: '', foreignAmountCurrency: '', ilsAmount: '',
      transferMethodId: transfer.transferMethod.id, description: '', account: transfer.account
    })
    setOpen(false)
  }

  const validateFields = (inputs) => {
    if (inputs.date === transfer.date) { delete inputs.date }
    if (inputs.account === transfer.account) { delete inputs.account }
    if (inputs.transferMethodId === transfer.transferMethod.id) { delete inputs.transferMethod }

    //not correct - might need to make sure the user is not removing something from a field
    // if (inputs.foreignAmount === transfer.foreignAmount) { delete inputs.foreignAmount }
    // if (inputs.foreignAmountCurrency === transfer.foreignAmountCurrency) { delete inputs.foreignAmountCurrency }

    return removeOptionalFields(['ilsAmount', 'description', 'foreignAmount', 'foreignAmountCurrency'], inputs)
  }

  const handleClose = async (shouldAdd: boolean) => {
    if (shouldAdd) {
      const fieldsToUpdate = validateFields({ ...inputs })
      if (Object.keys(fieldsToUpdate).length) {
        for (let field in fieldsToUpdate) {
          await transfer.updateTransfer(field, inputs[field])
        }

        const client = ClientsStore.getClient(clientId)
        await client.getBalance('expenses')
        await client.getBalance('tasks')

        closePopup()
        openSnackbar('success', `Updated transfer successfully!`)
      } else {
        openSnackbar('error', `Invalid! Please update at least one field.`)
      }
    } else {
      closePopup()
    }
  }

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  const checkForeignAmount = ({ target }) => {
    const { checked } = target
    setHasForeignAmount(checked)
    if (!checked) {
      setInputs({ ...inputs, foreignAmountCurrency: '' })
    }
  }

  const availableTransferMethods = GeneralAdminStore.transferMethods

  return (
    <Dialog open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Transfer</DialogTitle>
      <DialogContent>
        <InputLabel id="transfer-method-label" required={true}>Transfer Method</InputLabel>
        <Select
          fullWidth
          labelId="transfer-method-label"
          id="tranfer-method-select"
          value={inputs.transferMethodId}
          name='transferMethod'
          onChange={handleChange}
        >
          {availableTransferMethods.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
        </Select>
        <FormLabel
          className={classes.radioLabel}
          component="legend"
        >
          Transfer Type
      </FormLabel>
        <RadioGroup
          className={classes.radio}
          row
          value={inputs.account}
          onChange={handleChange}
          name='account'
        >
          <FormControlLabel
            value="expenses" control={<Radio color='primary' />} label="Expenses"
          />
          <FormControlLabel
            value="tasks" control={<Radio color='primary' />} label="Tasks"
          />
        </RadioGroup>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={datePickerTheme}>
            <KeyboardDatePicker
              fullWidth
              required={true}
              label="Transfer Date"
              value={inputs.date}
              onChange={(date) => setInputs({ ...inputs, date })}
              format='MMM do, yyyy'
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
        <FormControlLabel
          control={
            <Switch
              checked={hasForeignAmount}
              onChange={checkForeignAmount}
              color="primary"
            />
          }
          label='Foreign Currency Transfer?'
        />
        {
          hasForeignAmount
            ? <div>
              <TextField
                value={inputs.foreignAmount}
                name='foreignAmount'
                type='number'
                autoComplete='off'
                onChange={handleChange}
                className={classes.foreignAmountInput}
                label={focused === 'foreignAmount' || inputs.foreignAmount ? 'Foreign Amount' : transfer.foreignAmount || 'Foreign Amount'}
                placeholder={transfer.foreignAmount ? transfer.foreignAmount.toString() : 'Foreign Amount'}
                onFocus={() => setFocused('foreignAmount')}
                onBlur={() => setFocused('')}
              />
              <TextField
                value={inputs.foreignAmountCurrency}
                name='foreignAmountCurrency'
                onChange={handleChange}
                className={classes.currencyInput}
                label={focused === 'foreignAmountCurrency' || inputs.foreignAmountCurrency ? 'Currency' : transfer.foreignAmountCurrency || 'Currency'}
                placeholder={transfer.foreignAmountCurrency ? transfer.foreignAmountCurrency.toString() : 'Currency'}
                onFocus={() => setFocused('foreignAmountCurrency')}
                onBlur={() => setFocused('')}
              />
            </div>
            : null
        }
        <TextField
          fullWidth
          required={true}
          value={inputs.ilsAmount}
          name='ilsAmount'
          type='number'
          autoComplete='off'
          onChange={handleChange}
          label={focused === 'ilsAmount' || inputs.ilsAmount ? 'Amount ILS' : transfer.ilsAmount || 'Amount ILS'}
          placeholder={transfer.ilsAmount.toString() || 'Amount ILS'}
          onFocus={() => setFocused('ilsAmount')}
          onBlur={() => setFocused('')}
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
          name='description'
          autoComplete='off'
          type='text'
          onChange={handleChange}
          label={focused === 'description' || inputs.description ? 'Description' : transfer.description || 'Description'}
          placeholder={transfer.description || 'Description'}
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

export default EditTransferPopup