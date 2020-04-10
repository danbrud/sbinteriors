import { Project } from '../models/Project.model'

export class ProjectsService {

  public async getProjects(): Promise<Project[]> {
    const projects = await Project.findAll()
    return projects
  }

  public async getProjectsByClientId(clientId: string): Promise<Project[]> {
    const projects = await Project.findAll({ where: { clientId } })
    return projects
  }

  public async createProject(body): Promise<Project | { error: string }> {
    try {
      const project = new Project(body)
      await project.save()

      return project
    } catch (e) {
      return { error: 'Must have a valid client id' }
    }

  }
}