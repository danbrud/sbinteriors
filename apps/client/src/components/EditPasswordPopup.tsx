import React, { useState } from 'react'
import { EditPopupsProps } from './EditPopupsProps.interface'
import { Dialog, DialogTitle, DialogContent, TextField, InputBase, DialogActions, Button } from '@material-ui/core'
import { useUserStore } from '../context/User.context'


const EditPasswordPopup: React.FC<EditPopupsProps> = (props) => {
  const { openSnackbar, setOpen, open } = props
  const [inputs, setInputs] = useState({ password1: '', password2: '' })
  const UserStore = useUserStore()

  const closePopup = () => {
    setInputs({ password1: '', password2: '' })
    setOpen(false)
  }

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  const validatePassword = () => {
    return inputs.password1 === inputs.password2 && inputs.password1 && inputs.password2
  }

  const handleClose = async (shouldAdd: boolean) => {
    if (shouldAdd) {
      if (validatePassword()) {
        await UserStore.updatePassword(inputs.password1)
        closePopup()
        openSnackbar('success', `Updated password successfully!`)
      } else {
        openSnackbar('error', `Invalid! Make sure you enter a new password and that both passwords are identical.`)
      }
    } else {
      closePopup()
    }
  }

  return (
    <Dialog open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          value={inputs.password1}
          name='password1'
          autoComplete='off'
          type='password'
          onChange={handleChange}
          label='Password 1'
          placeholder='Password 1'
        />
        <TextField
          fullWidth
          value={inputs.password2}
          name='password2'
          autoComplete='off'
          type='password'
          onChange={handleChange}
          label='Password 2'
          placeholder='Password 2'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          Cancel
          </Button>
        <Button onClick={() => handleClose(true)} color="primary">
          Change
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditPasswordPopup