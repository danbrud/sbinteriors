import React from 'react'
import { observer } from 'mobx-react'
import { Client } from '../../../stores/Client.store'

interface ClientDetailsProps {
  client: Client
}

const ClientDetails: React.FC<ClientDetailsProps> = observer((props) => {


  return (
    <div>
      <div>
        <h2>{props.client.firstName} {props.client.lastName}</h2>
        <p>{props.client.phone}</p>
        <p>{props.client.email}</p>
        <p>{props.client.spouseName}</p>
      </div>
      <div>
        {props.client.balance}
      </div>
    </div>
  )
})

export default ClientDetails