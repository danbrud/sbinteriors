import React, { useState, useRef } from 'react'
import { DialogContent, DialogTitle, Dialog, TextField, makeStyles, DialogActions, Button, InputLabel, MenuItem, Select, ThemeProvider } from '@material-ui/core'
import { useClientsStore } from '../../../context/Clients.context'
import { useParams } from 'react-router-dom'
import { removeOptionalFields, checkRequiredFields } from '../../../utils/utils'
import { AddPopup } from '../AddPopup'
import { EditPopupsProps } from '../../EditPopupsProps.interface'
import { Task } from '../../../stores/Task.store'
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { datePickerTheme } from '../../../themes/datePicker.theme'
import { useGeneralAdminStore } from '../../../context/GeneralAdmin.context'

interface EditTaskPopupProps extends EditPopupsProps {
  task: Task
  setTaskToEdit: (task: Task | null) => void
}

const EditTaskPopup: React.FC<EditTaskPopupProps> = (props) => {
  const GeneralAdminStore = useGeneralAdminStore()
  const { openSnackbar, setOpen, open, task } = props

  const [inputs, setInputs] = useState({
    serviceTypeId: task.serviceType.id,
    startTime: task.startTime,
    endTime: task.endTime,
    description: task.description
  })
  const [focused, setFocused] = useState(false)


  const closePopup = () => {
    setInputs({
      serviceTypeId: null, startTime: new Date(), endTime: new Date(), description: ''
    })
    setOpen(false)
  }

  const getModifiedFields = () => {
    if(!inputs.description && !task.description) { inputs.description = null }
    return Object.keys(inputs).filter(field => (
        field === 'serviceTypeId' ? inputs[field] !== task.serviceType.id : inputs[field] !== task[field]
      ))
  }

  // const updateClient = async () => {
  //   const client = ClientsStore.getClient(task.clientId)
  //   await client.getBalance('tasks')
  // }

  const handleClose = async (shouldAdd: boolean) => {
    if (shouldAdd) {
      const fieldsToUpdate = getModifiedFields()
      if (fieldsToUpdate.length) {
        for (let field of fieldsToUpdate) {
          await task.updateTask(field, inputs[field])
        }
        // await updateClient()

        closePopup()
        openSnackbar('success', `Updated task successfully!`)
      } else {
        openSnackbar('error', `Invalid! Please fill at least one field.`)
      }
    } else {
      closePopup()
    }
  }

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  const availableTypes = GeneralAdminStore.services

  return (
    <Dialog open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
      <DialogContent>
        <InputLabel id="task-type-label" required={true}>Task Type</InputLabel>
        <Select
          labelId="task-type-label"
          id="task-type-select"
          value={inputs.serviceTypeId}
          onChange={handleChange}
          name='serviceTypeId'
          fullWidth
        >
          {availableTypes.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
        </Select>
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={datePickerTheme}>
            <KeyboardDateTimePicker
              required={true}
              label="Start Time"
              inputVariant="standard"
              value={inputs.startTime}
              onChange={(date) => setInputs({ ...inputs, startTime: date })}
              hideTabs
              fullWidth
            />
            <KeyboardDateTimePicker
              required={true}
              label="End Time"
              inputVariant="standard"
              value={inputs.endTime}
              onChange={(date) => setInputs({ ...inputs, endTime: date })}
              hideTabs
              fullWidth
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider> */}
        <TextField
          fullWidth
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