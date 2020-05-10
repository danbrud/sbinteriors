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
import { FormattedNumber } from 'react-intl'
import { BalanceTransfer } from '../../../stores/BalanceTransfer.store'
import { toProperCase } from '../../../utils/utils'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useUserStore } from '../../../context/User.context'
import { TransferTabsProps } from './TransferTabsProps.interface'



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
  },
  icon: {
    alignItems: 'end'
  }
}))

interface BalanceTransferCardProps extends TransferTabsProps {
  transfer: BalanceTransfer
}

const BalanceTransferCard: React.FC<BalanceTransferCardProps> = observer((props) => {
  const classes = useStyles()
  const { transfer } = props
  const UserStore = useUserStore()

  return (
    <Card className={classes.root}>
      <CardContent className={classes.contentContainer}>
        <div id='balance-transfer-card-header'>
          <Typography className={classes.heading}>
            <span>
              <i
                className="fas fa-shekel-sign"
                style={{ fontSize: '12px', color: '#757575' }}>
              </i> <FormattedNumber value={transfer.amount} />
            </span>
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {moment(transfer.date).format('MMM Do YY')}
          </Typography>
        </div>
        <div id='balance-transfer-card-details'>
          <Typography className={classes.secondaryHeading}>
            FROM: {toProperCase(transfer.fromAccount)}
          </Typography>
          <ArrowRightAltIcon className={classes.icon} fontSize='large' />
          <Typography className={classes.secondaryHeading}>
            TO: {toProperCase(transfer.toAccount)}
          </Typography>
        </div>
      </CardContent>
      {
        UserStore.isAdmin
          ? <CardActions >
            <Button color='primary' size="small">Edit Balance Transfer</Button>
          </CardActions>
          : null
      }
    </Card >
  )
})

export default BalanceTransferCard