import React, { useState } from 'react'
import { observer } from "mobx-react"
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TaskPanels from '../Tasks/TaskPanels'
import ExpensePanels from '../Expenses/ExpensePanels'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  tabContent: {
    padding: '12px 3px'
  }
}))

interface ProjectDetailsProps {
  projectId: string
  clientId: string
}

const ProjectDetails: React.FC<ProjectDetailsProps> = observer((props) => {
  const { projectId, clientId } = props
  
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  return (
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
          <TaskPanels projectId={projectId} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ExpensePanels projectId={projectId} />
        </TabPanel>
      </SwipeableViews>
    </div>
  )
})

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

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

export default ProjectDetails