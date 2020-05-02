import React from 'react'
import { observer } from 'mobx-react'
import { Client } from '../../../stores/Client.store'
import LetterAvatar from '../../LetterAvatar'
import '../../../styles/ClientDetails.css'
import { Divider, Typography, Button } from '@material-ui/core'
import { toProperCase } from '../../../utils/utils'
import { useUserStore } from '../../../context/User.context'

interface ClientDetailsProps {
  client: Client
}

const ClientDetails: React.FC<ClientDetailsProps> = observer((props) => {
  const { client } = props
  const UserStore = useUserStore()

  const updateStatus = () => {
    client.updateClient('isComplete', !client.isComplete)
  }

  return (
    <div id='client-details-container'>
      <div id='client-name-container'>
        <div id='balance-container'>
          <LetterAvatar size='medium' name={client.name} />
        </div>
        <div>
          <h2>{client.formattedName}</h2>
          {client.spouseName
            ? <p>
              <i className="far fa-heart"></i> {toProperCase(client.spouseName)}
            </p>
            : null}
        </div>
      </div>
      <Divider />
      <div className='details'>
        <div>
          <p><i className="fas fa-phone"></i> {client.phone}</p>
          <p><i className="far fa-envelope-open"></i> {client.email}</p>
        </div>
      </div>
      <Divider />
      <div id='project-details-container'>
        <div className='details'>
          <div>
            <Typography variant="subtitle1" color="textSecondary">
              <i className="fas fa-map-marker-alt"></i> {client.address}, {client.city}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <i className="fas fa-sync-alt"></i> {client.isComplete ? "Completed" : "In progress"}
            </Typography>
          </div>
          <div>
            {
              UserStore.isAdmin
                ? <Button variant='outlined' color='primary' onClick={updateStatus}>
                  {client.isComplete ? 'Mark In Progress' : 'Mark Completed'}
                </Button>
                : null
            }
          </div>
        </div>
        {!client.description ? null : (
          <div id="description">
            <Typography color="textSecondary">
              {client.description}
            </Typography>
          </div>
        )}
      </div>
      <Divider />
    </div >
  )
})

export default ClientDetails