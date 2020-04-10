import React from 'react'
import { observer } from 'mobx-react'
import { Client as ClientStore } from '../stores/Client.store'

interface ClientProps {
  client: ClientStore
}

const Client: React.FC<ClientProps> = observer((props) => {

  return (
    <div>
      <p>{props.client.firstName}</p>
      <p>{props.client.lastName}</p>
      <p>{props.client.email}</p>
      <p>{props.client.phone}</p>
      <p>{props.client.balance}</p>
      <p>{props.client.spouseName}</p>
    </div>
  )
})

export default Client