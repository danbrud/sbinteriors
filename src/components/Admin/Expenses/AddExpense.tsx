import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { useClientsStore } from '../../../context/Clients.context'
import { FormControl, makeStyles, InputAdornment, Button, Switch, FormControlLabel, ButtonGroup } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker } from "@material-ui/pickers"
import DateFnsUtils from '@date-io/date-fns';
import { AddItemProps } from '../AddItemProps.interface'
import { useExpensesStore } from '../../../context/Expenses.context'
import { Client } from '../../../stores/Client.store'
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
  }
}))

const AddExpense: React.FC<AddItemProps> = (props) => {
  const ClientsStore = useClientsStore()
  const ExpensesStore = useExpensesStore()
  const classes = useStyles()

  const { clientName } = props
  const [inputs, setInputs] = useState({
    name: '', date: new Date(), amount: '', description: ''
  })

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  const handleSubmit = async () => {
    const client = ClientsStore.getClientByName(clientName)
    if (!client) {
      props.openSnackbar('error', 'Invalid! Make sure to select a client.')
      return
    }

    const requiredFields = ['name', 'date', 'amount']
    if (!checkRequiredFields(requiredFields, inputs)) {
      props.openSnackbar('error', 'Invalid! Make sure to fill all inputs.')
      return
    }

    try {
      const { name, date, amount, description } = inputs
      const expense = { clientId: client.id, name, date, amount, description }
      await ExpensesStore.createExpense(expense)
      await client.getBalance('expenses')
    } catch (e) {
      props.openSnackbar('error', 'Error! Something went wrong, try again!')
      return
    }

    props.openSnackbar('success', 'Added expense successfully!')
    clearInputs()
  }

  // const updateBalance = (client: Client) => {
  //   const balance = client.expensesBalance - parseInt(amount)
  //   client.updateClient('expensesBalance', balance)
  // }

  const clearInputs = () => {
    setInputs({
      name: '', date: new Date(), amount: '', description: ''
    })
  }

  return (
    <FormControl className={classes.formControl}>
      <TextField
        className={classes.input}
        required={true}
        label='Expense Name'
        value={inputs.name}
        type='text'
        name='name'
        onChange={handleChange}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          required={true}
          label="Transfer Date"
          value={inputs.date}
          onChange={(date) => setInputs({ ...inputs, date })}
          format='MMM do, yyyy'
        />
      </MuiPickersUtilsProvider>
      <TextField
        className={classes.input}
        required={true}
        value={inputs.amount}
        type='number'
        name='amount'
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
        name='description'
        onChange={handleChange}
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