import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useProjectsStore } from '../../../context/Projects.context'
import Loader from '../../Loader'
import { Redirect } from 'react-router-dom'


interface ProjectsListProps {
  match: { params: { clientId: string } }
}

const ProjectsList: React.FC<ProjectsListProps> = observer((props) => {
  const clientId = props.match.params.clientId
  const ProjectStore = useProjectsStore()
  const projects = ProjectStore.projects

  useEffect(() => {
    if (!ProjectStore.isPopulated) {
      ProjectStore.getProjectsFromDB()
    }
  }, [])

  return (
    !ProjectStore.isPopulated
      ? <Loader />
      : projects.length < 2
        ? <Redirect to={`/clients/${clientId}/projects/${projects[0].id}`} />
        : <div>
          {projects.map(project => (
            <div key={project.id}>project detail</div>
          ))}
        </div>
  )
})

export default ProjectsList