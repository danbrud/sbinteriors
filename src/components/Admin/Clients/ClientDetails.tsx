import React from 'react'
import { observer } from 'mobx-react'
import { Client } from '../../../stores/Client.store'
import LetterAvatar from '../../LetterAvatar'
import '../../../styles/ClientDetails.css'
import { Divider, Grid, Typography } from '@material-ui/core'
import { toProperCase } from '../../../utils'
import BalanceAvatar from '../../BalanceAvatar'

interface ClientDetailsProps {
  client: Client
}

const ClientDetails: React.FC<ClientDetailsProps> = observer((props) => {
  const { client } = props

  return (
    <div id='client-details-container'>
      <div id='client-name-container'>
        <div>
          {/* <LetterAvatar size='large' name={`${client.firstName} ${client.lastName}`} /> */}
          <BalanceAvatar size='large' balance={-2200} />
        </div>
        <div id='client-contact-details'>
          <h2>{client.formattedName}</h2>
          <p><i className="fas fa-phone"></i> {client.phone}</p>
          <p><i className="far fa-envelope-open"></i> {client.email}</p>
          {client.spouseName ? <p><i className="far fa-heart"></i> {toProperCase(client.spouseName)}</p> : null}
        </div>
      </div>
      <Divider />
      {/* <div id='client-balance-container'>
        <p>BALANCE</p>
        <p id='balance'>&#x20aa; {client.balance}</p>
      </div>
      <Divider /> */}
      <div id='project-details'>
        <Typography variant="subtitle1" color="textSecondary">
          <i className="fas fa-map-marker-alt"></i> {client.address}, {client.city}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          <i className="fas fa-sync-alt"></i> {client.isComplete ? "Completed" : "In progress"}
        </Typography>
      </div>
      <Divider />
    </div >
  )
})

export default ClientDetails