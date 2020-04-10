import { observable, action, computed } from 'mobx'
import { Project } from './Project.store'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Projects {
  @observable projects: Project[] = []

  @action async getProjectsFromDB() {
    const response = await axios.get<Project[]>(`${SERVER_URL}/projects`)
    const projects = response.data.map(p => (
      new Project(p.id)
    ))
    this.projects = projects
  }

  @computed get isPopulated() {
    return !!this.projects.length
  }
}

export const ProjectStore = new Projects()