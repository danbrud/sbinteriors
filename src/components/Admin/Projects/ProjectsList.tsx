import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useProjectsStore } from '../../../not-used/Projects.context'
import Loader from '../../Loader'
import { Redirect, useHistory } from 'react-router-dom'
import ProjectCard from './ProjectCard'


interface ProjectsListProps {
  match: {
    params: { clientId: string }
    url: string
  }
}

const ProjectsList: React.FC<ProjectsListProps> = observer((props) => {
  const clientId = props.match.params.clientId
  const ProjectStore = useProjectsStore()
  const projects = ProjectStore.projects
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
  }, [])

  return (
    !ProjectStore.isPopulated
      ? <Loader />
      : projects.length < 2
        ? <Redirect to={`/admin/clients/${clientId}/projects/${projects[0].id}`} />
        : <div>
          {projects.map(project => (
            <ProjectCard key={project.id} clientId={clientId} project={project} />
          ))}
        </div>
  )
})

export default ProjectsList