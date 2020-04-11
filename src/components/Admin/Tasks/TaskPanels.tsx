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
  },
}))

const TaskPanels: React.FC = observer(() => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<number | boolean>(false)
  const TasksStore = useTasksStore()

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      {TasksStore.tasks.map(task => (
        <ExpansionPanel key={task.id} expanded={expanded === task.id} onChange={handleChange(task.id)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{task.type}</Typography>
            <Typography className={classes.secondaryHeading}>{moment(task.startTime).format("MMM Do YY")}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {task.description}
          </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  )
})

export default TaskPanels