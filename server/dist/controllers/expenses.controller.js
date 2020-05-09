"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenses_service_1 = require("../services/expenses.service");
class ExpensesController {
    constructor() {
        this.expensesService = new expenses_service_1.ExpensesService();
        this.path = 'expenses';
        this.router = express_1.default.Router();
        this.getExpenses = async (req, res) => {
            const expenses = await this.expensesService.getExpenses();
            res.send(expenses);
        };
        this.getExpensesByClientId = async (req, res) => {
            const { clientId } = req.params;
            const expenses = await this.expensesService.getExpensesByClientId(clientId);
            res.send(expenses);
        };
        this.createExpense = async (req, res) => {
            const expense = await this.expensesService.createExpense(req.body);
            res.send(expense);
        };
        this.updateExpense = async (req, res) => {
            const expense = await this.expensesService.updateExpense(req.params.expenseId, req.body);
            res.send(expense);
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/', this.getExpenses);
        this.router.get('/:clientId', this.getExpensesByClientId);
        this.router.post('/', this.createExpense);
        this.router.put('/:expenseId', this.updateExpense);
    }
}
exports.ExpensesController = ExpensesController;
//# sourceMappingURL=expenses.controller.js.map