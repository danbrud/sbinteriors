import { observable, action, computed } from 'mobx'
import { Task } from './Task.store'
import axios from 'axios'
import { removeOptionalFields } from '../utils'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Tasks {
  @observable tasks: Task[] = []

  @action async getTasksFromDB(clientId: string) {
    const {data} = await axios.get<Task[]>(`${SERVER_URL}/tasks/${clientId}`)
    const tasks = data.map(t => (
      new Task(t.id, t.clientId, t.type, t.startTime, t.endTime, t.price, t.description)
    ))
    this.tasks = tasks
  }

  @action async createTask(task) {
    task = removeOptionalFields(['price', 'description'], { ...task })
    await axios.post(`${SERVER_URL}/tasks`, task)
  }

  @action clearStore() {
    this.tasks = []
  }

  @computed get isPopulated() {
    return !!this.tasks.length
  }
}

export const TasksStore = new Tasks()