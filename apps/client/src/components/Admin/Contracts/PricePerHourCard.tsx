import React from 'react'
import { observer } from 'mobx-react'
import { Card, CardContent, Button, Typography, makeStyles } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { FormattedNumber } from 'react-intl'
import { Client } from '../../../stores/Client.store'
import { useUserStore } from '../../../context/User.context'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: '10px',
  },
  contentContainer: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    alignItems: 'center'
  },
  heading: {
    fontSize: '18px'
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    fontSize: '14px'
  }
}))


interface PricePerHourCardProps {
  client: Client
  setShowPopup: (open: boolean) => void
}

const PricePerHourCard: React.FC<PricePerHourCardProps> = observer((props) => {
  const classes = useStyles()
  const UserStore = useUserStore()
  const { client, setShowPopup } = props

  return (
    <Card className={classes.root}>
      <CardContent className={classes.contentContainer}>
        <Typography className={classes.heading}>
          Price Per Hour: <span id='price'>
            <i
              className="fas fa-shekel-sign"
              style={{ fontSize: '12px', color: '#757575' }}>
            </i> <FormattedNumber value={client.pricePerHour} />
          </span>
        </Typography>
        {
          UserStore.isAdmin
            ? <Button
              className={classes.secondaryHeading}
              onClick={() => setShowPopup(true)}
            >
              <EditIcon />
            </Button>
            : null
        }
      </CardContent>
    </Card >
  )
})

export default PricePerHourCard