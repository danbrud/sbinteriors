import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { observer } from 'mobx-react'

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    marginTop: '35vh',
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
    color: 'white',
  },
  card: {
    paddingTop: '24px'
  },
  title: {
    fontSize: 24,
  }
}))

interface NoDataProps {
  type: 'clients' | 'expenses' | 'transfers' | 'tasks' | 'data'
}

const NoData: React.FC<NoDataProps> = observer((props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent className={classes.card}>
        <Typography
          className={classes.title}
        >
          No {props.type} added yet!
        </Typography>
      </CardContent>
    </Card>
  )
})

export default NoData