import React, { useState, useRef } from 'react'
import { DialogContent, DialogTitle, Dialog, TextField, makeStyles, DialogActions, Button, InputLabel, MenuItem } from '@material-ui/core'
import { useClientsStore } from '../../../context/Clients.context'
import { useParams } from 'react-router-dom'
import { removeOptionalFields, checkRequiredFields } from '../../../utils/utils'
import { AddPopup } from '../AddPopup'
import { EditPopupsProps } from '../../EditPopupsProps.interface'
import { Task } from '../../../stores/Task.store'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'inline-block',
    width: '25%'
  },
  select: {
    display: 'grid',
    margin: '4px'
  },
  input: {
    // margin: '4px'
  }
}))

interface EditTaskPopupProps extends EditPopupsProps {
  task: Task
  setTaskToEdit: (task: Task | null) => void
}

const EditTaskPopup: React.FC<EditTaskPopupProps> = (props) => {
  const classes = useStyles()
  const { openSnackbar, setOpen, open, task } = props

  const [inputs, setInputs] = useState({
    taskType: task.serviceType,
    startTime: task.startTime,
    endTime: task.endTime,
    description: ''
  })
  const [focused, setFocused] = useState(false)


  const closePopup = () => {
    setInputs({
      taskType: null, startTime: new Date(), endTime: new Date(), description: ''
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
      <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
      <DialogContent>
        {/* <div className={classes.select}>
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
        */}
        <TextField
          className={classes.input}
          multiline={true}
          value={inputs.description}
          name='description'
          autoComplete='off'
          type='text'
          onChange={handleChange}
          label={focused || inputs.description ? 'Description' : task.description || 'Description'}
          placeholder={task.description || 'Description'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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

export default EditTaskPopup