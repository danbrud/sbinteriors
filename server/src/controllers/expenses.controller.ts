import express from 'express'
import { ExpensesService } from '../services/expenses.service'


export class ExpensesController {
  private expensesService = new ExpensesService()
  public path = 'expenses'
  public router = express.Router()

  constructor() {
    this.intializeRoutes()
  }

  private intializeRoutes() {
    this.router.get('/', this.getExpenses)
    this.router.get('/:projectId', this.getExpensesByProjectId)
    this.router.post('/', this.createExpense)
  }

  private getExpenses: express.RequestHandler = async (req, res) => {
    const expenses = await this.expensesService.getExpenses()
    res.send(expenses)
  }

  private getExpensesByProjectId: express.RequestHandler = async (req, res) => {
    const { projectId } = req.params

    const expenses = await this.expensesService.getExpensesByProjectId(projectId)
    res.send(expenses)
  }

  private createExpense: express.RequestHandler = async (req, res) => {
    const expense = await this.expensesService.createExpense(req.body)
    res.send(expense)
  }
}