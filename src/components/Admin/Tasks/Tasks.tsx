import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import { useTasksStore } from '../../../context/Tasks.context'
import TaskCard from './TaskCard'
import NoData from '../NoData'
import Loader from '../../Loader'

const Tasks: React.FC = observer(() => {
  const TasksStore = useTasksStore()
  const { clientId } = useParams()
  const [isLoading, setIsLoading] = useState(TasksStore.isPopulated ? false : true)

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
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
        : <NoData type='tasks' />
  )
})

export default Tasks