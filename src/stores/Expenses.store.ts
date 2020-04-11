import { observable, action, computed } from 'mobx'
import { Expense } from './Expense.store'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export class Expenses {
  @observable expenses: Expense[] = []

  @action async getProjectExpensesFromDB(projectId: string) {
    const response = await axios.get<Expense[]>(`${SERVER_URL}/expenses/${projectId}`)
    const expenses = response.data.map(e => (
      new Expense(e.id, e.projectId, e.paymentMethod, e.date, e.isPaid, e.amount)
    ))
    this.expenses = expenses
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
    return !!this.expenses.length
  }
}

export const ExpensesStore = new Expenses()