import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { observer } from 'mobx-react'
import moment from 'moment'
import '../../../styles/Tasks.css'
import { Task } from '../../../stores/Task.store'
import { convertDurationToString } from '../../../utils'
import { FormattedNumber } from 'react-intl'



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
    alignSelf: ''
  }
}))

interface TaskCardProps {
  task: Task
}

const TaskCard: React.FC<TaskCardProps> = observer((props) => {
  const classes = useStyles()
  const { task } = props

  return (
    <Card className={classes.root}>
      <CardContent className={classes.contentContainer}>
        <div id='task-card-details'>
          <Typography className={classes.heading}>
            {task.serviceType.name}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {moment(task.startTime).format('MMM Do YY')}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            <i className="far fa-clock"></i> {convertDurationToString(task.durationInMinutes)}
          </Typography>
        </div>
        <Typography className={classes.paragraph}>
          {
            task.price
              ? <span>
                Price: <i
                  className="fas fa-shekel-sign"
                  style={{ fontSize: '12px', color: '#757575' }}>
                </i> <FormattedNumber value={task.price} />
              </span>
              : <span>Price: No charge (included)</span>
          }
        </Typography>
        {
          task.description
            ? <Typography className={classes.paragraph}>
              {task.description}
            </Typography>
            : null
        }
      </CardContent>
      <CardActions >
        <Button color='primary' size="small">Edit Task</Button>
      </CardActions>
    </Card >
  )
})

export default TaskCard