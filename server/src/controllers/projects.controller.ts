import express from 'express'
import { ProjectsService } from '../services/projects.service'


export class ProjectsController {
  private projectsService = new ProjectsService()
  public path = 'projects'
  public router = express.Router()

  constructor() {
    this.intializeRoutes()
  }

  private intializeRoutes() {
    this.router.get('/', this.getProjects)
    this.router.get('/:clientId', this.getProjectsByClientId)
    this.router.post('/', this.createProject)
  }

  private getProjects: express.RequestHandler = async (req, res) => {
    const projects = await this.projectsService.getProjects()
    res.send(projects)
  }

  private getProjectsByClientId: express.RequestHandler = async (req, res) => {
    const { clientId } = req.params

    const projects = await this.projectsService.getProjectsByClientId(clientId)
    res.send(projects)
  }

  private createProject: express.RequestHandler = async (req, res) => {
    const project = await this.projectsService.createProject(req.body)
    res.send(project)
  }
}