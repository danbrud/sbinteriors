import { Expense } from '../models/Expense.model'

export class ExpensesService {

  public async getExpenses(): Promise<Expense[]> {
    const expenses = await Expense.findAll()
    return expenses
  }

  public async getExpensesByProjectId(projectId: string): Promise<Expense[]> {
    const expenses = await Expense.findAll({ where: { projectId } })
    return expenses
  }

  public async createExpense(body): Promise<Expense | { error: string }> {
    try {
      //Update the client's balance
      const expense = new Expense(body)
      await expense.save()

      return expense
    } catch (e) {
      return { error: 'Must have a valid project id' }
    }
  }
}