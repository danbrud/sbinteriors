import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Client as ClientStore } from '../../../stores/Client.store'
import { toProperCase } from '../../../utils'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    marginTop: '10px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  }
}))
interface ClientCardProps {
  client: ClientStore
}

const ClientCard: React.FC<ClientCardProps> = observer((props) => {
  const classes = useStyles()
  const { client } = props

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {`${toProperCase(client.firstName)} ${toProperCase(client.lastName)}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <i className="fas fa-phone"></i> {client.phone}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <i className="far fa-envelope-open"></i> {client.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/admin/clients/${client.id}`}>
            <Button size="small" color="primary" variant="outlined">
              Select
            </Button>
          </Link>
        </CardActions>
      </div>
    </Card>
  )
})

export default ClientCard