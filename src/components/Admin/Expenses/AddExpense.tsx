import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { useClientsStore } from '../../../context/Clients.context'
import { FormControl, makeStyles, InputAdornment, Button, Switch, FormControlLabel, ButtonGroup } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker } from "@material-ui/pickers"
import DateFnsUtils from '@date-io/date-fns';
import { AddItemProps } from '../AddItemProps.interface'
import { useExpensesStore } from '../../../context/Expenses.context'
import { Client } from '../../../stores/Client.store'


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

const AddExpense: React.FC<AddItemProps> = (props) => {
  const ClientsStore = useClientsStore()
  const ExpensesStore = useExpensesStore()
  const classes = useStyles()

  const { clientName, setClientName } = props
  const [name, setName] = useState('')
  const [date, setDate] = useState(new Date())
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    //handle error if there is no project
    //Validate to make sure all required fields are filled
    const client = ClientsStore.getClientByName(clientName)
    const expense = { clientId: client.id, name, date, amount, description }
    ExpensesStore.createExpense(expense)

    updateBalance(client)
    clearInputs()
  }

  const updateBalance = (client: Client) => {
    const balance = client.expenseBalance - parseInt(amount)
    client.updateClient('expenseBalance', balance)
  }

  const clearInputs = () => {
    setClientName('')
    setName('')
    setDate(new Date())
    setAmount('')
    setDescription('')
  }

  return (
    <FormControl className={classes.formControl}>
      <TextField
        className={classes.input}
        required={true}
        label='Expense Name'
        value={name}
        type='text'
        onChange={(e) => setName(e.target.value)}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          required={true}
          label="Transfer Date"
          value={date}
          onChange={setDate}
          format='MMM do, yyyy'
        />
      </MuiPickersUtilsProvider>
      <TextField
        className={classes.input}
        required={true}
        value={amount}
        type='number'
        placeholder='Amount ILS'
        onChange={(e) => setAmount(e.target.value)}
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
        ADD EXPENSE
      </Button>
    </FormControl>
  )
}

export default AddExpense