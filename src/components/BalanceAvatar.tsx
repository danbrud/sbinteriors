import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: '30vw',
    height: '30vw',
    fontSize: '30px'
  },
}))

interface BalanceAvatarProps {
  balance: number
  size: string
}

const BalanceAvatar: React.FC<BalanceAvatarProps> = (props) => {
  const classes = useStyles()
  const { balance, size } = props

  const backgroundColor = balance >= 0 ? '#27ae60' : '#c0392b'

  return (
    <div className={classes.root}>
      <Avatar className={classes[size]} style={{ backgroundColor }}>
        {/* &#x20aa; */}
        {Math.abs(balance)}
      </Avatar>
    </div>
  )
}

export default BalanceAvatar