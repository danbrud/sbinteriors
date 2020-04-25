import React, { useState, useEffect } from 'react'
import { useGeneralAdminStore } from '../../context/GeneralAdmin.context'
import { useClientsStore } from '../../context/Clients.context'
import { observer } from 'mobx-react'

const AddContract: React.FC = observer(() => {
  const GeneralAdminStore = useGeneralAdminStore()
  const ClientsStore = useClientsStore()

  const [contract, setContract] = useState({})
  const [price, setPrice] = useState('')

  const handleChange = ({ target }) => {
    setContract({ ...contract, [target.name]: target.value })
  }

  const handleSubmit = () => {
    for (let c in contract) {
      contract[c] = parseInt(contract[c])
    }

    const client = ClientsStore.clients[ClientsStore.clients.length - 1]
    client.updateClient('pricePerHour', parseInt(price))
    client.addContract(contract)
    // clearInputs()
  }

  const clearInputs = () => {
    //Not working
    setContract({})
  }

  return (
    <div>
      <p>Price per hour</p>
      <input
        type="number"
        placeholder='Enter price per hour'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {GeneralAdminStore.services.map(s => (
        <div>
          <p>{s.name}</p>
          <input
            name={`${s.id}`}
            placeholder='Included Hours'
            value={contract[s.id]}
            onChange={handleChange}
            type="number"
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Add Contract</button>
    </div>
  )
})

export default AddContract