import { Task } from '../models/Task.model'

export class TasksService {

  public async getTasks(): Promise<Task[]> {
    const tasks = await Task.findAll()
    return tasks
  }

  public async getTasksByClientId(clientId: string): Promise<Task[]> {
    const tasks = await Task.findAll({ where: { clientId } })
    return tasks
  }

  public async createTask(body): Promise<Task> {
    //Update the client's balance
    //Possibly update the task current balance or isPaid
    const task = new Task(body)
    await task.save()

    return task
  }
}