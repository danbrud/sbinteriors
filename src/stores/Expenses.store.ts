import { observable, action, computed } from 'mobx'
import { Expense } from './Expense.store'
import axios from 'axios'
import { removeOptionalFields } from '../utils/utils'
import { SERVER_URL } from '../utils/utils'

export class Expenses {
  @observable expenses: Expense[] = []

  @action async getExpensesFromDB(clientId: string) {
    const {data} = await axios.get<Expense[]>(`${SERVER_URL}/expenses/${clientId}`)
    const expenses = data.map(e => (
      new Expense(e.id, e.clientId, e.name, e.date, e.amount, e.description)
    ))
    this.expenses = expenses
  }

  async createExpense(expense) {
    expense = removeOptionalFields(['description'], { ...expense })
    await axios.post(`${SERVER_URL}/expenses`, expense)
  }

  @action clearStore() {
    this.expenses = []
  }

  @computed get isPopulated() {
    return !!this.expenses.length
  }
}

export const ExpensesStore = new Expenses()