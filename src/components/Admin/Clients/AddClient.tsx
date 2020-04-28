import React, { useState } from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core'
import { useClientsStore } from '../../../context/Clients.context'
import AddContract from './AddContract'
import { AddItemProps } from '../AddItemProps.interface'
import { checkRequiredFields } from '../../../utils'


const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '10px',
    color: 'white'
  },
  buttonOutlined: {
    marginTop: '10px',
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
  const [hasContract, setHasContract] = useState(false)

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  const clearInputs = () => {
    setInputs({
      name: '', phone: '', email: '', spouseName: '',
      address: '', city: '', description: ''
    })
  }

  const handleSubmit = async () => {
    const requiredFields = ['name', 'phone', 'email', 'address', 'city']
    if (!checkRequiredFields(requiredFields, inputs)) {
      props.openSnackbar('error', 'Invalid! Make sure to fill all inputs.')
      return false
    }

    try {
      await ClientsStore.addClient(inputs)
    } catch (e) {
      props.openSnackbar('error', 'Error! Something went wrong, try again!')
      return false
    }

    props.openSnackbar('success', 'Added client successfully!')
    if(!hasContract) { props.redirect(inputs.name) }
    clearInputs()

    return true
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
        {
          !hasContract
            ? (
              <div>
                < Button
                  className={classes.buttonOutlined}
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  onClick={() => setHasContract(true)}
                >
                  ADD CONTRACT
                </Button>
                < Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  onClick={handleSubmit}
                >
                  ADD CLIENT
                </Button>
              </div>
            )
            : <AddContract
              clientName={inputs.name}
              openSnackbar={props.openSnackbar}
              clientPage={true}
              submitClient={handleSubmit}
              setHasContract={setHasContract}
              redirect={props.redirect}
            />
        }

      </div>
    </div >
  )
}

export default AddClient