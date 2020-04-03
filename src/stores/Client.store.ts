import { observable } from 'mobx'

export class Client {
  @observable name: string

  constructor(name: string) {
    this.name = name
  }
}