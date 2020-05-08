import React, { useState, useRef } from 'react'
import { DialogContent, DialogTitle, Dialog, TextField, makeStyles, DialogActions, Button } from '@material-ui/core'
import { useClientsStore } from '../../../context/Clients.context'
import { useParams } from 'react-router-dom'
import { removeOptionalFields } from '../../../utils/utils'
import { EditPopupsProps } from '../../EditPopupsProps.interface'

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


const EditClientPopup: React.FC<EditPopupsProps> = (props) => {
  const classes = useStyles()
  const ClientsStore = useClientsStore()
  const { clientId } = useParams()
  const { openSnackbar, setOpen, open } = props

  const [client, setClient] = useState(ClientsStore.getClient(clientId))
  const [inputs, setInputs] = useState({
    name: '', phone: '', email: '', spouseName: '',
    address: '', city: '', description: ''
  })
  const [focused, setFocused] = useState('')


  const closePopup = () => {
    setInputs({
      name: '', phone: '', email: '', spouseName: '',
      address: '', city: '', description: ''
    })
    setOpen(false)
  }

  const handleClose = async (shouldAdd: boolean) => {
    if (shouldAdd) {
      const fieldsToUpdate = removeOptionalFields(
        ['name', 'phone', 'email', 'spouseName', 'address', 'city', 'description'],
        { ...inputs }
      )
      if (Object.keys(fieldsToUpdate).length) {
        for (let field in fieldsToUpdate) {
          await client.updateClient(field, inputs[field])
        }
        closePopup()
        openSnackbar('success', `Updated client successfully!`)
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


  return (
    <Dialog open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Client</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth={true}
          name='phone'
          value={inputs.phone}
          type='tel'
          autoComplete='off'
          onChange={handleChange}
          label={focused === 'phone' || inputs.phone ? 'Phone Number' : client.phone || 'Phone Number'}
          placeholder={client.phone || 'Phone Number'}
          onFocus={() => setFocused('phone')}
          onBlur={() => setFocused('')}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          name='email'
          value={inputs.email}
          type='email'
          autoComplete='off'
          onChange={handleChange}
          label={focused === 'email' || inputs.email ? 'Email Address' : client.email || 'Email Address'}
          placeholder={client.email || 'Email Address'}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused('')}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          name='spouseName'
          autoComplete='off'
          value={inputs.spouseName}
          onChange={handleChange}
          label={focused === 'spouseName' || inputs.spouseName ? 'Spouse Name' : client.spouseName || 'Spouse Name'}
          placeholder={client.spouseName || 'Spouse Name'}
          onFocus={() => setFocused('spouseName')}
          onBlur={() => setFocused('')}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          name='address'
          autoComplete='off'
          value={inputs.address}
          type='text'
          onChange={handleChange}
          label={focused === 'address' || inputs.address ? 'Address' : client.address || 'Address'}
          placeholder={client.address || 'Address'}
          onFocus={() => setFocused('address')}
          onBlur={() => setFocused('')}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          name='city'
          value={inputs.city}
          type='text'
          autoComplete='off'
          onChange={handleChange}
          label={focused === 'city' || inputs.city ? 'City' : client.city || 'City'}
          placeholder={client.city || 'City'}
          onFocus={() => setFocused('city')}
          onBlur={() => setFocused('')}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          multiline={true}
          name='description'
          autoComplete='off'
          value={inputs.description}
          type='text'
          onChange={handleChange}
          label={focused === 'description' || inputs.description ? 'Description' : client.description || 'Description'}
          placeholder={client.description || 'Description'}
          onFocus={() => setFocused('description')}
          onBlur={() => setFocused('')}
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

export default EditClientPopup