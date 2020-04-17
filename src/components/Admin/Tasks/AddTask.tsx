import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { useClientsStore } from '../../../context/Clients.context'
import { InputLabel, Select, MenuItem, FormControl, makeStyles, InputAdornment, Button, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from '@date-io/date-fns';
import { AddItemProps } from '../AddItemProps.interface'
import { useTasksStore } from '../../../context/Tasks.context'



const useStyles = makeStyles((theme) => ({
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
  }
}))

const AddTask: React.FC<AddItemProps> = (props) => {
  const ClientsStore = useClientsStore()
  const TasksStore = useTasksStore()
  const classes = useStyles()

  const { clientName, setClientName } = props
  const [taskType, setTaskType] = useState('')
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [billable, setBillable] = useState('no charge')

  const handleSubmit = () => {
    //handle error if there is no project
    //Validate to make sure all required fields are filled
    const client = ClientsStore.getClientByName(clientName)
    const task = { clientId: client.id, type: taskType, startTime, endTime, price, description }
    TasksStore.createTask(task)
    clearInputs()
  }

  const handleRadioChange = ({ target }) => {
    const { value } = target
    if (value === 'no charge') { setPrice('') }
    setBillable(value)
  }

  const clearInputs = () => {
    setClientName('')
    setTaskType('')
    setStartTime(new Date())
    setEndTime(new Date())
    setPrice('')
    setDescription('')
  }

  const availableTypes = ['Home Styling', 'AutoCad', 'Site Visit', 'Shopping']

  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.input} id="task-type-label" required={true}>Task Type</InputLabel>
      <Select
        className={classes.input}
        labelId="task-type-label"
        id="task-type-select"
        value={taskType}
        onChange={(e) => setTaskType(e.target.value as string)}
      >
        {availableTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
      </Select>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          required={true}
          className={classes.input}
          label="Start Time"
          inputVariant="standard"
          value={startTime}
          onChange={(date) => setStartTime(date)}
        />
        <DateTimePicker
          required={true}
          className={classes.input}
          label="End Time"
          inputVariant="standard"
          value={endTime}
          onChange={(date) => setEndTime(date)}
        />
      </MuiPickersUtilsProvider>
      <RadioGroup row value={billable} onChange={handleRadioChange}>
        <FormControlLabel value="no charge" control={<Radio color='primary' />} label="No Charge" />
        <FormControlLabel value="billable" control={<Radio color='primary' />} label="Billable" />
      </RadioGroup>
      {billable === 'billable'
        ? <TextField
          className={classes.input}
          required={true} //Maybe only required if the billable radio button is clicked
          value={price}
          placeholder='Price'
          onChange={(e) => setPrice(e.target.value)}
          label="Price"
          type='number'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="fas fa-shekel-sign" style={{ color: '#757575' }}></i>
              </InputAdornment>
            )
          }}
        />
        : null
      }
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
        ADD TASK
        </Button>
    </FormControl>
  )
}

export default AddTask