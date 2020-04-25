import React, { useState, useEffect } from 'react'
import { useGeneralAdminStore } from '../../context/GeneralAdmin.context'
import { useClientsStore } from '../../context/Clients.context'
import { observer } from 'mobx-react'

const AddContract: React.FC = observer(() => {
  const GeneralAdminStore = useGeneralAdminStore()
  const ClientsStore = useClientsStore()
  const [contract, setContract] = useState({})

  const handleChange = ({ target }) => {
    debugger
    setContract({ ...contract, [target.name]: target.value })
  }

  const handleSubmit = () => {
    for (let c in contract) {
      contract[c] = parseInt(contract[c])
    }

    const client = ClientsStore.clients[ClientsStore.clients.length - 1]
    client.addContract(contract)
    clearInputs()
  }

  const clearInputs = () => {
    //Not working
    setContract({})
  }

  return (
    <div>
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