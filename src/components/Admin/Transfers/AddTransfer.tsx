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

const AddTransfer: React.FC<AddItemProps> = observer((props) => {
  const ClientsStore = useClientsStore()
  const TransfersStore = useTransfersStore()
  const GeneralAdminStore = useGeneralAdminStore()
  const classes = useStyles()

  const { clientName, setClientName } = props

  const [date, setDate] = useState(new Date())
  const [foreignAmount, setForeignAmount] = useState('')
  const [foreignAmountCurrency, setForeignAmountCurrency] = useState('USD')
  const [ilsAmount, setIlsAmount] = useState('')
  const [transferMethod, setTransferMethod] = useState<null | number>(null)
  const [description, setDescription] = useState('')
  const [hasForeignAmount, setHasForeignAmount] = useState(false)
  const [balanceType, setBalanceType] = useState('expenses')

  const checkForeignAmount = ({ target }) => {
    const { checked } = target
    setHasForeignAmount(checked)
    if (!checked) {
      setForeignAmountCurrency('')
    }
  }

  const handleSubmit = () => {
    //handle error if there is no project
    //Validate to make sure all required fields are filled
    const client = ClientsStore.getClientByName(clientName)
    const transfer = { clientId: client.id, date, foreignAmount, foreignAmountCurrency, ilsAmount, transferMethodId: transferMethod, description }
    TransfersStore.createTransfer(transfer)

    updateBalance(client)
    clearInputs()
  }

  const updateBalance = (client: Client) => {
    const balance = client[balanceType] + parseInt(ilsAmount)
    client.updateClient(balanceType, balance)
  }

  const clearInputs = () => {
    setClientName('')
    setDate(new Date())
    setForeignAmount('')
    setForeignAmountCurrency('')
    setIlsAmount('')
    setTransferMethod(null)
    setDescription('')
    setHasForeignAmount(false)
  }

  const availableTransferMethods = GeneralAdminStore.transferMethods

  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.input} id="transfer-method-label" required={true}>Transfer Method</InputLabel>
      <Select
        className={classes.input}
        labelId="transfer-method-label"
        id="tranfer-method-select"
        value={transferMethod}
        onChange={(e) => setTransferMethod(e.target.value as number)}
      >
        {availableTransferMethods.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
      </Select>
      <FormLabel className={classes.radioLabel} component="legend">Transfer Type</FormLabel>
      <RadioGroup className={classes.radio} row value={balanceType} onChange={(e) => setBalanceType(e.target.value)}>
        <FormControlLabel value="expenses" control={<Radio color='primary' />} label="Expenses" />
        <FormControlLabel value="tasks" control={<Radio color='primary' />} label="Tasks" />
      </RadioGroup>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          required={true}
          label="Transfer Date"
          value={date}
          onChange={setDate}
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
              value={foreignAmount}
              placeholder='Foreign Amount'
              label='Foreign Amount'
              type='number'
              onChange={(e) => setForeignAmount(e.target.value)}
              className={classes.foreignAmountInput}
            />
            <TextField
              value={foreignAmountCurrency}
              placeholder='Currency'
              label='Currency'
              onChange={(e) => setForeignAmountCurrency(e.target.value)}
              className={classes.currencyInput}
            />
          </div>
          : null
      }
      <TextField
        className={classes.input}
        required={true}
        value={ilsAmount}
        placeholder='Amount ILS'
        type='number'
        onChange={(e) => setIlsAmount(e.target.value)}
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
        value={description}
        type='text'
        onChange={(e) => setDescription(e.target.value)}
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