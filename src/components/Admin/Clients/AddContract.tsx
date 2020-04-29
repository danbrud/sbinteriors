import React, { useState } from 'react'
import { useGeneralAdminStore } from '../../../context/GeneralAdmin.context'
import { useClientsStore } from '../../../context/Clients.context'
import { observer } from 'mobx-react'
import { AddItemProps } from '../AddItemProps.interface'
import { removeOptionalFields } from '../../../utils'
import { Button, makeStyles, TextField } from '@material-ui/core'
import { AddPopup } from '../AddPopup'

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
  },
  select: {
    display: 'grid',
    gridTemplateColumns: '4fr 1fr',
    alignItems: 'end'
  }
}))

interface AddContractProps extends AddItemProps {
  clientPage?: boolean
  submitClient?: () => Promise<boolean>
  setHasContract?: (hasContract: boolean) => void
}

const AddContract: React.FC<AddContractProps> = observer((props) => {
  const classes = useStyles()
  const GeneralAdminStore = useGeneralAdminStore()
  const ClientsStore = useClientsStore()

  const { clientName, submitClient, clientPage, openSnackbar, setHasContract } = props
  const [contract, setContract] = useState({})
  const [price, setPrice] = useState('')

  const handleChange = ({ target }) => {
    setContract({ ...contract, [target.name]: target.value })
  }

  const handleSubmit = async () => {
    const filledInputs = Object.keys(contract)
    const inputs = removeOptionalFields(filledInputs, contract)
    if (!filledInputs.length || !price) {
      openSnackbar('error', 'Invalid! Make sure to fill at least one contract inputs.')
      return
    }

    if (clientPage) {
      const success = await submitClient()
      if (!success) {
        openSnackbar('error', 'Invalid! Make sure to fill all client inputs.')
        return
      }
    }

    for (let c in inputs) {
      inputs[c] = parseInt(inputs[c])
    }

    const client = ClientsStore.getClientByName(clientName)
    if (await client.hasContract) {
      openSnackbar('error', 'Client already has a contract!')
      return
    }


    try {
      await client.updateClient('pricePerHour', parseInt(price))
      await client.addContract(inputs)
    } catch (e) {
      openSnackbar('error', 'Error! Something went wrong with adding contract, try again!')
      return
    }

    const message = clientPage
      ? 'Added contract & contract successfully!'
      : 'Added contract successfully!'
    openSnackbar('success', message)
    clearInputs()
    props.redirect(client.name)
  }

  const handleHide = () => {
    clearInputs()
    setHasContract(false)
  }

  const clearInputs = () => {
    const inputs = { ...contract }
    for (let key in contract) {
      inputs[key] = ''
    }

    setContract(inputs)
    setPrice('')
  }

  return (
    <div id={!clientPage ? 'input-form' : null}>
      <div className={classes.select}>
        <TextField
          className={classes.input}
          fullWidth={true}
          required={true}
          label='Price Per Hour'
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <AddPopup name='Service' openSnackbar={props.openSnackbar} />
      </div>
      {GeneralAdminStore.services.map(s => (
        <TextField
          key={s.id}
          className={classes.input}
          fullWidth={true}
          label={`Included Hours for ${s.name}`}
          type='number'
          name={`${s.id}`}
          value={contract[s.id]}
          onChange={handleChange}
        />
      ))}
      < Button
        className={classes.button}
        variant="contained"
        color="primary"
        fullWidth={true}
        onClick={handleSubmit}
      >
        ADD {clientPage ? 'CLIENT &' : null} CONTRACT
      </Button>
      {
        clientPage
          ? < Button
            className={classes.buttonOutlined}
            variant="outlined"
            color="primary"
            fullWidth={true}
            onClick={handleHide}
          >
            HIDE CONTRACT
          </Button>
          : null
      }
    </div>
  )
})

export default AddContract