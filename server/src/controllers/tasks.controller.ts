import express from 'express'
import { TasksService } from '../services/tasks.service'


export class TasksController {
  private tasksService = new TasksService()
  public path = 'tasks'
  public router = express.Router()

  constructor() {
    this.intializeRoutes()
  }

  private intializeRoutes() {
    this.router.get('/', this.getTasks)
    this.router.get('/:projectId', this.getTasksByProjectId)
    this.router.post('/', this.createExpense)
  }

  private getTasks: express.RequestHandler = async (req, res) => {
    const tasks = await this.tasksService.getTasks()
    res.send(tasks)
  }

  private getTasksByProjectId: express.RequestHandler = async (req, res) => {
    const { projectId } = req.params

    const tasks = await this.tasksService.getTasksByProjectId(projectId)
    res.send(tasks)
  }

  private createExpense: express.RequestHandler = async (req, res) => {
    const task = await this.tasksService.createTask(req.body)
    res.send(task)
  }
}