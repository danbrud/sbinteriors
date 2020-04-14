import React from 'react'
import { observer } from 'mobx-react'
import TaskPanels from './TaskPanels'
import { useParams } from 'react-router-dom'

const Tasks: React.FC = observer(() => {
  const {projectId} = useParams()

  return (
    <div>
      <TaskPanels projectId={projectId}/>
    </div>
  )
})

export default Tasks