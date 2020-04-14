import React, { useState } from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core'
import { useClientsStore } from '../../../context/Clients.context'


const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '10px',
    color: 'white'
  }
}))

interface AddClientInputsProps {
  inputs: {
    firstName: string
    lastName: string
    phone: string
    email: string
    spouseName: string
  }
  handleChange: (target: any) => void
}

const AddClientInputs: React.FC<AddClientInputsProps> = (props) => {
  const classes = useStyles()
  const [inputs, setInputs] = useState(
    { firstName: '', lastName: '', phone: '', email: '', spouseName: '' }
  )
  // const { handleSubmit, handleChange} = props

  return (
    <div id="input-form">
      {/* <TextField
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
        NEXT
        </Button> */}
    </div>
  )
}

export default AddClientInputs