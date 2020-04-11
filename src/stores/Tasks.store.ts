import { observable, action, computed } from 'mobx'
import { Task } from './Task.store'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Tasks {
  @observable tasks: Task[] = [new Task(1, 1, 'AutoCad', new Date(), new Date(), 900, 'hello there all you beings')]

  @action async getProjectTasksFromDB(projectId: string) {
    console.log('getting tasks', projectId)
    // const response = await axios.get<Task[]>(`${SERVER_URL}/tasks/${projectId}`)
    // const tasks = response.data.map(t => (
    //   new Task(t.id, t.projectId, t.type, t.startTime, t.endTime, t.price, t.description)
    // ))
    // this.tasks = tasks
  }

  // getProject(id: string) {
  //   const parsedId = parseInt(id)
  //   const project = this.projects.find(project => project.id === parsedId)
  //   return project
  // }

  // @action clearStore() {
  //   this.projects = []
  // }

  @computed get isPopulated() {
    return !!this.tasks.length
  }
}

export const TasksStore = new Tasks()