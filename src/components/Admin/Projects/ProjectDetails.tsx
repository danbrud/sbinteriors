import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useProjectsStore } from '../../../context/Projects.context'
import { useHistory } from 'react-router-dom'
import Loader from '../../Loader'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TaskPanels from '../Tasks/TaskPanels'
import { TasksProvider } from '../../../context/Tasks.context'
import { TasksStore } from '../../../stores/Tasks.store'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  tabContent: {
    padding: '12px 3px'
  }
}))
interface ProjectDetailsProps {
  match: { params: { clientId: string, projectId: string } }
}

const ProjectDetails: React.FC<ProjectDetailsProps> = observer((props) => {
  const { clientId, projectId } = props.match.params

  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = useState(0)
  const ProjectStore = useProjectsStore()
  const project = ProjectStore.getProject(projectId)

  useEffect(() => {
    if (!ProjectStore.isPopulated) {
      ProjectStore.getClientProjectsFromDB(clientId)
    }

    return () => {
      if (!history.location.pathname.includes('projects')) {
        ProjectStore.clearStore()
      }
    }
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  return (
    !ProjectStore.isPopulated
      ? <Loader />
      : (
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Tasks" {...a11yProps(0)} />
              <Tab label="Expenses" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <TasksProvider value={TasksStore}>
                <TaskPanels />
              </TasksProvider>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              {project.city}
            </TabPanel>
          </SwipeableViews>
        </div>
      )
  )
})

export default ProjectDetails

// import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props
  const classes = useStyles()

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box className={classes.tabContent} p={3}>{children}</Box>}
    </Typography>
  )
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}