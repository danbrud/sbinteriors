import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { observer } from 'mobx-react'
import { useTasksStore } from '../../../context/Tasks.context'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Button, ExpansionPanelActions } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    // marginRight: '20px' //Need if I add more than one secondary heading
  },
}))

interface TaskPanelsProps {
  projectId: string
}

const TaskPanels: React.FC<TaskPanelsProps> = observer((props) => {
  const TasksStore = useTasksStore()
  const classes = useStyles()
  const [expanded, setExpanded] = useState<number | boolean>(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      {TasksStore.tasks.map(task => (
        <ExpansionPanel key={task.id} expanded={expanded === task.id} onChange={handleChange(task.id)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={classes.heading}>{task.type}</Typography>
            {/* <Typography className={classes.secondaryHeading}>{task.duration} h</Typography>
            <Typography className={classes.secondaryHeading}>s{task.price}</Typography> */}
            <Typography className={classes.secondaryHeading}>{moment(task.startTime).format('MMM Do YY')}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {task.description}
            </Typography>
          </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Link to={``}>
                <Button size="small" color="primary" variant="outlined">
                  Select
              </Button>
              </Link>
            </ExpansionPanelActions>
        </ExpansionPanel>
      ))}
    </div>
  )
})

export default TaskPanels