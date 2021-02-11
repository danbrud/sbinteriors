import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import { useTasksStore } from '../../../context/Tasks.context'
import TaskCard from './TaskCard'
import NoData from '../NoData'
import Loader from '../../Loader'
import { Task } from '../../../stores/Task.store'
import EditTaskPopup from './EditTaskPopup'
import { Snackbar } from '@material-ui/core'
import { Alert } from '../../Alert'


const Tasks: React.FC = observer(() => {
  const TasksStore = useTasksStore()
  const { clientId } = useParams()
  const [isLoading, setIsLoading] = useState(TasksStore.isPopulated ? false : true)
  const [showPopup, setShowPopup] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
  const [snackbar, setSnackbar] = useState({
    message: '',
    open: false,
    severity: ''
  })

  const openSnackbar = (severity, message) => {
    setSnackbar({ message, severity, open: true })
  }

  const handleClose = () => {
    setSnackbar({
      message: '',
      open: false,
      severity: ''
    })
  }

  useEffect(() => {
    if (!TasksStore.isPopulated) {
      TasksStore.getTasksFromDB(clientId)
        .then(() => {
          setIsLoading(false)
        })
    }
  }, [])

  return (
    isLoading
      ? <Loader />
      : TasksStore.isPopulated
        ? <div>
          {TasksStore.tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              setShowPopup={setShowPopup}
              setTaskToEdit={setTaskToEdit}
            />
          ))}
          {
            showPopup
              ? <EditTaskPopup
                open={showPopup}
                setOpen={setShowPopup}
                openSnackbar={openSnackbar}
                task={taskToEdit}
              />
              : null
          }
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
        : <NoData type='tasks' />
  )
})

export default Tasks