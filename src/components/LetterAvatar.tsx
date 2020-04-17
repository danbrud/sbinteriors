import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      // margin: theme.spacing(1),
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
  medium: {
    width: '20vw',
    height: '20vw',
    fontSize: '18px'
  }
}))

interface LetterAvatarProps {
  name: string
  size: string
}

const LetterAvatar: React.FC<LetterAvatarProps> = (props) => {
  const classes = useStyles()
  const { name, size } = props

  const colors = ['#416165', '#E2EF70', '#7E998A', '#E2EF70', '#FC7753', '#E6D3A3']
  const randomIndex = Math.floor(Math.random() * colors.length)

  let initials = ''
  const splitName = name.split(' ')
  splitName.forEach(n => initials += n[0].toUpperCase())

  return (
    <div className={classes.root}>
      <Avatar className={classes[size]} style={{ backgroundColor: colors[randomIndex] }}>
        {initials}
      </Avatar>
    </div>
  )
}

export default LetterAvatar