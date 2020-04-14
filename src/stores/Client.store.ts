import { observable, action } from 'mobx'
import { Project } from './Project.store'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Client {
  @observable id: number
  @observable firstName: string
  @observable lastName: string
  @observable email: string
  @observable phone: string
  @observable balance: number
  @observable projects: Project[]
  @observable spouseName: string | null

  constructor(
    id: number, firstName: string, lastName: string, email: string,
    phone: string, balance: number, projects: Project[], spouseName?: string
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.balance = balance
    this.projects = projects
    this.spouseName = spouseName ? spouseName : null
  }

  @action async updateClient(prop: string, value: string) {
    await this.updateClientInDB(prop, value)
    this[prop] = value
  }

  async updateClientInDB(prop: string, value: string) {
    //Make http request to update client
    console.log(prop, value)
  }

  @action async addProject(project) {
    if (!project.name) { project.name = null }
    if (!project.description) { project.description = null }

    const { data } = await axios.post<Project>(`${SERVER_URL}/projects`, { ...project, clientId: this.id })
    const newProject = new Project(data.id, this.id, data.name, data.address, data.city, data.description, data.isComplete)
    this.projects.push(newProject)
  }
}