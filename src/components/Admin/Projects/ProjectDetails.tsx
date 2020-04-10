import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useProjectsStore } from '../../../context/Projects.context'
import { useHistory } from 'react-router-dom'
import Loader from '../../Loader'

interface ProjectDetailsProps {
  match: { params: { clientId: string, projectId: string } }
}

const ProjectDetails: React.FC<ProjectDetailsProps> = observer((props) => {
  const { clientId, projectId } = props.match.params
  const ProjectStore = useProjectsStore()
  const project = ProjectStore.getProject(projectId)
  const history = useHistory()

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

  return (
    !ProjectStore.isPopulated
      ? <Loader />
      : (
        <div>
          <p>{project.id}</p>
          <p>{project.name}</p>
          <p>{project.isComplete}</p>
        </div>
      )
  )
})

export default ProjectDetails