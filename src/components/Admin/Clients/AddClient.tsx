import React, { useState } from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core'
import { useClientsStore } from '../../../context/Clients.context'


const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '10px',
    color: 'white'
  }
}))

const AddClient: React.FC = () => {
  const classes = useStyles()
  const ClientsStore = useClientsStore()

  const [inputs, setInputs] = useState(
    { firstName: '', lastName: '', phone: '', email: '', spouseName: '' }
  )

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  const clearInputs = () => {
    const newInputs = { ...inputs }
    for (let key in newInputs) {
      newInputs[key] = ''
    }
    setInputs(newInputs)
  }

  const handleSubmit = () => {
    const client = { ...inputs }

    if (!client.spouseName) { delete client.spouseName }
    for (let key in client) {
      if (!client[key]) { return }
    }

    ClientsStore.addClient(client)
    clearInputs()
  }

  return (
    <div>
      <div id="input-form">
        <TextField
          fullWidth={true}
          required={true}
          label='First Name'
          name='firstName'
          value={inputs.firstName}
          onChange={handleChange}
        />
        <TextField
          fullWidth={true}
          required={true}
          label='Last Name'
          name='lastName'
          value={inputs.lastName}
          onChange={handleChange}
        />
        <TextField
          fullWidth={true}
          required={true}
          label='Phone Number'
          name='phone'
          value={inputs.phone}
          type='tel'
          onChange={handleChange}
        />
        <TextField
          fullWidth={true}
          required={true}
          label='Email Address'
          name='email'
          value={inputs.email}
          type='email'
          onChange={handleChange}
        />
        <TextField
          fullWidth={true}
          label='Spouse Name'
          name='spouseName'
          value={inputs.spouseName}
          onChange={handleChange}
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