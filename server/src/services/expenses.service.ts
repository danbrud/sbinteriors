import { Expense } from '../models/Expense.model'
import { Op } from "sequelize"

export class ExpensesService {

  public async getExpenses(): Promise<Expense[]> {
    const expenses = await Expense.findAll()
    return expenses
  }

  public async getExpensesByClientId(clientId: string, attributes?: string[]): Promise<Expense[]> {
    const options = attributes
      ? { where: { clientId }, attributes }
      : { where: { clientId } }

    const expenses = await Expense.findAll(options)
    return expenses
  }

  public async createExpense(body): Promise<Expense> {
    const expense = new Expense(body)
    await expense.save()

    return expense
  }

  public async updateExpense(id: string, body): Promise<Expense> {
    const expense = await Expense.findOne({ where: { id } })
    const { prop, value } = body
    expense[prop] = value
    await expense.save()

    return expense
  }
}