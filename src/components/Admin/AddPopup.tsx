import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useGeneralAdminStore } from '../../context/GeneralAdmin.context'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import { makeStyles } from '@material-ui/core'
import { AddItemProps } from './AddItemProps.interface'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'inline-block',
    width: '25%'
  }
}))


interface AddPopupProps extends AddItemProps {
  name: 'Transfer Method' | 'Service'
}

export const AddPopup: React.FC<AddPopupProps> = (props) => {
  const classes = useStyles()
  const { name, openSnackbar } = props
  const methodName = name === 'Transfer Method' ? 'addTransferMethod' : 'addService'

  const [open, setOpen] = useState(false)
  const [item, setItem] = useState('')
  const GeneralAdminStore = useGeneralAdminStore()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const closePopup = () => {
    setItem('')
    setOpen(false)
  }

  const handleClose = (shouldAdd: boolean) => {
    if (shouldAdd) {
      if (item) {
        GeneralAdminStore[methodName](item)
        openSnackbar('success', `Added ${name} Successfully!`)
        closePopup()
      } else {
        openSnackbar('error', `Invalid! Please enter a ${name}.`)
      }
    } else {
      closePopup()
    }
  }

  return (
    <span className={classes.button}>
      <Button color="primary" onClick={handleClickOpen}>
        <AddToPhotosIcon />
      </Button>
      <Dialog open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add {name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={name}
            type="text"
            fullWidth
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}