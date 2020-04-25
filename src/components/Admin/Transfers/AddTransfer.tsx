import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { useClientsStore } from '../../../context/Clients.context'
import { InputLabel, Select, MenuItem, FormControl, makeStyles, InputAdornment, Button, Switch, FormControlLabel, ButtonGroup, FormLabel, RadioGroup, Radio } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker } from "@material-ui/pickers"
import DateFnsUtils from '@date-io/date-fns';
import { AddItemProps } from '../AddItemProps.interface'
import { useTransfersStore } from '../../../context/Transfers.context'
import { Client } from '../../../stores/Client.store'
import { useGeneralAdminStore } from '../../../context/GeneralAdmin.context'
import { observer } from 'mobx-react'
import { checkRequiredFields } from '../../../utils'


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
    width: '33%',
    marginLeft: '20px'
  },
  foreignAmountInput: {
    width: '60%'
  }
}))

type transferInputs = {
  date: Date
  foreignAmount: string
  foreignAmountCurrency: string,
  ilsAmount: string
  transferMethod: null | number
  description: string
  account: 'expenses' | 'tasks',
}

const AddTransfer: React.FC<AddItemProps> = observer((props) => {
  const ClientsStore = useClientsStore()
  const TransfersStore = useTransfersStore()
  const GeneralAdminStore = useGeneralAdminStore()
  const classes = useStyles()

  const { clientName } = props
  const [inputs, setInputs] = useState<transferInputs>({
    date: new Date(), foreignAmount: '', foreignAmountCurrency: 'USD',
    ilsAmount: '', transferMethod: null, description: '', account: 'expenses'
  })
  const [hasForeignAmount, setHasForeignAmount] = useState(false)

  const checkForeignAmount = ({ target }) => {
    const { checked } = target
    setHasForeignAmount(checked)
    if (checked) {
      setInputs({ ...inputs, foreignAmountCurrency: 'USD' })
    } else {
      setInputs({ ...inputs, foreignAmountCurrency: '' })
    }
  }

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  const handleSubmit = async () => {
    const client = ClientsStore.getClientByName(clientName)
    if (!client) {
      props.openSnackbar('error', 'Invalid! Make sure to select a client.')
      return
    }

    const requiredFields = ['transferMethod', 'date', 'ilsAmount', 'account']
    if (hasForeignAmount) {
      requiredFields.push('foreignAmount', 'foreignAmountCurrency')
    }

    if (!checkRequiredFields(requiredFields, inputs)) {
      props.openSnackbar('error', 'Invalid! Make sure to fill all inputs.')
      return
    }

    try {
      const {
        date, foreignAmount, foreignAmountCurrency, ilsAmount,
        transferMethod, description, account
      } = inputs

      const transfer = {
        clientId: client.id, date, foreignAmount, foreignAmountCurrency, ilsAmount,
        transferMethodId: transferMethod, description, account
      }
      await TransfersStore.createTransfer(transfer)
      account === 'expenses' ? await client.getBalance('expenses') : await client.getBalance('tasks')
    } catch (e) {
      props.openSnackbar('error', 'Error! Something went wrong, try again!')
      return
    }

    props.openSnackbar('success', 'Added transfer successfully!')
    clearInputs()
  }

  // const updateBalance = (client: Client) => {
  //   const balance = client[balanceType] + parseInt(ilsAmount)
  //   client.updateClient(balanceType, balance)
  // }

  const clearInputs = () => {
    setInputs({
      date: new Date(), foreignAmount: '', foreignAmountCurrency: 'USD',
      ilsAmount: '', transferMethod: null, description: '', account: 'expenses'
    })
  }

  const availableTransferMethods = GeneralAdminStore.transferMethods

  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.input} id="transfer-method-label" required={true}>Transfer Method</InputLabel>
      <Select
        className={classes.input}
        labelId="transfer-method-label"
        id="tranfer-method-select"
        value={inputs.transferMethod}
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
        <KeyboardDatePicker
          required={true}
          label="Transfer Date"
          value={inputs.date}
          onChange={(date) => setInputs({ ...inputs, date })}
          format='MMM do, yyyy'
        />
      </MuiPickersUtilsProvider>
      <FormControlLabel
        // labelPlacement='start'
        control={
          <Switch
            checked={hasForeignAmount}
            onChange={checkForeignAmount}
            color="primary"
          />
        }
        label='Foreign Currency Tranfer?'
      />
      {
        hasForeignAmount
          ? <div className={classes.input}>
            <TextField
              value={inputs.foreignAmount}
              name='foreignAmount'
              placeholder='Foreign Amount'
              label='Foreign Amount'
              type='number'
              onChange={handleChange}
              className={classes.foreignAmountInput}
            />
            <TextField
              value={inputs.foreignAmountCurrency}
              name='foreignAmountCurrency'
              placeholder='Currency'
              label='Currency'
              onChange={handleChange}
              className={classes.currencyInput}
            />
          </div>
          : null
      }
      <TextField
        className={classes.input}
        required={true}
        value={inputs.ilsAmount}
        name='ilsAmount'
        placeholder='Amount ILS'
        type='number'
        onChange={handleChange}
        label="Amount ILS"
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
        name='description'
        type='text'
        onChange={handleChange}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        ADD TRANSFER
        </Button>
    </FormControl>
  )
})

export default AddTransfer