import React, { useState, useEffect } from 'react'
import { useGeneralAdminStore } from '../../context/GeneralAdmin.context'
import { observer } from 'mobx-react'

const Settings: React.FC = observer((props) => {
  const GeneralAdminStore = useGeneralAdminStore()
  const [serviceInput, setServiceInput] = useState('')

  useEffect(() => {
    GeneralAdminStore.getServicesFromDB()
  }, [])

  const handleSubmit = ({ target }) => {
    GeneralAdminStore.addService(serviceInput)
    setServiceInput('')
  }

  return (
    <div>
      {GeneralAdminStore.services.map(service => (
        <div key={service.id}>
          {service.name}
        </div>
      ))}
      <input type="text" value={serviceInput} onChange={(e) => setServiceInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
})

export default Settings