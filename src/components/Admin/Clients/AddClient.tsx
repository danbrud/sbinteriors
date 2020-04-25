import React, { useState } from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core'
import { useClientsStore } from '../../../context/Clients.context'
import AddContract from '../AddContract'
import { AddItemProps } from '../AddItemProps.interface'


const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '10px',
    color: 'white'
  },
  input: {
    margin: '2px'
  }
}))

const AddClient: React.FC<AddItemProps> = (props) => {
  const classes = useStyles()
  const ClientsStore = useClientsStore()

  const [inputs, setInputs] = useState({
    name: '', phone: '', email: '', spouseName: '',
    address: '', city: '', description: ''
  })

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  const clearInputs = () => {
    setInputs({
      name: '', phone: '', email: '', spouseName: '',
      address: '', city: '', description: ''
    })
  }

  const handleSubmit = () => {
    //Validate inputs are full
    ClientsStore.addClient(inputs)

    props.openSnackbar('success', 'Added client successfully!')
    // props.openSnackbar('error', 'Invalid! Make sure to fill all inputs.')
    clearInputs()
  }

  return (
    <div>
      <div id="input-form">
        <TextField
          className={classes.input}
          fullWidth={true}
          required={true}
          label='Name'
          name='name'
          value={inputs.name}
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          required={true}
          label='Phone Number'
          name='phone'
          value={inputs.phone}
          type='tel'
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          required={true}
          label='Email Address'
          name='email'
          value={inputs.email}
          type='email'
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          label='Spouse Name'
          name='spouseName'
          value={inputs.spouseName}
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          required={true}
          label='Address'
          name='address'
          value={inputs.address}
          type='text'
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          required={true}
          label='City'
          name='city'
          value={inputs.city}
          type='text'
          onChange={handleChange}
        />
        <TextField
          className={classes.input}
          fullWidth={true}
          multiline={true}
          label='Description'
          name='description'
          value={inputs.description}
          type='text'
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
        <AddContract />
      </div>
    </div>
  )
}

export default AddClient