// Need to edit

import { observable, action, computed } from 'mobx'
import { Project } from './Project.store'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Transfers {
  @observable projects: Project[] = []

  @action async getClientProjectsFromDB(clientId: string) {
    const response = await axios.get<Project[]>(`${SERVER_URL}/projects/${clientId}`)
    const projects = response.data.map(p => (
      new Project(p.id, p.clientId, p.name, p.address, p.city, p.description, p.isComplete)
    ))
    this.projects = projects
  }

  getProject(id: string) {
    const parsedId = parseInt(id)
    const project = this.projects.find(project => project.id === parsedId)
    return project
  }

  @action clearStore() {
    this.projects = []
  }

  @computed get isPopulated() {
    return !!this.projects.length
  }
}

export const ProjectStore = new Transfers()