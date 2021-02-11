import React, { useState } from 'react'
import { EditPopupsProps } from '../../EditPopupsProps.interface'
import { Client } from '../../../stores/Client.store'
import { DialogActions, Button, TextField, DialogContent, DialogTitle, Dialog } from '@material-ui/core'
import { useGeneralAdminStore } from '../../../context/GeneralAdmin.context'

interface EditContractPopupProps extends EditPopupsProps {
  client: Client
}

const EditContractPopup: React.FC<EditContractPopupProps> = (props) => {
  const GeneralAdminStore = useGeneralAdminStore()
  const { openSnackbar, setOpen, open, client } = props

  const [contract, setContract] = useState({})
  const [price, setPrice] = useState('')
  const [focused, setFocused] = useState('')


  const closePopup = () => {
    setContract({})
    setOpen(false)
  }

  const handleClose = async (shouldAdd: boolean) => {
    if (shouldAdd) {
      if (Object.keys(contract).length || price) {
        if (price) {
          await client.updateClient('pricePerHour', price)
        }
        if (Object.keys(contract).length) {
          for (let id in contract) {
            await client.updateContract(parseInt(id), parseInt(contract[id]))
          }
        }
        closePopup()
        openSnackbar('success', `Updated contract successfully!`)
      } else {
        openSnackbar('error', `Invalid! Please fill at least one field.`)
      }
    } else {
      closePopup()
    }
  }

  const handleChange = ({ target }) => {
    setContract({ ...contract, [target.name]: target.value })
  }

  return (
    <Dialog open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Contract</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth={true}
          type='number'
          autoComplete='off'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          label={focused === 'price' || price ? 'Price Per Hour' : client.pricePerHour || 'Price Per Hour'}
          placeholder={client.pricePerHour.toString() || 'Price Per Hour'}
          onFocus={() => setFocused('price')}
          onBlur={() => setFocused('')}
        />
        {GeneralAdminStore.services.map(s => {
          const contractService = client.contract.find(c => c.serviceId === s.id)

          return <TextField
            key={s.id}
            fullWidth={true}
            type='number'
            autoComplete='off'
            name={`${s.id}`}
            value={contract[s.id]}
            onChange={handleChange}
            label={focused === `${s.id}` || contract[s.id] ? `Included Hours: ${s.name}` : contractService ? contractService.includedHours : `Included Hours: ${s.name}`}
            placeholder={contractService ? contractService.includedHours : `Included Hours: ${s.name}`}
            onFocus={() => setFocused(`${s.id}`)}
            onBlur={() => setFocused('')}
          />
        })}
        {/* <TextField
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
        /> */}
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

export default EditContractPopup