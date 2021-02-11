import express from 'express'
import { ExpensesService } from '../services/expenses.service'


export class ExpensesController {
  private expensesService = new ExpensesService()
  public path = 'expenses'
  public router = express.Router()

  constructor() {
    this.router = express.Router()
    this.intializeRoutes()
  }

  private intializeRoutes() {
    this.router.get('/', this.getExpenses)
    this.router.get('/:clientId', this.getExpensesByClientId)
    this.router.post('/', this.createExpense)
    this.router.put('/:expenseId', this.updateExpense)
  }

  private getExpenses: express.RequestHandler = async (req, res) => {
    const expenses = await this.expensesService.getExpenses()
    res.send(expenses)
  }

  private getExpensesByClientId: express.RequestHandler = async (req, res) => {
    const { clientId } = req.params

    const expenses = await this.expensesService.getExpensesByClientId(clientId)
    res.send(expenses)
  }

  private createExpense: express.RequestHandler = async (req, res) => {
    const expense = await this.expensesService.createExpense(req.body)
    res.send(expense)
  }

  private updateExpense: express.RequestHandler = async (req, res) => {
    const expense = await this.expensesService.updateExpense(req.params.expenseId, req.body)
    res.send(expense)
  }
}