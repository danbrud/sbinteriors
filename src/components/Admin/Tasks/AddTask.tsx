import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { useClientsStore } from '../../../context/Clients.context'
import { InputLabel, Select, MenuItem, FormControl, makeStyles, Button, ThemeProvider } from '@material-ui/core'
import { DateTimePicker, MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers"
import DateFnsUtils from '@date-io/date-fns';
import { AddItemProps } from '../AddItemProps.interface'
import { useTasksStore } from '../../../context/Tasks.context'
import { useGeneralAdminStore } from '../../../context/GeneralAdmin.context'
import { observer } from 'mobx-react'
import { checkRequiredFields } from '../../../utils'
import { datePickerTheme } from '../../../themes/datePicker.theme'
import '../../../styles/CalendarButton.css'
import { AddPopup } from '../AddPopup'



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
  },
  select: {
    display: 'grid',
    gridTemplateColumns: '4fr 1fr',
    alignItems: 'end'
  },
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

  const { clientName } = props
  const [inputs, setInputs] = useState<taskInputs>({
    taskType: null, startTime: new Date(), endTime: new Date(), description: ''
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

    const requiredFields = ['taskType', 'startTime', 'endTime']
    if (!checkRequiredFields(requiredFields, inputs)) {
      props.openSnackbar('error', 'Invalid! Make sure to fill all inputs.')
      return
    }

    if (inputs.startTime > inputs.endTime) {
      props.openSnackbar('error', 'Invalid! End time must be after start time.')
      return
    }

    try {
      const { taskType, startTime, endTime, description } = inputs
      const task = { clientId: client.id, serviceTypeId: taskType, startTime, endTime, description }
      await TasksStore.createTask(task)
      await client.getBalance('tasks')
    } catch (e) {
      props.openSnackbar('error', 'Error! Something went wrong, try again!')
      return
    }

    props.openSnackbar('success', 'Added task successfully!')
    clearInputs()
    props.redirect()
  }

  const clearInputs = () => {
    setInputs({
      taskType: null, startTime: new Date(), endTime: new Date(), description: ''
    })
  }

  const availableTypes = GeneralAdminStore.services

  return (
    <FormControl className={classes.formControl}>
      <div className={classes.select}>
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
        <AddPopup name='Service' openSnackbar={props.openSnackbar}/>
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={datePickerTheme}>
          <KeyboardDateTimePicker
            required={true}
            className={classes.input}
            label="Start Time"
            inputVariant="standard"
            value={inputs.startTime}
            onChange={(date) => setInputs({ ...inputs, startTime: date })}
            hideTabs
          />
          <KeyboardDateTimePicker
            required={true}
            className={classes.input}
            label="End Time"
            inputVariant="standard"
            value={inputs.endTime}
            onChange={(date) => setInputs({ ...inputs, endTime: date })}
            hideTabs
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
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