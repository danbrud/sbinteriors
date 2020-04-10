import { observable, action, computed } from 'mobx'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Project {
  @observable id

  constructor(id: number) {
    this.id = id
  }
}