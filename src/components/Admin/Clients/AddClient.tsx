import React, { useState } from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core'
import { useClientsStore } from '../../../context/Clients.context'


const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '10px',
    color: 'white'
  },
  input: {
    margin: '2px'
  }
}))

const AddClient: React.FC = () => {
  const classes = useStyles()
  const ClientsStore = useClientsStore()

  const [clientInputs, setClientInputs] = useState(
    { firstName: '', lastName: '', phone: '', email: '', spouseName: '' }
  )

  const [projectInputs, setProjectInputs] = useState(
    { name: '', address: '', city: '', description: '' }
  )

  const handleClientsInputChange = ({ target }) => {
    setClientInputs({ ...clientInputs, [target.name]: target.value })
  }

  const handleProjectsInputChange = ({ target }) => {
    setProjectInputs({ ...projectInputs, [target.name]: target.value })
  }

  const clearInputs = () => {
    setClientInputs({ firstName: '', lastName: '', phone: '', email: '', spouseName: '' })
    setProjectInputs({ name: '', address: '', city: '', description: '' })
  }

  const handleSubmit = () => {
    //Validate inputs are full
    ClientsStore.addClient(clientInputs, projectInputs)
    clearInputs()
  }

  return (
    <div>
      <div id="input-form">
        <TextField
          className={classes.input}
          fullWidth={true}
          required={true}
          label='First Name'
          name='firstName'
          value={clientInputs.firstName}
          onChange={handleClientsInputChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          required={true}
          label='Last Name'
          name='lastName'
          value={clientInputs.lastName}
          onChange={handleClientsInputChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          required={true}
          label='Phone Number'
          name='phone'
          value={clientInputs.phone}
          type='tel'
          onChange={handleClientsInputChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          required={true}
          label='Email Address'
          name='email'
          value={clientInputs.email}
          type='email'
          onChange={handleClientsInputChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          label='Spouse Name'
          name='spouseName'
          value={clientInputs.spouseName}
          onChange={handleClientsInputChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          label='Project Name'
          name='name'
          value={projectInputs.name}
          type='text'
          onChange={handleProjectsInputChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          required={true}
          label='Address'
          name='address'
          value={projectInputs.address}
          type='text'
          onChange={handleProjectsInputChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          required={true}
          label='City'
          name='city'
          value={projectInputs.city}
          type='text'
          onChange={handleProjectsInputChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          multiline={true}
          label='Description'
          name='description'
          value={projectInputs.description}
          type='text'
          onChange={handleProjectsInputChange}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          fullWidth={true}
          onClick={handleSubmit}
        >
          ADD CLIENT
        </Button>
      </div>
    </div>
  )
}

export default AddClient