import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import TaskPanels from './TaskPanels'
import { useParams } from 'react-router-dom'
import { useTasksStore } from '../../../context/Tasks.context'

const Tasks: React.FC = observer(() => {
  const TasksStore = useTasksStore()
  const { clientId } = useParams()

  useEffect(() => {
    if (!TasksStore.isPopulated) {
      TasksStore.getTasksFromDB(clientId)
    }
  }, [])

  return (
    <div>
      <TaskPanels />
    </div>
  )
})

export default Tasks