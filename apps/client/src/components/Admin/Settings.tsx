import React, { useState } from 'react'
import { useGeneralAdminStore } from '../../context/GeneralAdmin.context'
import { observer } from 'mobx-react'

const Settings: React.FC = observer((props) => {
  const GeneralAdminStore = useGeneralAdminStore()
  const [inputs, setInputs] = useState({ services: '', transferMethods: ''})

  const handleInput = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  const handleSubmit = type => e => {
    if (type === 'services') {
      GeneralAdminStore.addService(inputs.services)
    } else if (type === 'transferMethods') {
      GeneralAdminStore.addTransferMethod(inputs.transferMethods)
    }

    setInputs({ services: '', transferMethods: ''})
  }

  return (
    <div>
      <p>Add Services</p>
      <input type="text" name='services' value={inputs.services} onChange={handleInput} />
      <button onClick={handleSubmit('services')}>Submit</button>
      {GeneralAdminStore.services.map(service => (
        <div key={service.id}>
          {service.name}
        </div>
      ))}
      <p>Add Transfer Methods</p>
      <input type="text" name='transferMethods' value={inputs.transferMethods} onChange={handleInput} />
      <button onClick={handleSubmit('transferMethods')}>Submit</button>
      {GeneralAdminStore.transferMethods.map(method => (
        <div key={method.id}>
          {method.name}
        </div>
      ))}
    </div>
  )
})

export default Settings