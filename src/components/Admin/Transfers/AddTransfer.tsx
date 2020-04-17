import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { useClientsStore } from '../../../context/Clients.context'
import { InputLabel, Select, MenuItem, FormControl, makeStyles, InputAdornment, Button, Switch, FormControlLabel, ButtonGroup } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import DateFnsUtils from '@date-io/date-fns';
import { AddItemProps } from '../AddItemProps.interface'
import { useTransfersStore } from '../../../context/Transfers.context'


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
  }
}))

const AddTransfer: React.FC<AddItemProps> = (props) => {
  const ClientsStore = useClientsStore()
  const TransfersStore = useTransfersStore()
  const classes = useStyles()

  const { clientName, setClientName } = props
  const [date, setDate] = useState(new Date())
  const [foreignAmount, setForeignAmount] = useState('')
  const [foreignAmountCurrency, setForeignAmountCurrency] = useState('')
  const [ilsAmount, setIlsAmount] = useState('')
  const [transferMethod, setTransferMethod] = useState('')
  const [description, setDescription] = useState('')
  const [hasForeignAmount, setHasForeignAmount] = useState(false)

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
    const transfer = { clientId: client.id, date, foreignAmount, foreignAmountCurrency, ilsAmount, transferMethod, description }
    TransfersStore.createTransfer(transfer)

    //handle balance
    // const balance =  + parseInt(ilsAmount)
    // client.updateClient('balance', balance)
    clearInputs()
  }

  const clearInputs = () => {
    setClientName('')
    setDate(new Date())
    setForeignAmount('')
    setForeignAmountCurrency('')
    setIlsAmount('')
    setTransferMethod('')
    setDescription('')
    setHasForeignAmount(false)
  }

  const availableTransferMethods = [
    'Paypal', 'Bank Hapoalim', 'Bank Mizrachi', 'CAD Account'
  ]

  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.input} id="transfer-method-label" required={true}>Transfer Method</InputLabel>
      <Select
        className={classes.input}
        labelId="transfer-method-label"
        id="tranfer-method-select"
        value={transferMethod}
        onChange={(e) => setTransferMethod(e.target.value as string)}
      >
        {availableTransferMethods.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
      </Select>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
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
        hasForeignAmount ? (
          <TextField
            className={classes.input}
            value={foreignAmount}
            placeholder='Foreign Amount'
            label='Foreign Amount'
            type='number'
            onChange={(e) => setForeignAmount(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ButtonGroup variant="text" color='primary' size="small" className={classes.buttonGroup}>
                    <Button
                      variant={foreignAmountCurrency === 'USD' ? 'outlined' : null}
                      onClick={() => setForeignAmountCurrency('USD')}
                    >
                      USD
                      </Button>
                    <Button
                      variant={foreignAmountCurrency === 'CAD' ? 'outlined' : null}
                      onClick={() => setForeignAmountCurrency('CAD')}
                    >
                      CAD
                      </Button>
                  </ButtonGroup>
                </InputAdornment>
              )
            }}
          />
        )
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
}

export default AddTransfer