import React from 'react'
import { observer } from 'mobx-react'
import { Client } from '../../../stores/Client.store'
import LetterAvatar from '../../LetterAvatar'
import '../../../styles/ClientDetails.css'
import { Divider, Grid, Typography } from '@material-ui/core'

interface ClientDetailsProps {
  client: Client
}

const ClientDetails: React.FC<ClientDetailsProps> = observer((props) => {
  const { client } = props

  return (
    <div>
      <div id='client-name-container'>
        <div>
          <LetterAvatar size='large' name={`${client.firstName} ${client.lastName}`} />
        </div>
        <div id='client-contact-details'>
          <h2>{client.firstName} {client.lastName}</h2>
          <p><i className="fas fa-phone"></i> {client.phone}</p>
          <p><i className="far fa-envelope-open"></i> {client.email}</p>
          {client.spouseName ? <p><i className="far fa-heart"></i> {client.spouseName} {client.lastName}</p> : null}
        </div>
      </div>
      <Divider />
      <div id='client-balance-container'>
          <p>BALANCE</p>
        <p id='balance'>&#x20aa; {client.balance}</p>
      </div>
      <Divider />
      <div>
        <p>{}</p>
      </div>
    </div>
  )
})

export default ClientDetails