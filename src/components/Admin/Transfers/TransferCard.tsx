import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { observer } from 'mobx-react'
import moment from 'moment'
import '../../../styles/Transfers.css'
import { Transfer } from '../../../stores/Transfer.store'
import { Task } from '../../../stores/Task.store'


const useStyles = makeStyles((theme) => ({
  heading: {
    // flexBasis: '33.33%',
    // flexShrink: 0,
    fontSize: '20px',
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
  root: {
    width: '100%',
    marginBottom: '10px'
  },
  contentContainer: {
    padding: '12px'
  },
  paragraph: {
    padding: '12px 2px 0 2px',
    color: theme.palette.text.secondary
  }
}))

interface TransferCardProps {
  transfer: Transfer
}

const TransferCard: React.FC<TransferCardProps> = observer((props) => {
  const classes = useStyles()
  const { transfer } = props

  return (
    <Card className={classes.root}>
      <CardContent className={classes.contentContainer}>
        <div id='transfer-card-details'>
          <Typography className={classes.heading}>
            <span>
              <i className="fas fa-shekel-sign" style={{ fontSize: '12px', color: '#757575' }}></i> {transfer.ilsAmount}
            </span>
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {moment(transfer.date).format('MMM Do YY')}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {transfer.transferMethod}
          </Typography>
        </div>
        {
          transfer.foreignAmount
            ? <Typography className={classes.paragraph}>
              {transfer.foreignAmount} {transfer.foreignAmountCurrency}
            </Typography>
            : null
        }
        {
          transfer.description
            ? <Typography className={classes.paragraph}>
              {transfer.description}
            </Typography>
            : null
        }
      </CardContent>
      <CardActions >
        <Button color='primary' size="small">Edit Transfer</Button>
      </CardActions>
    </Card >
  )
})

export default TransferCard