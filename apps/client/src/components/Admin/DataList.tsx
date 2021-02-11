import React from 'react'
import { Clients } from '../../stores/Clients.store'
import '../../styles/AddItem.css'

interface DataListProps {
  ClientsStore?: Clients
  clientName?: string
  setClientName?: (name: string) => void
}

const DataList: React.FC<DataListProps> = (props) => {
  const { ClientsStore, clientName, setClientName } = props

  return (
    <div id='data-list'>
      <input
        id='client-list'
        placeholder='Client Name'
        list='clients'
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        style={{ border: '1px black solid' }}
      />
      <datalist id="clients">
        {ClientsStore.clients.map(c => (
          <option key={c.id} value={c.formattedName} />
        ))}
      </datalist>
    </div>

  )
}

export default DataList

// <Autocomplete
//   id="client-select"
//   options={ClientsStore.clients}
//   getOptionLabel={(option: Client) => `${toProperCase(option.firstName)} ${toProperCase(option.lastName)}`}
//   style={{ width: 300 }}
//   renderInput={(params) => <TextField {...params} label="Combo box" variant="standard" />}
// />