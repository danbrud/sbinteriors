import { observable, action, computed } from 'mobx'
import { Task } from './Task.store'
import axios from 'axios'
import { removeOptionalFields } from '../utils'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Tasks {
  @observable tasks: Task[] = []

  @action async getTasksFromDB(clientId: string) {
    const { data } = await axios.get<Task[]>(`${SERVER_URL}/tasks/${clientId}`)
    const tasks = data.map(t => (
      new Task(t.id, t.clientId, t.serviceType, t.startTime, t.endTime, t.price, t.description)
    ))
    this.tasks = tasks
  }

  async createTask(task) {
    task = removeOptionalFields(['description'], { ...task })
    await axios.post(`${SERVER_URL}/tasks`, task)
    //might need to add new task in to the tasks
  }

  @action clearStore() {
    this.tasks = []
  }

  @computed get isPopulated() {
    return !!this.tasks.length
  }

  getTotalTimeOfService(serviceTypeId: number): number {
    const tasksDuration = this.tasks
      .filter(t => t.serviceType.id === serviceTypeId)
      .reduce((acc, t) => acc + t.durationInMinutes, 0)

    return tasksDuration
  }
}

export const TasksStore = new Tasks()