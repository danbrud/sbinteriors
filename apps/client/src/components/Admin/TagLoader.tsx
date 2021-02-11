import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  bottom: {
    color: '#ffffff',
    animationDuration: '550ms',
    left: 0,
  },
})

const TagLoader: React.FC = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={15}
        thickness={5}
        {...props}
      />
    </div>
  )
}

export default TagLoader