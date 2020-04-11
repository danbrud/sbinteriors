import { Task } from '../models/Task.model'

export class TasksService {

  public async getTasks(): Promise<Task[]> {
    const tasks = await Task.findAll()
    return tasks
  }

  public async getTasksByProjectId(projectId: string): Promise<Task[]> {
    const tasks = await Task.findAll({ where: { projectId } })
    return tasks
  }

  public async createTask(body): Promise<Task | { error: string }> {
    try {
      const task = new Task(body)
      await task.save()

      return task
    } catch (e) {
      return { error: 'Must have a valid project id' }
    }
  }
}