import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { useClientsStore } from '../../../context/Clients.context'
import { InputLabel, Select, MenuItem, FormControl, makeStyles, InputAdornment, Button, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { DateTimePicker, MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers"
import DateFnsUtils from '@date-io/date-fns';
import { AddItemProps } from '../AddItemProps.interface'
import { useTasksStore } from '../../../context/Tasks.context'
import { Client } from '../../../stores/Client.store'
import { useGeneralAdminStore } from '../../../context/GeneralAdmin.context'
import { observer } from 'mobx-react'



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

type taskInputs = {
  taskType: null | number
  startTime: Date
  endTime: Date
  description: string
}

const AddTask: React.FC<AddItemProps> = observer((props) => {
  const ClientsStore = useClientsStore()
  const TasksStore = useTasksStore()
  const GeneralAdminStore = useGeneralAdminStore()
  const classes = useStyles()

  const { clientName, setClientName } = props
  const [inputs, setInputs] = useState<taskInputs>({
    taskType: null, startTime: new Date(), endTime: new Date(), description: ''
  })
  // const [taskType, setTaskType] = useState<null | number>(null)
  // const [startTime, setStartTime] = useState(new Date())
  // const [endTime, setEndTime] = useState(new Date())
  // const [price, setPrice] = useState('')
  // const [description, setDescription] = useState('')
  // const [billable, setBillable] = useState('no charge')

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  const handleSubmit = async () => {
    //handle error if there is no project
    //Validate to make sure all required fields are filled
    const client = ClientsStore.getClientByName(clientName)
    const { taskType, startTime, endTime, description } = inputs
    const task = { clientId: client.id, serviceTypeId: taskType, startTime, endTime, description }
    await TasksStore.createTask(task)
    await client.getBalance('tasks')

    props.openSnackbar('success', 'Added task successfully!')
    // props.openSnackbar('error', 'Invalid! Make sure to fill all inputs.')
    clearInputs()
  }

  //delete (happens automatically)
  // const updateBalance = (client: Client) => {
  //   const balance = client.tasksBalance - parseInt(inputs.price)
  //   client.updateClient('tasksBalance', balance)
  // }

  // const handleRadioChange = ({ target }) => {
  //   const { value } = target
  //   if (value === 'no charge') { setPrice('') }
  //   setBillable(value)
  // }

  const clearInputs = () => {
    setInputs({
      taskType: null, startTime: new Date(), endTime: new Date(), description: ''
    })
  }

  const availableTypes = GeneralAdminStore.services

  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.input} id="task-type-label" required={true}>Task Type</InputLabel>
      <Select
        className={classes.input}
        labelId="task-type-label"
        id="task-type-select"
        value={inputs.taskType}
        onChange={handleChange}
        name='taskType'
      >
        {availableTypes.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
      </Select>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          required={true}
          className={classes.input}
          label="Start Time"
          inputVariant="standard"
          value={inputs.startTime}
          onChange={(date) => setInputs({ ...inputs, startTime: date })}
        />
        <KeyboardDateTimePicker
          required={true}
          className={classes.input}
          label="End Time"
          inputVariant="standard"
          value={inputs.endTime}
          onChange={(date) => setInputs({ ...inputs, endTime: date })}
        />
      </MuiPickersUtilsProvider>
      {/* <RadioGroup row value={billable} onChange={handleRadioChange}>
        <FormControlLabel value="no charge" control={<Radio color='primary' />} label="No Charge" />
        <FormControlLabel value="billable" control={<Radio color='primary' />} label="Billable" />
      </RadioGroup> */}
      {/* billable === 'billable'
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
        */}
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
        ADD TASK
        </Button>
    </FormControl>
  )
})

export default AddTask