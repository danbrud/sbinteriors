import express from 'express'
import { TasksService } from '../services/tasks.service'
import { Service } from '../models/Service.model'


export class TasksController {
  private tasksService = new TasksService()
  public path = 'tasks'
  public router = express.Router()

  constructor() {
    this.intializeRoutes()
  }

  private intializeRoutes() {
    this.router.get('/', this.getTasks)
    this.router.get('/:clientId', this.getTasksByClientId)
    this.router.post('/', this.createTask)
    this.router.put('/:taskId', this.updateTask)
  }

  private getTasks: express.RequestHandler = async (req, res) => {
    const tasks = await this.tasksService.getTasks()
    res.send(tasks)
  }

  private getTasksByClientId: express.RequestHandler = async (req, res) => {
    const { clientId } = req.params

    const tasks = await this.tasksService.getTasksByClientId(clientId, [Service])
    res.send(tasks)
  }

  private createTask: express.RequestHandler = async (req, res) => {
    const task = await this.tasksService.createTask(req.body)
    res.send(task)
  }

  private updateTask: express.RequestHandler = async (req, res) => {
    const task = await this.tasksService.updateTask(req.params.taskId, req.body)
    res.send(task)
  }
}