import { observable, action, computed } from 'mobx'
import { Task } from './Task.store'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Tasks {
  @observable tasks: Task[] = []

  @action async getProjectTasksFromDB(projectId: string) {
    const response = await axios.get<Task[]>(`${SERVER_URL}/tasks/${projectId}`)
    const tasks = response.data.map(t => (
      new Task(t.id, t.projectId, t.type, t.startTime, t.endTime, t.price, t.description)
    ))
    this.tasks = tasks
  }

  @action clearStore() {
    this.tasks = []
  }

  @computed get isPopulated() {
    return !!this.tasks.length
  }
}

export const TasksStore = new Tasks()