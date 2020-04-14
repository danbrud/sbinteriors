import { Expense } from '../models/Expense.model'

export class ExpensesService {

  public async getExpenses(): Promise<Expense[]> {
    const expenses = await Expense.findAll()
    return expenses
  }

  public async getExpensesByClientId(clientId: string): Promise<Expense[]> {
    const expenses = await Expense.findAll({ where: { clientId } })
    return expenses
  }

  public async createExpense(body): Promise<Expense> {
    //Update the client's balance
    //Possibly update the task current balance or isPaid
    const expense = new Expense(body)
    await expense.save()

    return expense
  }
}